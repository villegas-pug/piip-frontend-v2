import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { PiipMockRepository } from '../../core/piip-mock.repository';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly snackBar = inject(MatSnackBar);
  readonly repository = inject(PiipMockRepository);

  showDemo(message: string): void {
    this.snackBar.open(`${message} (demostración)`, 'Cerrar', { duration: 2800 });
  }
}
