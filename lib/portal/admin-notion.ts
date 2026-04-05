import { Client } from "@notionhq/client";
import type {
  Customer, Project, ProjectStatus, ProjectType, Invoice, InvoiceStatus,
  Message, MessageType, MessageSender, Milestone, MilestoneStatus,
  Document, DocumentCategory, Ticket, TicketPriority, TicketStatus,
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

const INVOICES_DB = "32842b0f-f641-81c3-a612-e4c610559181";

// --- helpers (same as notion.ts) ---
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
function relationId(props: Record<string, any>, key: string): string {
  return props[key]?.relation?.[0]?.id ?? "";
}
function urlVal(props: Record<string, any>, key: string): string {
  return props[key]?.url ?? "";
}

function mapProjectStatus(s: string): ProjectStatus {
  const map: Record<string, ProjectStatus> = {
    "Not started": "Planung",
    "In progress": "Entwicklung",
    "on hold": "Anfrage",
    "Done": "Abgeschlossen",
  };
  return map[s] ?? "Entwicklung";
}
function mapProjectType(s: string): ProjectType {
  const map: Record<string, ProjectType> = {
    "Landing Page": "Website",
    "React Native App": "Sonstiges",
    Website: "Website",
    Onlineshop: "Website",
    Prestige: "Website",
  };
  return map[s] ?? "Sonstiges";
}
function mapInvoiceStatus(s: string): InvoiceStatus {
  const map: Record<string, InvoiceStatus> = {
    "Not started": "Entwurf",
    "In progress": "Gesendet",
    Done: "Bezahlt",
  };
  return map[s] ?? "Entwurf";
}

// =====================================================================
// ALL CUSTOMERS
// =====================================================================
export async function getAllCustomers(): Promise<Customer[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: DB.kunden,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  return pages.map((page: any) => ({
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
  }));
}

// =====================================================================
// ALL PROJECTS (with customer name resolved)
// =====================================================================
export interface AdminProject extends Project {
  customerName: string;
  notionStatus: string;
  repo: string;
  liveUrl: string;
  area: string;
  priority: string;
  invoiceStatus: string;
  nextAction: string;
  createdAt: string;
  pinned: boolean;
  archived: boolean;
  assignedTo: string;
}

// =====================================================================
// BACKLOG TASKS
// =====================================================================
export interface BacklogTask {
  id: string;
  name: string;
  projectId: string;
  status: string;
  assignedTo: string;
  priority: string;
  dueDate: string | null;
  notes: string;
  createdAt: string;
}

// =====================================================================
// ABOS / SUBSCRIPTIONS
// =====================================================================
export interface Abo {
  id: string;
  name: string;
  anbieter: string;
  kosten: number;
  intervall: string;
  naechsteVerlaengerung: string | null;
  status: string;
  kategorie: string;
  projektId: string;
  notizen: string;
}

export async function getAllProjects(): Promise<AdminProject[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: DB.projekte,
      start_cursor: cursor,
      page_size: 100,
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  // Collect unique customer IDs to resolve names
  const customerIds = new Set<string>();
  const projectRows = pages.map((page: any) => {
    const cid = relationId(page.properties, "👥 Client");
    if (cid) customerIds.add(cid);
    return {
      page,
      customerId: cid,
      notionStatus: selectName(page.properties, "Status"),
    };
  });

  // Batch-resolve customer names
  const customerNames: Record<string, string> = {};
  await Promise.all(
    [...customerIds].map(async (id) => {
      try {
        const p = (await notion.pages.retrieve({ page_id: id })) as any;
        customerNames[id] = text(p.properties, "Name");
      } catch {
        customerNames[id] = "–";
      }
    })
  );

  const results = projectRows.map(({ page, customerId, notionStatus }) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    customerId,
    customerName: customerNames[customerId] || "–",
    status: mapProjectStatus(notionStatus),
    notionStatus,
    progress: 0,
    startDate: null,
    endDate: dateVal(page.properties, "Deadline"),
    description: text(page.properties, "Notes"),
    type: mapProjectType(selectName(page.properties, "Type")),
    repo: urlVal(page.properties, "Repo"),
    liveUrl: urlVal(page.properties, "Live URL"),
    area: selectName(page.properties, "Area"),
    priority: selectName(page.properties, "Priority"),
    invoiceStatus: selectName(page.properties, "Invoice Status"),
    nextAction: text(page.properties, "Next Action"),
    createdAt: dateVal(page.properties, "Erstellt") || page.created_time?.split("T")[0] || "",
    pinned: checkbox(page.properties, "Pinned"),
    archived: checkbox(page.properties, "Archived"),
    assignedTo: selectName(page.properties, "Assigned To"),
  }));

  // Sort by Erstellt date descending (newest first)
  results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return results;
}

