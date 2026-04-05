import { Client } from "@notionhq/client";
import type {
  Customer,
  Project,
  Milestone,
  Message,
  MessageSender,
  Document,
  Ticket,
  Invoice,
  ProjectStatus,
  ProjectType,
  MilestoneStatus,
  MessageType,
  DocumentCategory,
  TicketPriority,
  TicketStatus,
  InvoiceStatus,
} from "./types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const DB = {
  kunden: process.env.NOTION_KUNDEN_DB!,
  projekte: process.env.NOTION_PROJEKTE_DB!,
  meilensteine: process.env.NOTION_MEILENSTEINE_DB!,
  nachrichten: process.env.NOTION_NACHRICHTEN_DB!,
  dokumente: process.env.NOTION_DOKUMENTE_DB!,
  support: process.env.NOTION_SUPPORT_DB!,
};

// --- Helpers to extract typed values from Notion's untyped properties ---

function text(props: Record<string, any>, key: string): string {
  const prop = props[key];
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (prop.type === "email") return prop.email ?? "";
  if (prop.type === "phone_number") return prop.phone_number ?? "";
  return "";
}

function selectName(props: Record<string, any>, key: string): string {
  const prop = props[key];
  if (!prop) return "";
  // Works for both "select" and "status" property types
  if (prop.type === "select") return prop.select?.name ?? "";
  if (prop.type === "status") return prop.status?.name ?? "";
  return "";
}

function num(props: Record<string, any>, key: string): number {
  return props[key]?.number ?? 0;
}

function checkbox(props: Record<string, any>, key: string): boolean {
  return props[key]?.checkbox ?? false;
}

function dateVal(props: Record<string, any>, key: string): string | null {
  return props[key]?.date?.start ?? null;
}

function createdTime(page: any): string {
  return page.created_time ?? "";
}

function relationId(props: Record<string, any>, key: string): string {
  return props[key]?.relation?.[0]?.id ?? "";
}

function fileUrl(props: Record<string, any>, key: string): { url: string; name: string } | null {
  const files = props[key]?.files;
  if (!files || files.length === 0) return null;
  const f = files[0];
  const url = f.type === "external" ? f.external?.url : f.file?.url;
  return url ? { url, name: f.name ?? "Dokument" } : null;
}

// =====================================================================
// CUSTOMERS (Clients DB)
// Properties: Name (title), Email (email), Contact (rich_text),
//             Phone (phone_number), Status (select), Company Type (select),
//             Portal-Zugang (checkbox), ⌨️ Projects (relation)
// =====================================================================

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const res = await notion.databases.query({
    database_id: DB.kunden,
    filter: {
      and: [
        { property: "Email", email: { equals: email } },
        { property: "Portal-Zugang", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  if (res.results.length === 0) return null;

  const page = res.results[0] as any;
  return parseCustomer(page);
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  try {
    const page = (await notion.pages.retrieve({ page_id: id })) as any;
    return parseCustomer(page);
  } catch {
    return null;
  }
}

function parseCustomer(page: any): Customer {
  return {
    id: page.id,
    name: text(page.properties, "Name"),
    email: text(page.properties, "Email"),
    contactPerson: text(page.properties, "Contact"),
    phone: text(page.properties, "Phone") || undefined,
    portalAccess: checkbox(page.properties, "Portal-Zugang"),
    avvSigned: checkbox(page.properties, "AVV-Signiert"),
    avvSignedAt: dateVal(page.properties, "AVV-Signiert-Am"),
    avvSignedBy: text(page.properties, "AVV-Signiert-Von"),
    welcomeSent: checkbox(page.properties, "Willkommen-Gesendet"),
  };
}

export async function signAVV(customerId: string, signedBy: string) {
  const today = new Date().toISOString().split("T")[0];
  await notion.pages.update({
    page_id: customerId,
    properties: {
      "AVV-Signiert": { checkbox: true },
      "AVV-Signiert-Am": { date: { start: today } },
      "AVV-Signiert-Von": { rich_text: [{ text: { content: signedBy } }] },
    },
  });
}

export async function markWelcomeSent(customerId: string) {
  await notion.pages.update({
    page_id: customerId,
    properties: {
      "Willkommen-Gesendet": { checkbox: true },
    },
  });
}

// =====================================================================
// PROJECTS (Projects DB)
// Properties: Name (title), 👥 Client (relation), Status (status),
//             Area (select), Type (select), Deadline (date),
//             Priority (select), Notes (rich_text), Repo (url),
//             Next Action (rich_text), Invoice Status (select)
// =====================================================================

// Map Notion status names to our portal status type
function mapProjectStatus(notionStatus: string): ProjectStatus {
  const map: Record<string, ProjectStatus> = {
    "Not started": "Planung",
    "In progress": "Entwicklung",
    "on hold": "Anfrage",
    "Done": "Abgeschlossen",
  };
  return map[notionStatus] ?? "Entwicklung";
}

function mapProjectType(notionType: string): ProjectType {
  const map: Record<string, ProjectType> = {
    "Landing Page": "Website",
    "React Native App": "Sonstiges",
    "Website": "Website",
    "Onlineshop": "Website",
    "Prestige": "Website",
  };
  return map[notionType] ?? "Sonstiges";
}

export async function getProjectsForCustomer(customerId: string): Promise<Project[]> {
  const res = await notion.databases.query({
    database_id: DB.projekte,
    filter: {
      property: "👥 Client",
      relation: { contains: customerId },
    },
  });

  return res.results.map((page: any) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    customerId: relationId(page.properties, "👥 Client"),
    status: mapProjectStatus(selectName(page.properties, "Status")),
    progress: 0, // No progress field — will be calculated from milestones
    startDate: null,
    endDate: dateVal(page.properties, "Deadline"),
    description: text(page.properties, "Notes"),
    type: mapProjectType(selectName(page.properties, "Type")),
  }));
}

export async function getProject(projectId: string): Promise<Project | null> {
  try {
    const page = (await notion.pages.retrieve({ page_id: projectId })) as any;
    return {
      id: page.id,
      name: text(page.properties, "Name"),
      customerId: relationId(page.properties, "👥 Client"),
      status: mapProjectStatus(selectName(page.properties, "Status")),
      progress: 0,
      startDate: null,
      endDate: dateVal(page.properties, "Deadline"),
      description: text(page.properties, "Notes"),
      type: mapProjectType(selectName(page.properties, "Type")),
    };
  } catch {
    return null;
  }
}

// Helper: calculate progress from milestones
export function calculateProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;
  const done = milestones.filter((m) => m.status === "Erledigt").length;
  return Math.round((done / milestones.length) * 100);
}

// =====================================================================
// MILESTONES (Meilensteine DB — new)
// Properties: Name (title), Projekt (relation), Datum (date),
//             Status (select), Sortierung (number)
// =====================================================================

export async function getMilestonesForProject(projectId: string): Promise<Milestone[]> {
  const res = await notion.databases.query({
    database_id: DB.meilensteine,
    filter: {
      property: "Projekt",
      relation: { contains: projectId },
    },
    sorts: [{ property: "Sortierung", direction: "ascending" }],
  });

  return res.results.map((page: any) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    projectId: relationId(page.properties, "Projekt"),
    date: dateVal(page.properties, "Datum"),
    status: selectName(page.properties, "Status") as MilestoneStatus,
    order: num(page.properties, "Sortierung"),
  }));
}

