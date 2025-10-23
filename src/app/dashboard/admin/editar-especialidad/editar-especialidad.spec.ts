import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEspecialidad } from './editar-especialidad';

describe('EditarEspecialidad', () => {
  let component: EditarEspecialidad;
  let fixture: ComponentFixture<EditarEspecialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEspecialidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEspecialidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
