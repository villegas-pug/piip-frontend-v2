import { Injectable, signal } from '@angular/core';
import {
  AuditEvent,
  DocumentDossier,
  DocumentDossierSummary,
  DocumentRecord,
  InitiativeRecord,
  PiipPortfolioRecord,
  PreexistingProjectInput,
  ProjectOrigin,
  ProjectRecord,
  PiipRecordType,
  UserRole,
  WorkItem,
} from './piip.models';

@Injectable({ providedIn: 'root' })
export class PiipMockRepository {
  readonly role = signal<UserRole>('Administrador PIIP');

  readonly portfolioRecords = signal<PiipPortfolioRecord[]>([
    {
      recordType: 'Iniciativa', code: 'I-024-2026', originCode: 'NA',
      name: 'Mejoramiento del servicio de riego tecnificado en el valle de Ica',
      solutionType: 'Solución potencial o adaptable', source: 'Ficha de iniciativa de innovación pública',
      startDate: '2026-05-20', responsible: 'María López', peiObjective: 'Objetivo PEI declarado en el registro',
      poiActivity: 'Actividad POI declarada en el registro', responsibleUnits: 'DGIA',
      description: 'Necesidad de mejorar el acceso al riego tecnificado.', keyResults: '', note: '',
      status: 'Presentado', finalProductType: 'NA', digitalComponent: 'No', closingDate: '',
      technicalOpinionReport: 'Informe_Opinion_I-024-2026.pdf', formalApprovalDecision: '',
      finalProductApprovalDocument: '', projectManagementDocumentation: '', finalClosureReport: '',
    },
    {
      recordType: 'Proyecto', code: 'P-005-2026', originCode: 'NA',
      name: 'Red de Estaciones Agrometeorológicas', solutionType: 'No aplica', source: 'Otros',
      startDate: '2026-02-12', responsible: 'Carmen Rojas', peiObjective: 'Objetivo PEI declarado en el registro',
      poiActivity: 'Actividad POI declarada en el registro', responsibleUnits: 'DCLIMA',
      description: 'Proyecto preexistente registrado sin iniciativa formal de origen.', keyResults: '',
      note: 'Proyecto preexistente de demostración.', status: 'Proyecto en ejecución', finalProductType: 'NA',
      digitalComponent: 'Si', closingDate: '', technicalOpinionReport: 'No Aplica', formalApprovalDecision: 'No Aplica',
      finalProductApprovalDocument: '', projectManagementDocumentation: '', finalClosureReport: '',
    },
  ]);

  readonly workItems: WorkItem[] = [
    { code: 'I-024-2026', action: 'Registrar decisión', priority: 'Alta', assignedTo: 'DGIA', dueDate: '27/05/2026' },
    { code: 'I-019-2026', action: 'Revisar informe técnico', priority: 'Media', assignedTo: 'DIPNA', dueDate: '30/05/2026' },
  ];

  readonly initiatives: InitiativeRecord[] = [
    {
      code: 'I-024-2026',
      name: 'Mejoramiento del servicio de riego tecnificado en el valle de Ica',
      source: 'Ficha de iniciativa de innovación pública',
      responsible: 'María López',
      role: 'Analista de Inversiones',
      unit: 'DGIA',
      status: 'Presentado',
      updatedAt: '20/05/2026 10:15',
    },
    {
      code: 'I-019-2026',
      name: 'Fortalecimiento de capacidades para la gestión de la innovación agraria',
      source: 'Innovación abierta',
      responsible: 'Carlos Rojas',
      role: 'Especialista en Innovación',
      unit: 'DIPNA',
      status: 'Iniciativa aprobada',
      updatedAt: '18/05/2026 16:45',
    },
    {
      code: 'I-014-2026',
      name: 'Adquisición de equipamiento para la estación experimental agraria Santa Ana',
      source: 'Propuesta de jefatura o directivos',
      responsible: 'Lucía Fernández',
      role: 'Analista de Adquisiciones',
      unit: 'DGA',
      status: 'Iniciativa archivada',
      updatedAt: '15/05/2026 09:30',
    },
  ];