// =====================================================================
// SINGLE PROJECT (with milestones)
// =====================================================================
export async function getProjectById(projectId: string): Promise<AdminProject | null> {
  try {
    const page = (await notion.pages.retrieve({ page_id: projectId })) as any;
    const customerId = relationId(page.properties, "👥 Client");
    let customerName = "–";
    if (customerId) {
      try {
        const cp = (await notion.pages.retrieve({ page_id: customerId })) as any;
        customerName = text(cp.properties, "Name");
      } catch {}
    }
    const notionStatus = selectName(page.properties, "Status");
    return {
      id: page.id,
      name: text(page.properties, "Name"),
      customerId,
      customerName,
      status: mapProjectStatus(notionStatus),
      notionStatus,
      progress: 0,
      startDate: null,
      endDate: dateVal(page.properties, "Deadline"),
      description: text(page.properties, "Notes"),
      type: mapProjectType(selectName(page.properties, "Type")),
      repo: urlVal(page.properties, "Repo"),
      liveUrl: urlVal(page.properties, "Live URL"),
      area: selectName(page.properties, "Area"),
      priority: selectName(page.properties, "Priority"),
      invoiceStatus: selectName(page.properties, "Invoice Status"),
      nextAction: text(page.properties, "Next Action"),
      createdAt: dateVal(page.properties, "Erstellt") || page.created_time?.split("T")[0] || "",
      pinned: checkbox(page.properties, "Pinned"),
      archived: checkbox(page.properties, "Archived"),
      assignedTo: selectName(page.properties, "Assigned To"),
    };
  } catch {
    return null;
  }
}

