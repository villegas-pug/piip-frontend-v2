import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PiipMockRepository, summarizeDocumentDossier } from '../../core/piip-mock.repository';
import { DocumentStage, PiipRecordType, PiipStatus } from '../../core/piip.models';

@Component({
  selector: 'app-documents',
  imports: [MatIconModule, RouterLink],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly routeParamMap = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  readonly repository = inject(PiipMockRepository);
  readonly collapsedStages = signal<Set<string>>(new Set());
  readonly code = computed(() => this.routeParamMap().get('code') ?? '');
  readonly recordType = computed<PiipRecordType>(() => this.routeData()['recordType'] === 'Proyecto' ? 'Proyecto' : 'Iniciativa');
  readonly dossier = computed(() => this.repository.getDocumentDossier(this.recordType(), this.code()));
  readonly summary = computed(() => {
    const dossier = this.dossier();
    return dossier ? summarizeDocumentDossier(dossier) : undefined;
  });
  readonly moduleRoute = computed(() => this.recordType() === 'Iniciativa' ? '/iniciativas' : '/proyectos');
  readonly moduleLabel = computed(() => this.recordType() === 'Iniciativa' ? 'Iniciativas' : 'Proyectos');
  readonly project = computed(() => this.recordType() === 'Proyecto'
    ? this.repository.projects().find((project) => project.code === this.code())
    : undefined,
  );
  readonly progress = computed(() => {
    const summary = this.summary();
    if (!summary) return 0;
    const applicableDocuments = summary.loadedCount + summary.pendingCount;
    return applicableDocuments ? Math.round((summary.loadedCount / applicableDocuments) * 100) : 0;
  });

  toggleStage(title: string): void {
    this.collapsedStages.update((current) => {
      const next = new Set(current);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  }

  stageAvailability(stage: DocumentStage): string {
    const loaded = stage.records.filter((document) => document.state === 'Cargado').length;
    const pending = stage.records.filter((document) => document.state === 'Pendiente').length;
    if (!loaded && !pending) return 'No aplica';
    return `${loaded} cargado${loaded === 1 ? '' : 's'} · ${pending} pendiente${pending === 1 ? '' : 's'}`;
  }

  statusClass(status: PiipStatus): string {
    if (status === 'Iniciativa aprobada') return 'approved';
    if (status === 'Proyecto en ejecución') return 'running';
    if (status === 'Producto aprobado') return 'product';
    if (status === 'Suspendido') return 'suspended';
    if (status === 'Finalizado') return 'finalized';
    if (status === 'Cancelado' || status === 'Iniciativa archivada') return 'archived';
    if (status === 'No Admisible' || status === 'No Aplicable' || status === 'Producto no aprobado') return 'rejected';
    return '';
  }

  showDemo(message: string): void {
    this.snackBar.open(`${message} (demostración).`, 'Cerrar', { duration: 2900 });
  }
}
