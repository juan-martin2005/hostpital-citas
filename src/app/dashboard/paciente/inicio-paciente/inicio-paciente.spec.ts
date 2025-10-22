import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPaciente } from './inicio-paciente';

describe('InicioPaciente', () => {
  let component: InicioPaciente;
  let fixture: ComponentFixture<InicioPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