// =====================================================================
// MILESTONES FOR PROJECT
// =====================================================================
export async function getMilestonesForProject(projectId: string): Promise<Milestone[]> {
  const res = await notion.databases.query({
    database_id: DB.meilensteine,
    filter: { property: "Projekt", relation: { contains: projectId } },
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
// ALL MESSAGES
// =====================================================================
export async function getAllMessages(): Promise<(Message & { customerName?: string })[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: DB.nachrichten,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  return pages.map((page: any) => ({
    id: page.id,
    subject: text(page.properties, "Betreff"),
    customerId: relationId(page.properties, "Kunde"),
    projectId: relationId(page.properties, "Projekt") || null,
    body: text(page.properties, "Nachricht"),
    createdAt: page.created_time ?? "",
    read: checkbox(page.properties, "Gelesen"),
    type: (selectName(page.properties, "Typ") as MessageType) || "Sonstiges",
    sender: (selectName(page.properties, "Absender") as MessageSender) || "Kunde",
  }));
}

// =====================================================================
// ALL DOCUMENTS
// =====================================================================
export async function getAllDocuments(): Promise<Document[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: DB.dokumente,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  return pages.map((page: any) => {
    const files = page.properties.Datei?.files;
    const f = files?.[0];
    const fileUrlVal = f ? (f.type === "external" ? f.external?.url : f.file?.url) : null;
    return {
      id: page.id,
      name: text(page.properties, "Name"),
      projectId: relationId(page.properties, "Projekt") || null,
      customerId: relationId(page.properties, "Kunde"),
      fileUrl: fileUrlVal ?? null,
      fileName: f?.name ?? null,
      category: (selectName(page.properties, "Kategorie") as DocumentCategory) || "Sonstiges",
      createdAt: page.created_time ?? "",
    };
  });
}

// =====================================================================
// ALL SUPPORT TICKETS
// =====================================================================
export async function getAllTickets(): Promise<Ticket[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: DB.support,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  const statusMap: Record<string, TicketStatus> = {
    "Not started": "Offen",
    "In progress": "In Bearbeitung",
    Done: "Geschlossen",
  };

  return pages.map((page: any) => ({
    id: page.id,
    title: text(page.properties, "Projekt"),
    customerId: "",
    projectId: null,
    description: text(page.properties, "Beschreibung"),
    priority: (selectName(page.properties, "Priorität") as TicketPriority) || "Normal",
    status: statusMap[selectName(page.properties, "Status")] ?? "Offen",
    createdAt: page.created_time ?? "",
  }));
}

// =====================================================================
// PROJECTS FOR CUSTOMER
// =====================================================================
export async function getProjectsForCustomer(customerId: string): Promise<AdminProject[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.customerId === customerId);
}

// =====================================================================
// SINGLE CUSTOMER
// =====================================================================
export async function getCustomerById(id: string): Promise<Customer | null> {
  try {
    const page = (await notion.pages.retrieve({ page_id: id })) as any;
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
  } catch {
    return null;
  }
}

// =====================================================================
// ALL INVOICES
// =====================================================================
export async function getAllInvoices(): Promise<Invoice[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: INVOICES_DB,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ property: "Issue Date", direction: "descending" }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  return pages.map((page: any) => ({
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

// =====================================================================
// BACKLOG TASKS
// =====================================================================
const BACKLOG_DB = process.env.NOTION_BACKLOG_DB!;

export async function getBacklogForProject(projectId: string): Promise<BacklogTask[]> {
  const res = await notion.databases.query({
    database_id: BACKLOG_DB,
    filter: { property: "Projekt", relation: { contains: projectId } },
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });
  return res.results.map((page: any) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    projectId: relationId(page.properties, "Projekt"),
    status: selectName(page.properties, "Status") || "Backlog",
    assignedTo: selectName(page.properties, "Assigned To"),
    priority: selectName(page.properties, "Priority"),
    dueDate: dateVal(page.properties, "Due Date"),
    notes: text(page.properties, "Notes"),
    createdAt: page.created_time ?? "",
  }));
}

export async function getAllBacklogTasks(): Promise<BacklogTask[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: BACKLOG_DB,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  return pages.map((page: any) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    projectId: relationId(page.properties, "Projekt"),
    status: selectName(page.properties, "Status") || "Backlog",
    assignedTo: selectName(page.properties, "Assigned To"),
    priority: selectName(page.properties, "Priority"),
    dueDate: dateVal(page.properties, "Due Date"),
    notes: text(page.properties, "Notes"),
    createdAt: page.created_time ?? "",
  }));
}

export async function createBacklogTask(data: {
  name: string; projectId: string; status?: string;
  assignedTo?: string; priority?: string; dueDate?: string; notes?: string;
}) {
  const properties: Record<string, any> = {
    Name: { title: [{ text: { content: data.name } }] },
    Projekt: { relation: [{ id: data.projectId }] },
    Status: { select: { name: data.status || "Backlog" } },
  };
  if (data.assignedTo) properties["Assigned To"] = { select: { name: data.assignedTo } };
  if (data.priority) properties.Priority = { select: { name: data.priority } };
  if (data.dueDate) properties["Due Date"] = { date: { start: data.dueDate } };
  if (data.notes) properties.Notes = { rich_text: [{ text: { content: data.notes } }] };

  return notion.pages.create({ parent: { database_id: BACKLOG_DB }, properties });
}

export async function updateBacklogTask(taskId: string, data: Record<string, any>) {
  const properties: Record<string, any> = {};
  if (data.name !== undefined) properties.Name = { title: [{ text: { content: data.name } }] };
  if (data.status !== undefined) properties.Status = { select: { name: data.status } };
  if (data.assignedTo !== undefined) {
    properties["Assigned To"] = data.assignedTo ? { select: { name: data.assignedTo } } : { select: null };
  }
  if (data.priority !== undefined) {
    properties.Priority = data.priority ? { select: { name: data.priority } } : { select: null };
  }
  if (data.dueDate !== undefined) {
    properties["Due Date"] = data.dueDate ? { date: { start: data.dueDate } } : { date: null };
  }
  if (data.notes !== undefined) properties.Notes = { rich_text: [{ text: { content: data.notes } }] };

  return notion.pages.update({ page_id: taskId, properties });
}

export async function deleteBacklogTask(taskId: string) {
  return notion.pages.update({ page_id: taskId, archived: true });
}

// =====================================================================
// ABOS / SUBSCRIPTIONS
// =====================================================================
const ABOS_DB = process.env.NOTION_ABOS_DB!;

export async function getAllAbos(): Promise<Abo[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: ABOS_DB,
      start_cursor: cursor,
      page_size: 100,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor! : undefined;
  } while (cursor);

  return pages.map((page: any) => ({
    id: page.id,
    name: text(page.properties, "Name"),
    anbieter: text(page.properties, "Anbieter"),
    kosten: num(page.properties, "Kosten"),
    intervall: selectName(page.properties, "Intervall"),
    naechsteVerlaengerung: dateVal(page.properties, "Nächste Verlängerung"),
    status: selectName(page.properties, "Status") || "Aktiv",
    kategorie: selectName(page.properties, "Kategorie"),
    projektId: relationId(page.properties, "Projekt"),
    notizen: text(page.properties, "Notizen"),
  }));
}