  readonly projects = signal<ProjectRecord[]>([
    { code: 'P-003-2026', name: 'Plataforma de Innovación Agraria Sostenible', originCode: 'I-014-2026', originMode: 'DERIVED_FROM_INITIATIVE', unit: 'DIPNA', responsible: 'María Quintana', status: 'Proyecto en ejecución', digitalComponent: 'Si' },
    { code: 'P-004-2026', name: 'Sistema de Información de Riego', originCode: 'I-010-2026', originMode: 'DERIVED_FROM_INITIATIVE', unit: 'DGA', responsible: 'Luis Calderón', status: 'Producto aprobado', digitalComponent: 'Si' },
    { code: 'P-005-2026', name: 'Red de Estaciones Agrometeorológicas', originCode: 'NA', originMode: 'PREEXISTING', unit: 'DCLIMA', responsible: 'Carmen Rojas', status: 'Proyecto en ejecución', digitalComponent: 'Si' },
    { code: 'P-006-2026', name: 'Capacitación Digital para Productores', originCode: 'I-008-2026', originMode: 'DERIVED_FROM_INITIATIVE', unit: 'DIPNA', responsible: 'José Vílchez', status: 'Suspendido', digitalComponent: 'No' },
    { code: 'P-007-2026', name: 'Trazabilidad de Productos Agrarios', originCode: 'I-003-2026', originMode: 'DERIVED_FROM_INITIATIVE', unit: 'DGESEP', responsible: 'Ana Lucía Prado', status: 'Producto aprobado', digitalComponent: 'Si' },
    { code: 'P-008-2026', name: 'Gestión de Suelos Degradados', originCode: 'NA', originMode: 'PREEXISTING', unit: 'DGIA', responsible: 'Miguel Torres', status: 'Proyecto en ejecución', digitalComponent: 'No' },
    { code: 'P-009-2026', name: 'Sanidad Vegetal con Monitoreo Digital', originCode: 'I-011-2026', originMode: 'DERIVED_FROM_INITIATIVE', unit: 'SENASA', responsible: 'Elena Paredes', status: 'Producto aprobado', digitalComponent: 'Si' },
    { code: 'P-010-2026', name: 'Módulo de Seguros Agrarios', originCode: 'NA', originMode: 'PREEXISTING', unit: 'DGA', responsible: 'Ricardo Salazar', status: 'Suspendido', digitalComponent: 'No' },
  ]);

