export type PiipStatus =
  | 'Presentado'
  | 'Iniciativa aprobada'
  | 'Iniciativa archivada'
  | 'Proyecto en ejecución'
  | 'Producto aprobado'
  | 'Producto no aprobado'
  | 'Suspendido'
  | 'Cancelado'
  | 'Finalizado'
  | 'No Aplicable'
  | 'No Admisible';

export type UserRole = 'Administrador PIIP' | 'Consulta externa';

export type PiipRecordType = 'Iniciativa' | 'Proyecto';

export type ProjectOriginMode = 'DERIVED_FROM_INITIATIVE' | 'PREEXISTING';

export type ProjectOrigin =
  | { mode: 'DERIVED_FROM_INITIATIVE'; initiativeCode: string }
  | { mode: 'PREEXISTING'; initiativeCode: 'NA' };

/** Contrato plano equivalente a los 23 campos operativos del Excel PIIP. */
export interface PiipPortfolioRecord {
  recordType: PiipRecordType;
  code: string;
  originCode: string;
  name: string;
  solutionType: 'Solución potencial o adaptable' | 'Solución por definir' | 'No aplica';
  source: string;
  startDate: string;
  responsible: string;
  peiObjective: string;
  poiActivity: string;
  responsibleUnits: string;
  description: string;
  keyResults: string;
  note: string;
  status: PiipStatus;
  finalProductType: 'Prototipo de solución conceptualizada' | 'Solución funcional' | 'NA';
  digitalComponent: 'Si' | 'No';
  closingDate: string;
  technicalOpinionReport: string;
  formalApprovalDecision: string;
  finalProductApprovalDocument: string;
  projectManagementDocumentation: string;
  finalClosureReport: string;
}

export interface InitiativeRecord {
  code: string;
  name: string;
  source: string;
  responsible: string;
  role: string;
  unit: string;
  status: PiipStatus;
  updatedAt: string;
}

export interface ProjectRecord {
  code: string;
  name: string;
  originCode: string;
  originMode: ProjectOriginMode;
  unit: string;
  responsible: string;
  status: PiipStatus;
  digitalComponent: 'Si' | 'No';
}

export interface PreexistingProjectInput {
  code: string;
  name: string;
  startDate: string;
  source: string;
  responsible: string;
  responsibleUnits: string;
  peiObjective: string;
  poiActivity: string;
  description: string;
  keyResults: string;
  note: string;
  digitalComponent: 'Si' | 'No';
  technicalOpinionReport: string;
  formalApprovalDecision: string;
  finalProductApprovalDocument: string;
  projectManagementDocumentation: string;
  finalClosureReport: string;
}

export interface InitiativeDecisionInput {
  initiativeCode: string;
  targetStatus: 'Iniciativa aprobada';
  observation: string;
}

export interface DerivedProjectInput {
  initiativeCode: string;
  code: string;
  startDate: string;
  name: string;
  solutionType: PiipPortfolioRecord['solutionType'];
  source: string;
  responsible: string;
  responsibleUnits: string;
  peiObjective: string;
  poiActivity: string;
  description: string;
  keyResults: string;
  note: string;
  digitalComponent: PiipPortfolioRecord['digitalComponent'];
}

export interface InitiativeDetail {
  initiative: InitiativeRecord;
  portfolioRecord: PiipPortfolioRecord;
  dossier?: DocumentDossier;
  derivedProject?: ProjectRecord;
}

export interface DocumentRecord {
  name: string;
  required: boolean;
  filename: string | null;
  version: string | null;
  uploadedAt: string | null;
  state: 'Cargado' | 'Pendiente' | 'No aplica';
}

export interface DocumentStage {
  title: string;
  records: DocumentRecord[];
}

export interface DocumentDossier {
  recordType: PiipRecordType;
  code: string;
  name: string;
  unit: string;
  status: PiipStatus;
  lastActivity: string;
  stages: DocumentStage[];
}

export interface DocumentDossierSummary {
  recordType: PiipRecordType;
  code: string;
  name: string;
  unit: string;
  status: PiipStatus;
  loadedCount: number;
  pendingCount: number;
  notApplicableCount: number;
  lastActivity: string;
}

export interface AuditEvent {
  recordCode?: string;
  timestamp: string;
  event: string;
  user: string;
  email: string;
  observation: string;
  documentName?: string;
  icon: string;
}

export interface WorkItem {
  code: string;
  action: string;
  priority: 'Alta' | 'Media';
  assignedTo: string;
  dueDate: string;
}