// =====================================================================
// MESSAGES (Nachrichten DB)
// Properties: Betreff (title), Kunde (relation), Projekt (relation),
//             Nachricht (rich_text), Gelesen (checkbox), Typ (select),
//             Absender (select: Kunde/Team)
// =====================================================================

export async function getMessagesForCustomer(customerId: string): Promise<Message[]> {
  const res = await notion.databases.query({
    database_id: DB.nachrichten,
    filter: {
      property: "Kunde",
      relation: { contains: customerId },
    },
    sorts: [{ timestamp: "created_time", direction: "ascending" }],
  });

  return res.results.map((page: any) => ({
    id: page.id,
    subject: text(page.properties, "Betreff"),
    customerId: relationId(page.properties, "Kunde"),
    projectId: relationId(page.properties, "Projekt") || null,
    body: text(page.properties, "Nachricht"),
    createdAt: createdTime(page),
    read: checkbox(page.properties, "Gelesen"),
    type: (selectName(page.properties, "Typ") as MessageType) || "Sonstiges",
    sender: (selectName(page.properties, "Absender") as MessageSender) || "Kunde",
  }));
}

export async function createMessage(data: {
  subject: string;
  body: string;
  customerId: string;
  projectId?: string;
  type?: MessageType;
  sender?: MessageSender;
}) {
  const properties: Record<string, any> = {
    Betreff: { title: [{ text: { content: data.subject } }] },
    Nachricht: { rich_text: [{ text: { content: data.body } }] },
    Kunde: { relation: [{ id: data.customerId }] },
    Typ: { select: { name: data.type ?? "Anfrage" } },
    Absender: { select: { name: data.sender ?? "Kunde" } },
  };

  if (data.projectId) {
    properties.Projekt = { relation: [{ id: data.projectId }] };
  }

  return notion.pages.create({
    parent: { database_id: DB.nachrichten },
    properties,
  });
}

// =====================================================================
// DOCUMENTS (Dokumente DB — new)
// Properties: Name (title), Projekt (relation), Kunde (relation),
//             Datei (files), Kategorie (select)
// =====================================================================

