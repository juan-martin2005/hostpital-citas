import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoHorario } from './nuevo-horario';

describe('NuevoHorario', () => {
  let component: NuevoHorario;
  let fixture: ComponentFixture<NuevoHorario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoHorario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoHorario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
