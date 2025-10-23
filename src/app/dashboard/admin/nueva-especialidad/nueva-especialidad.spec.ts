import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEspecialidad } from './nueva-especialidad';

describe('NuevaEspecialidad', () => {
  let component: NuevaEspecialidad;
  let fixture: ComponentFixture<NuevaEspecialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaEspecialidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaEspecialidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
