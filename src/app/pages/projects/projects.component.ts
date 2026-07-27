import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { PIIP_CATALOGS, RESPONSIBLE_UNITS } from '../../core/piip.catalogs';
import { PiipMockRepository } from '../../core/piip-mock.repository';
import { PiipStatus } from '../../core/piip.models';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  readonly repository = inject(PiipMockRepository);
  readonly catalogs = PIIP_CATALOGS;
  readonly units = RESPONSIBLE_UNITS;
  readonly filters = this.formBuilder.nonNullable.group({ search: '', status: 'Todos', unit: 'Todas', digital: 'Todos' });
  private readonly filterValue = toSignal(this.filters.valueChanges, { initialValue: this.filters.getRawValue() });

  readonly filteredProjects = computed(() => {
    const value = this.filterValue();
    const search = (value.search ?? '').toLocaleLowerCase().trim();
    return this.repository.projects().filter((project) =>
      (!search || `${project.code} ${project.name}`.toLocaleLowerCase().includes(search)) &&
      (value.status === 'Todos' || project.status === value.status) &&
      (value.unit === 'Todas' || project.unit === value.unit) &&
      (value.digital === 'Todos' || project.digitalComponent === value.digital),
    );
  });

  resetFilters(): void {
    this.filters.reset({ search: '', status: 'Todos', unit: 'Todas', digital: 'Todos' });
  }

  showDemo(message: string): void {
    this.snackBar.open(`${message} (demostración).`, 'Cerrar', { duration: 3000 });
  }

  statusClass(status: PiipStatus): string {
    if (status === 'Proyecto en ejecución') return 'running';
    if (status === 'Producto aprobado') return 'product';
    if (status === 'Suspendido') return 'suspended';
    if (status === 'Finalizado') return 'finalized';
    if (status === 'Cancelado') return 'cancelled';
    return '';
  }
}