export async function createAbo(data: {
  name: string; anbieter?: string; kosten?: number; intervall?: string;
  naechsteVerlaengerung?: string; status?: string; kategorie?: string;
  projektId?: string; notizen?: string;
}) {
  const properties: Record<string, any> = {
    Name: { title: [{ text: { content: data.name } }] },
  };
  if (data.anbieter) properties.Anbieter = { rich_text: [{ text: { content: data.anbieter } }] };
  if (data.kosten !== undefined) properties.Kosten = { number: data.kosten };
  if (data.intervall) properties.Intervall = { select: { name: data.intervall } };
  if (data.naechsteVerlaengerung) properties["Nächste Verlängerung"] = { date: { start: data.naechsteVerlaengerung } };
  if (data.status) properties.Status = { select: { name: data.status } };
  if (data.kategorie) properties.Kategorie = { select: { name: data.kategorie } };
  if (data.projektId) properties.Projekt = { relation: [{ id: data.projektId }] };
  if (data.notizen) properties.Notizen = { rich_text: [{ text: { content: data.notizen } }] };

  return notion.pages.create({ parent: { database_id: ABOS_DB }, properties });
}

export async function updateAbo(aboId: string, data: Record<string, any>) {
  const properties: Record<string, any> = {};
  if (data.name !== undefined) properties.Name = { title: [{ text: { content: data.name } }] };
  if (data.anbieter !== undefined) properties.Anbieter = { rich_text: [{ text: { content: data.anbieter } }] };
  if (data.kosten !== undefined) properties.Kosten = { number: data.kosten };
  if (data.intervall !== undefined) properties.Intervall = { select: { name: data.intervall } };
  if (data.naechsteVerlaengerung !== undefined) {
    properties["Nächste Verlängerung"] = data.naechsteVerlaengerung ? { date: { start: data.naechsteVerlaengerung } } : { date: null };
  }
  if (data.status !== undefined) properties.Status = { select: { name: data.status } };
  if (data.kategorie !== undefined) properties.Kategorie = { select: { name: data.kategorie } };
  if (data.notizen !== undefined) properties.Notizen = { rich_text: [{ text: { content: data.notizen } }] };

  return notion.pages.update({ page_id: aboId, properties });
}

export async function deleteAbo(aboId: string) {
  return notion.pages.update({ page_id: aboId, archived: true });
}
