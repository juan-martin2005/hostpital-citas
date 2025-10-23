import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHorario } from './editar-horario';

describe('EditarHorario', () => {
  let component: EditarHorario;
  let fixture: ComponentFixture<EditarHorario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHorario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHorario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