export async function getDocumentsForCustomer(customerId: string): Promise<Document[]> {
  const res = await notion.databases.query({
    database_id: DB.dokumente,
    filter: {
      property: "Kunde",
      relation: { contains: customerId },
    },
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });

  return res.results.map((page: any) => {
    const file = fileUrl(page.properties, "Datei");
    return {
      id: page.id,
      name: text(page.properties, "Name"),
      projectId: relationId(page.properties, "Projekt") || null,
      customerId: relationId(page.properties, "Kunde"),
      fileUrl: file?.url ?? null,
      fileName: file?.name ?? null,
      category: (selectName(page.properties, "Kategorie") as DocumentCategory) || "Sonstiges",
      createdAt: createdTime(page),
    };
  });
}

export async function getDocumentFile(documentId: string): Promise<{ url: string; name: string } | null> {
  try {
    const page = (await notion.pages.retrieve({ page_id: documentId })) as any;
    return fileUrl(page.properties, "Datei");
  } catch {
    return null;
  }
}

// =====================================================================
// SUPPORT TICKETS (Support Tickets DB — existing)
// Properties: Projekt (title), Beschreibung (rich_text), Status (status),
//             Priorität (select), Typ (select), E-Mail (email),
//             Firma (rich_text), Name (rich_text), Domain (url),
//             Telefon (phone_number), Zusätzliche Infos (rich_text)
// Note: This DB doesn't have a Kunde relation — we match by email
// =====================================================================

export async function getTicketsForCustomer(customerId: string): Promise<Ticket[]> {
  // Support Tickets DB doesn't have a Client relation — we need to get the customer email first,
  // then filter by email. We get the customer from cache/session.
  // For now, we query by email passed separately.
  // This function is called with customerId but we need a different approach.
  // Let's get the customer first, then filter tickets by their email.
  return []; // Placeholder — will be called via getTicketsForEmail
}

export async function getTicketsForEmail(email: string): Promise<Ticket[]> {
  const res = await notion.databases.query({
    database_id: DB.support,
    filter: {
      property: "E-Mail",
      email: { equals: email },
    },
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });

  return res.results.map((page: any) => ({
    id: page.id,
    title: text(page.properties, "Projekt"), // "Projekt" is the title field in this DB
    customerId: "",
    projectId: null,
    description: text(page.properties, "Beschreibung"),
    priority: (selectName(page.properties, "Priorität") as TicketPriority) || "Normal",
    status: mapTicketStatus(selectName(page.properties, "Status")),
    createdAt: createdTime(page),
  }));
}

function mapTicketStatus(notionStatus: string): TicketStatus {
  const map: Record<string, TicketStatus> = {
    "Not started": "Offen",
    "In progress": "In Bearbeitung",
    "Done": "Geschlossen",
  };
  return map[notionStatus] ?? "Offen";
}

export async function createTicket(data: {
  title: string;
  description: string;
  customerId: string;
  email: string;
  companyName: string;
  projectId?: string;
  priority?: TicketPriority;
}) {
  const priorityMap: Record<string, string> = {
    Niedrig: "Niedrig",
    Normal: "Mittel",
    Hoch: "Hoch",
    Dringend: "Hoch",
  };

  const properties: Record<string, any> = {
    Projekt: { title: [{ text: { content: data.title } }] },
    Beschreibung: { rich_text: [{ text: { content: data.description } }] },
    "E-Mail": { email: data.email },
    Firma: { rich_text: [{ text: { content: data.companyName } }] },
    "Priorität": { select: { name: priorityMap[data.priority ?? "Normal"] ?? "Mittel" } },
    Typ: { select: { name: "Anpassung" } },
  };

  return notion.pages.create({
    parent: { database_id: DB.support },
    properties,
  });
}

// =====================================================================
// INVOICES (Invoices DB — existing)
// Properties: Name (title), Invoice No (rich_text), Client (rich_text),
//             Project (rich_text), Amount (number), Issue Date (date),
//             Due Date (date), Status (status)
// =====================================================================

const INVOICES_DB = "32842b0f-f641-81c3-a612-e4c610559181";

function mapInvoiceStatus(s: string): InvoiceStatus {
  const map: Record<string, InvoiceStatus> = {
    "Not started": "Entwurf",
    "In progress": "Gesendet",
    "Done": "Bezahlt",
  };
  return map[s] ?? "Entwurf";
}

export async function getInvoicesForClient(clientName: string): Promise<Invoice[]> {
  const res = await notion.databases.query({
    database_id: INVOICES_DB,
    filter: {
      property: "Client",
      rich_text: { contains: clientName },
    },
    sorts: [{ property: "Issue Date", direction: "descending" }],
  });

  return res.results.map((page: any) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    invoiceNo: text(page.properties, "Invoice No"),
    client: text(page.properties, "Client"),
    project: text(page.properties, "Project"),
    amount: num(page.properties, "Amount"),
    issueDate: dateVal(page.properties, "Issue Date"),
    dueDate: dateVal(page.properties, "Due Date"),
    status: mapInvoiceStatus(selectName(page.properties, "Status")),
  }));
}