  readonly documentDossiers = signal<DocumentDossier[]>([
    {
      recordType: 'Iniciativa',
      code: 'I-024-2026',
      name: 'Mejoramiento del servicio de riego tecnificado en el valle de Ica',
      unit: 'DGIA',
      status: 'Presentado',
      lastActivity: '23/05/2026 10:28',
      stages: [
        {
          title: '1. Registro inicial',
          records: [
            { name: 'Ficha de Iniciativa de Innovación Pública', required: true, filename: 'Ficha_Iniciativa_I-024-2026.pdf', version: '1.0', uploadedAt: '20/05/2026', state: 'Cargado' },
          ],
        },
        {
          title: '2. Evaluación',
          records: [
            { name: 'Informe de opinión técnica de evaluación de iniciativa', required: false, filename: 'Informe_Opinion_I-024-2026.pdf', version: '1.0', uploadedAt: '23/05/2026', state: 'Cargado' },
          ],
        },
        {
          title: '3. Decisión',
          records: [
            { name: 'Documento formal de decisión de aprobación', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
          ],
        },
        {
          title: '4. Etapas posteriores',
          records: [
            { name: 'Documento formal de aprobación de producto final', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
            { name: 'Documentación de la gestión del proyecto', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
            { name: 'Informe final de cierre', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
          ],
        },
      ],
    },
    {
      recordType: 'Iniciativa',
      code: 'I-019-2026',
      name: 'Fortalecimiento de capacidades para la gestión de la innovación agraria',
      unit: 'DIPNA',
      status: 'Iniciativa aprobada',
      lastActivity: '18/05/2026 16:45',
      stages: [
        { title: '1. Registro inicial', records: [{ name: 'Ficha de Iniciativa de Innovación Pública', required: true, filename: 'Ficha_Iniciativa_I-019-2026.pdf', version: '1.0', uploadedAt: '06/05/2026', state: 'Cargado' }] },
        { title: '2. Evaluación', records: [{ name: 'Informe de opinión técnica de evaluación de iniciativa', required: false, filename: 'Informe_Opinion_I-019-2026.pdf', version: '1.0', uploadedAt: '14/05/2026', state: 'Cargado' }] },
        { title: '3. Decisión', records: [{ name: 'Documento formal de decisión de aprobación', required: false, filename: 'Decision_I-019-2026.pdf', version: '1.0', uploadedAt: '18/05/2026', state: 'Cargado' }] },
        { title: '4. Etapas posteriores', records: [
          { name: 'Documento formal de aprobación de producto final', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
          { name: 'Documentación de la gestión del proyecto', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
          { name: 'Informe final de cierre', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
        ] },
      ],
    },
    {
      recordType: 'Proyecto',
      code: 'P-005-2026',
      name: 'Red de Estaciones Agrometeorológicas',
      unit: 'DCLIMA',
      status: 'Proyecto en ejecución',
      lastActivity: '24/05/2026 11:10',
      stages: [
        { title: '1. Registro inicial', records: [{ name: 'Ficha de Iniciativa de Innovación Pública', required: false, filename: null, version: null, uploadedAt: null, state: 'No aplica' }] },
        { title: '2. Evaluación', records: [{ name: 'Informe de opinión técnica de evaluación de iniciativa', required: false, filename: null, version: null, uploadedAt: null, state: 'No aplica' }] },
        { title: '3. Decisión', records: [{ name: 'Documento formal de decisión de aprobación', required: false, filename: null, version: null, uploadedAt: null, state: 'No aplica' }] },
        { title: '4. Etapas posteriores', records: [
          { name: 'Documento formal de aprobación de producto final', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
          { name: 'Documentación de la gestión del proyecto', required: false, filename: 'Gestion_Proyecto_P-005-2026.pdf', version: '1.0', uploadedAt: '24/05/2026', state: 'Cargado' },
          { name: 'Informe final de cierre', required: false, filename: null, version: null, uploadedAt: null, state: 'Pendiente' },
        ] },
      ],
    },
  ]);

  readonly auditEvents = signal<AuditEvent[]>([
    { timestamp: '20/05/2026\n09:31:12', event: 'Iniciativa creada', user: 'Administrador PIIP', email: 'admin.piip@midagri.gob.pe', observation: 'Se inició un borrador local del registro.', icon: 'add' },
    { timestamp: '20/05/2026\n09:45:27', event: 'Ficha inicial cargada', user: 'Administrador PIIP', email: 'admin.piip@midagri.gob.pe', observation: 'Se cargó la ficha inicial de la iniciativa.', documentName: 'Ficha_inicial_I-024-2026.pdf', icon: 'description' },
    { timestamp: '20/05/2026\n10:02:44', event: 'Estado cambiado a Presentado', user: 'Administrador PIIP', email: 'admin.piip@midagri.gob.pe', observation: 'La iniciativa fue presentada para evaluación.', icon: 'check' },
    { timestamp: '20/05/2026\n10:28:19', event: 'Informe técnico cargado', user: 'Administrador PIIP', email: 'admin.piip@midagri.gob.pe', observation: 'Se cargó el informe técnico de evaluación.', documentName: 'Informe_tecnico_I-024-2026.pdf', icon: 'cloud_upload' },
  ]);

  toggleRole(): void {
    this.role.update((role) => (role === 'Administrador PIIP' ? 'Consulta externa' : 'Administrador PIIP'));
  }

  getDocumentDossier(recordType: PiipRecordType, code: string): DocumentDossier | undefined {
    return this.documentDossiers().find((dossier) => dossier.recordType === recordType && dossier.code === code);
  }

  getDocumentDossierSummaries(): DocumentDossierSummary[] {
    return this.documentDossiers().map(summarizeDocumentDossier);
  }

  saveDraft(value: unknown): void {
    localStorage.setItem('piip-web2-initiative-draft', JSON.stringify(value));
  }

  savePreexistingProjectDraft(value: unknown): void {
    localStorage.setItem('piip-web2-preexisting-project-draft', JSON.stringify(value));
  }

  registerPreexistingProject(input: PreexistingProjectInput): void {
    if (this.role() !== 'Administrador PIIP') {
      throw new Error('El perfil Consulta externa no puede registrar proyectos.');
    }

    const originCode = resolveProjectOriginCode({ mode: 'PREEXISTING', initiativeCode: 'NA' });
    const portfolioRecord: PiipPortfolioRecord = {
      recordType: 'Proyecto',
      code: input.code,
      originCode,
      name: input.name,
      solutionType: 'No aplica',
      source: input.source,
      startDate: input.startDate,
      responsible: input.responsible,
      peiObjective: input.peiObjective,
      poiActivity: input.poiActivity,
      responsibleUnits: input.responsibleUnits,
      description: input.description,
      keyResults: input.keyResults,
      note: input.note,
      status: 'Proyecto en ejecución',
      finalProductType: 'NA',
      digitalComponent: input.digitalComponent,
      closingDate: '',
      technicalOpinionReport: input.technicalOpinionReport,
      formalApprovalDecision: input.formalApprovalDecision,
      finalProductApprovalDocument: input.finalProductApprovalDocument,
      projectManagementDocumentation: input.projectManagementDocumentation,
      finalClosureReport: input.finalClosureReport,
    };

    this.portfolioRecords.update((records) => [portfolioRecord, ...records]);
    this.projects.update((projects) => [
      {
        code: input.code,
        name: input.name,
        originCode,
        originMode: 'PREEXISTING',
        unit: input.responsibleUnits,
        responsible: input.responsible,
        status: 'Proyecto en ejecución',
        digitalComponent: input.digitalComponent,
      },
      ...projects,
    ]);
    this.documentDossiers.update((dossiers) => [createPreexistingDocumentDossier(input), ...dossiers]);
    this.auditEvents.update((events) => [
      {
        timestamp: new Intl.DateTimeFormat('es-PE', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date()).replace(', ', '\n'),
        event: 'Proyecto preexistente registrado',
        user: 'Administrador PIIP',
        email: 'admin.piip@midagri.gob.pe',
        observation: `${input.code} se incorporó al portafolio sin iniciativa predecesora.`,
        icon: 'inventory_2',
      },
      ...events,
    ]);
  }
}

export function summarizeDocumentDossier(dossier: DocumentDossier): DocumentDossierSummary {
  const documents = dossier.stages.flatMap((stage) => stage.records);
  return {
    recordType: dossier.recordType,
    code: dossier.code,
    name: dossier.name,
    unit: dossier.unit,
    status: dossier.status,
    loadedCount: documents.filter((document) => document.state === 'Cargado').length,
    pendingCount: documents.filter((document) => document.state === 'Pendiente').length,
    notApplicableCount: documents.filter((document) => document.state === 'No aplica').length,
    lastActivity: dossier.lastActivity,
  };
}

function createPreexistingProjectDocument(name: string, value: string): DocumentRecord {
  if (value === 'No Aplica') {
    return { name, required: false, filename: null, version: null, uploadedAt: null, state: 'No aplica' };
  }

  return {
    name,
    required: false,
    filename: value || null,
    version: value ? '1.0' : null,
    uploadedAt: value ? new Intl.DateTimeFormat('es-PE').format(new Date()) : null,
    state: value ? 'Cargado' : 'Pendiente',
  };
}

function createPreexistingDocumentDossier(input: PreexistingProjectInput): DocumentDossier {
  return {
    recordType: 'Proyecto',
    code: input.code,
    name: input.name,
    unit: input.responsibleUnits,
    status: 'Proyecto en ejecución',
    lastActivity: new Intl.DateTimeFormat('es-PE', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()),
    stages: [
      { title: '1. Registro inicial', records: [{ name: 'Ficha de Iniciativa de Innovación Pública', required: false, filename: null, version: null, uploadedAt: null, state: 'No aplica' }] },
      { title: '2. Evaluación', records: [createPreexistingProjectDocument('Informe de opinión técnica de evaluación de iniciativa', input.technicalOpinionReport)] },
      { title: '3. Decisión', records: [createPreexistingProjectDocument('Documento formal de decisión de aprobación', input.formalApprovalDecision)] },
      { title: '4. Etapas posteriores', records: [
        createPreexistingProjectDocument('Documento formal de aprobación de producto final', input.finalProductApprovalDocument),
        createPreexistingProjectDocument('Documentación de la gestión del proyecto', input.projectManagementDocumentation),
        createPreexistingProjectDocument('Informe final de cierre', input.finalClosureReport),
      ] },
    ],
  };
}

export function resolveProjectOriginCode(origin: ProjectOrigin): string {
  if (origin.mode === 'PREEXISTING') return 'NA';
  const initiativeCode = origin.initiativeCode.trim();
  if (!initiativeCode) throw new Error('Un proyecto derivado requiere una iniciativa aprobada.');
  return initiativeCode;
}
