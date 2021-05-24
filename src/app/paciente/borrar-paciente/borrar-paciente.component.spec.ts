import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPacienteComponent } from './borrar-paciente.component';

describe('BorrarPacienteComponent', () => {
  let component: BorrarPacienteComponent;
  let fixture: ComponentFixture<BorrarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
