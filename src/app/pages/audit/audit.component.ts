import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PiipMockRepository } from '../../core/piip-mock.repository';

@Component({
  selector: 'app-audit',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly repository = inject(PiipMockRepository);
  readonly filters = this.formBuilder.nonNullable.group({ record: 'I-024-2026', eventType: 'Todos', user: 'Todos', from: '2026-05-01', to: '2026-05-20' });

  resetFilters(): void {
    this.filters.reset({ record: 'I-024-2026', eventType: 'Todos', user: 'Todos', from: '2026-05-01', to: '2026-05-20' });
  }

  showDemo(): void {
    this.snackBar.open('Detalle del evento disponible al integrar el backend.', 'Cerrar', { duration: 3000 });
  }
}
