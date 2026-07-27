import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { PIIP_CATALOGS, RESPONSIBLE_UNITS } from '../../core/piip.catalogs';
import { PiipMockRepository } from '../../core/piip-mock.repository';
import { PreexistingProjectInput } from '../../core/piip.models';

type DocumentField =
  | 'technicalOpinionReport'
  | 'formalApprovalDecision'
  | 'finalProductApprovalDocument'
  | 'projectManagementDocumentation'
  | 'finalClosureReport';

type DocumentMode = 'NOT_APPLICABLE' | 'FILE' | 'PENDING';

@Component({
  selector: 'app-preexisting-project-form',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './preexisting-project-form.component.html',
  styleUrl: './preexisting-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreexistingProjectFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly repository = inject(PiipMockRepository);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly catalogs = PIIP_CATALOGS;
  readonly units = RESPONSIBLE_UNITS;
  readonly provisionalCode = `P-${String(this.repository.projects().length + 3).padStart(3, '0')}-2026`;
  readonly reviewOpen = signal(false);
  readonly documentFiles = signal<Record<DocumentField, string | null>>({
    technicalOpinionReport: null,
    formalApprovalDecision: null,
    finalProductApprovalDocument: null,
    projectManagementDocumentation: null,
    finalClosureReport: null,
  });

  readonly form = this.formBuilder.nonNullable.group({
    recordType: [{ value: 'Proyecto', disabled: true }],
    code: [{ value: this.provisionalCode, disabled: true }],
    originCode: [{ value: 'NA', disabled: true }],
    solutionType: [{ value: 'No aplica', disabled: true }],
    status: [{ value: 'Proyecto en ejecución', disabled: true }],
    startDate: ['', Validators.required],
    name: ['', [Validators.required, Validators.maxLength(180)]],
    source: ['', Validators.required],
    responsible: ['', Validators.required],
    responsibleUnits: ['', Validators.required],
    peiObjective: [''],
    poiActivity: [''],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    keyResults: ['', Validators.maxLength(1000)],
    note: ['', Validators.maxLength(600)],
    digitalComponent: ['', Validators.required],
    technicalOpinionMode: ['NOT_APPLICABLE' as DocumentMode],
    formalApprovalMode: ['NOT_APPLICABLE' as DocumentMode],
    finalProductApprovalMode: ['NOT_APPLICABLE' as DocumentMode],
    projectManagementMode: ['PENDING' as DocumentMode],
    finalClosureMode: ['NOT_APPLICABLE' as DocumentMode],
  });

  scrollTo(sectionId: string): void {
    this.elementRef.nativeElement.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onFileSelected(field: DocumentField, event: Event): void {
    const input = event.target as HTMLInputElement;
    const filename = input.files?.[0]?.name ?? null;
    this.documentFiles.update((files) => ({ ...files, [field]: filename }));
  }

  saveDraft(): void {
    this.repository.savePreexistingProjectDraft({ ...this.form.getRawValue(), documentFiles: this.documentFiles() });
    this.snackBar.open('Borrador guardado localmente. No es un estado oficial.', 'Cerrar', { duration: 3500 });
  }

  openReview(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.hasMissingSelectedFile()) {
      this.snackBar.open('Completa los campos requeridos y adjunta los archivos seleccionados.', 'Cerrar', { duration: 4200 });
      return;
    }
    this.reviewOpen.set(true);
  }

  registerProject(): void {
    try {
      this.repository.registerPreexistingProject(this.buildRegistrationInput());
      this.reviewOpen.set(false);
      this.snackBar.open('Proyecto preexistente incorporado al portafolio.', 'Cerrar', { duration: 3600 });
      void this.router.navigateByUrl('/proyectos');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No fue posible registrar el proyecto.';
      this.snackBar.open(message, 'Cerrar', { duration: 4200 });
    }
  }

  private hasMissingSelectedFile(): boolean {
    const value = this.form.getRawValue();
    const files = this.documentFiles();
    return [
      ['technicalOpinionReport', value.technicalOpinionMode],
      ['formalApprovalDecision', value.formalApprovalMode],
      ['finalProductApprovalDocument', value.finalProductApprovalMode],
      ['projectManagementDocumentation', value.projectManagementMode],
      ['finalClosureReport', value.finalClosureMode],
    ].some(([field, mode]) => mode === 'FILE' && !files[field as DocumentField]);
  }

  private buildRegistrationInput(): PreexistingProjectInput {
    const value = this.form.getRawValue();
    return {
      code: this.provisionalCode,
      name: value.name,
      startDate: value.startDate,
      source: value.source,
      responsible: value.responsible,
      responsibleUnits: value.responsibleUnits,
      peiObjective: value.peiObjective,
      poiActivity: value.poiActivity,
      description: value.description,
      keyResults: value.keyResults,
      note: value.note,
      digitalComponent: value.digitalComponent as 'Si' | 'No',
      technicalOpinionReport: this.documentValue('technicalOpinionReport', value.technicalOpinionMode),
      formalApprovalDecision: this.documentValue('formalApprovalDecision', value.formalApprovalMode),
      finalProductApprovalDocument: this.documentValue('finalProductApprovalDocument', value.finalProductApprovalMode),
      projectManagementDocumentation: this.documentValue('projectManagementDocumentation', value.projectManagementMode),
      finalClosureReport: this.documentValue('finalClosureReport', value.finalClosureMode),
    };
  }

  private documentValue(field: DocumentField, mode: DocumentMode): string {
    if (mode === 'NOT_APPLICABLE') return 'No Aplica';
    return this.documentFiles()[field] ?? '';
  }
}
