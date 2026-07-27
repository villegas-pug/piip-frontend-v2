import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { InitiativeFormComponent } from './initiative-form.component';

describe('InitiativeFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InitiativeFormComponent], providers: [provideRouter([])] }).compileComponents();
  });

  it('starts invalid and uses Presentado only as the official submission state', () => {
    const fixture = TestBed.createComponent(InitiativeFormComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.form.invalid).toBe(true);
    expect(fixture.componentInstance.form.controls.status.value).toBe('Presentado');
    expect(fixture.nativeElement.textContent).toContain('El borrador es solo una condición local de la UI');
  });
});
