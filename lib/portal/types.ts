export interface SessionData {
  customerId: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  phone?: string;
  portalAccess: boolean;
  avvSigned: boolean;
  avvSignedAt: string | null;
  avvSignedBy: string;
  welcomeSent: boolean;
}

export type ProjectStatus =
  | "Anfrage"
  | "Planung"
  | "Design"
  | "Entwicklung"
  | "Testing"
  | "Live"
  | "Abgeschlossen";

export type ProjectType =
  | "Website"
  | "Relaunch"
  | "SEO"
  | "Wartung"
  | "Sonstiges";

export interface Project {
  id: string;
  name: string;
  customerId: string;
  status: ProjectStatus;
  progress: number;
  startDate: string | null;
  endDate: string | null;
  description: string;
  type: ProjectType;
}

export type MilestoneStatus = "Offen" | "In Arbeit" | "Erledigt";

export interface Milestone {
  id: string;
  name: string;
  projectId: string;
  date: string | null;
  status: MilestoneStatus;
  order: number;
}

export type MessageType = "Anfrage" | "Feedback" | "Sonstiges";

export type MessageSender = "Kunde" | "Team";

export interface Message {
  id: string;
  subject: string;
  customerId: string;
  projectId: string | null;
  body: string;
  createdAt: string;
  read: boolean;
  type: MessageType;
  sender: MessageSender;
}

export type InvoiceStatus = "Entwurf" | "Gesendet" | "Bezahlt" | "Überfällig";

export interface Invoice {
  id: string;
  name: string;
  invoiceNo: string;
  client: string;
  project: string;
  amount: number;
  issueDate: string | null;
  dueDate: string | null;
  status: InvoiceStatus;
}

export type DocumentCategory =
  | "Angebot"
  | "Rechnung"
  | "Vertrag"
  | "Design"
  | "Sonstiges";

export interface Document {
  id: string;
  name: string;
  projectId: string | null;
  customerId: string;
  fileUrl: string | null;
  fileName: string | null;
  category: DocumentCategory;
  createdAt: string;
}

export type TicketPriority = "Niedrig" | "Normal" | "Hoch" | "Dringend";

export type TicketStatus =
  | "Offen"
  | "In Bearbeitung"
  | "Warten auf Antwort"
  | "Geschlossen";

export interface Ticket {
  id: string;
  title: string;
  customerId: string;
  projectId: string | null;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}
