import { TestBed } from '@angular/core/testing';
import { PIIP_CATALOGS } from './piip.catalogs';
import { PiipMockRepository, resolveProjectOriginCode } from './piip-mock.repository';

describe('PIIP functional source', () => {
  it('keeps the six Excel catalogs and their canonical values', () => {
    expect(Object.keys(PIIP_CATALOGS)).toHaveLength(6);
    expect(PIIP_CATALOGS.recordTypes).toEqual(['Iniciativa', 'Proyecto']);
    expect(PIIP_CATALOGS.solutionTypes).toContain('No aplica');
    expect(PIIP_CATALOGS.statuses).toContain('No Aplicable');
    expect(PIIP_CATALOGS.statuses).toContain('No Admisible');
    expect(PIIP_CATALOGS.finalProductTypes).toContain('NA');
    expect(PIIP_CATALOGS.digitalComponents).toEqual(['Si', 'No']);
  });

  it('uses only confirmed document names in the mock repository', () => {
    const repository = TestBed.inject(PiipMockRepository);
    const initiativeDossier = repository.getDocumentDossier('Iniciativa', 'I-024-2026');
    const names = initiativeDossier?.stages.flatMap((stage) => stage.records.map((record) => record.name));
    expect(names).toEqual([
      'Ficha de Iniciativa de Innovación Pública',
      'Informe de opinión técnica de evaluación de iniciativa',
      'Documento formal de decisión de aprobación',
      'Documento formal de aprobación de producto final',
      'Documentación de la gestión del proyecto',
      'Informe final de cierre',
    ]);
  });

  it('summarizes initiatives and projects without counting No aplica as pending', () => {
    const repository = TestBed.inject(PiipMockRepository);
    const project = repository.getDocumentDossierSummaries().find((dossier) => dossier.code === 'P-005-2026');

    expect(project?.recordType).toBe('Proyecto');
    expect(project?.loadedCount).toBe(1);
    expect(project?.pendingCount).toBe(2);
    expect(project?.notApplicableCount).toBe(3);
  });

  it('does not silently fall back when a document dossier does not exist', () => {
    const repository = TestBed.inject(PiipMockRepository);
    expect(repository.getDocumentDossier('Iniciativa', 'I-999-2026')).toBeUndefined();
    expect(repository.getDocumentDossier('Proyecto', 'I-024-2026')).toBeUndefined();
  });

  it('models the 23 operational Excel fields without adding the initial ficha to that flat contract', () => {
    const repository = TestBed.inject(PiipMockRepository);
    expect(Object.keys(repository.portfolioRecords()[0])).toHaveLength(23);
    expect(repository.portfolioRecords()[0].originCode).toBe('NA');
    expect(repository.portfolioRecords()[1].technicalOpinionReport).toBe('No Aplica');
  });

  it('switches between the two presentation profiles', () => {
    const repository = TestBed.inject(PiipMockRepository);
    expect(repository.role()).toBe('Administrador PIIP');
    repository.toggleRole();
    expect(repository.role()).toBe('Consulta externa');
  });

  it('requires an initiative code for derived projects', () => {
    expect(() => resolveProjectOriginCode({ mode: 'DERIVED_FROM_INITIATIVE', initiativeCode: '' })).toThrowError(
      'Un proyecto derivado requiere una iniciativa aprobada.',
    );
    expect(resolveProjectOriginCode({ mode: 'DERIVED_FROM_INITIATIVE', initiativeCode: 'I-019-2026' })).toBe('I-019-2026');
  });

  it('registers a preexisting project with fixed Excel values and an audit event', () => {
    const repository = TestBed.inject(PiipMockRepository);
    repository.registerPreexistingProject({
      code: 'P-011-2026',
      name: 'Proyecto preexistente de prueba',
      startDate: '2025-08-01',
      source: 'Otros',
      responsible: 'Responsable de prueba',
      responsibleUnits: 'DGIA',
      peiObjective: 'Objetivo PEI',
      poiActivity: 'Actividad POI',
      description: 'Proyecto iniciado antes del flujo de iniciativas.',
      keyResults: 'Resultado de prueba',
      note: '',
      digitalComponent: 'No',
      technicalOpinionReport: 'No Aplica',
      formalApprovalDecision: 'No Aplica',
      finalProductApprovalDocument: 'No Aplica',
      projectManagementDocumentation: '',
      finalClosureReport: 'No Aplica',
    });

    const project = repository.projects()[0];
    const portfolioRecord = repository.portfolioRecords()[0];
    expect(project.originMode).toBe('PREEXISTING');
    expect(project.originCode).toBe('NA');
    expect(project.status).toBe('Proyecto en ejecución');
    expect(portfolioRecord.solutionType).toBe('No aplica');
    expect(Object.keys(portfolioRecord)).toHaveLength(23);
    expect(repository.auditEvents()[0].event).toBe('Proyecto preexistente registrado');
    expect(repository.getDocumentDossier('Proyecto', 'P-011-2026')?.stages[0].records[0].state).toBe('No aplica');
  });

  it('prevents the external consultation profile from registering projects', () => {
    const repository = TestBed.inject(PiipMockRepository);
    repository.toggleRole();
    expect(() => repository.registerPreexistingProject({} as never)).toThrowError(
      'El perfil Consulta externa no puede registrar proyectos.',
    );
  });
});
