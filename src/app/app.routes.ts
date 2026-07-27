import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/app-shell.component').then((module) => module.AppShellComponent),
    children: [
      { path: 'inicio', title: 'PIIP | Inicio', loadComponent: () => import('./pages/dashboard/dashboard.component').then((module) => module.DashboardComponent) },
      { path: 'iniciativas', title: 'PIIP | Iniciativas', loadComponent: () => import('./pages/initiatives/initiatives.component').then((module) => module.InitiativesComponent) },
      { path: 'iniciativas/nueva', title: 'PIIP | Nueva iniciativa', loadComponent: () => import('./pages/initiative-form/initiative-form.component').then((module) => module.InitiativeFormComponent) },
      { path: 'iniciativas/:code/documentos', title: 'PIIP | Documentos', data: { recordType: 'Iniciativa' }, loadComponent: () => import('./pages/documents/documents.component').then((module) => module.DocumentsComponent) },
      { path: 'documentos', title: 'PIIP | Documentos', loadComponent: () => import('./pages/documents-inbox/documents-inbox.component').then((module) => module.DocumentsInboxComponent) },
      { path: 'proyectos/nuevo/preexistente', title: 'PIIP | Proyecto preexistente', loadComponent: () => import('./pages/preexisting-project-form/preexisting-project-form.component').then((module) => module.PreexistingProjectFormComponent) },
      { path: 'proyectos/:code/documentos', title: 'PIIP | Documentos', data: { recordType: 'Proyecto' }, loadComponent: () => import('./pages/documents/documents.component').then((module) => module.DocumentsComponent) },
      { path: 'proyectos', title: 'PIIP | Proyectos', loadComponent: () => import('./pages/projects/projects.component').then((module) => module.ProjectsComponent) },
      { path: 'auditoria', title: 'PIIP | Auditoría', loadComponent: () => import('./pages/audit/audit.component').then((module) => module.AuditComponent) },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'inicio' },
];
