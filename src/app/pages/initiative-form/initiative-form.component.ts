import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PIIP_CATALOGS, RESPONSIBLE_UNITS } from '../../core/piip.catalogs';
import { PiipMockRepository } from '../../core/piip-mock.repository';

@Component({
  selector: 'app-initiative-form',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './initiative-form.component.html',
  styleUrl: './initiative-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitiativeFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly repository = inject(PiipMockRepository);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly catalogs = PIIP_CATALOGS;
  readonly units = RESPONSIBLE_UNITS;
  readonly uploadedFilename = signal<string | null>(null);
  readonly reviewOpen = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    recordType: ['Iniciativa', Validators.required],
    code: [{ value: 'I-025-2026', disabled: true }],
    originCode: [{ value: 'NA', disabled: true }],
    startDate: ['', Validators.required],
    name: ['', [Validators.required, Validators.maxLength(180)]],
    status: [{ value: 'Presentado', disabled: true }],
    solutionType: ['', Validators.required],
    source: ['', Validators.required],
    digitalComponent: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    responsible: ['', Validators.required],
    responsibleUnits: ['', Validators.required],
    note: [''],
    peiObjective: [''],
    poiActivity: [''],
  });

  scrollTo(sectionId: string): void {
    this.elementRef.nativeElement.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.uploadedFilename.set(file.name);
  }

  saveDraft(): void {
    this.repository.saveDraft({ ...this.form.getRawValue(), uploadedFilename: this.uploadedFilename() });
    this.snackBar.open('Borrador guardado localmente. No es un estado oficial.', 'Cerrar', { duration: 3500 });
  }

  openReview(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.uploadedFilename()) {
      this.snackBar.open('Completa los campos requeridos para esta demostración y adjunta la ficha inicial.', 'Cerrar', { duration: 4200 });
      return;
    }
    this.reviewOpen.set(true);
  }

  registerInitiative(): void {
    this.reviewOpen.set(false);
    this.snackBar.open('Iniciativa registrada en la demostración local.', 'Cerrar', { duration: 3200 });
    void this.router.navigateByUrl('/iniciativas');
  }
}
