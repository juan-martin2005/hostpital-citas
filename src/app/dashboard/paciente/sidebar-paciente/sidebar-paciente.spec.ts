import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPaciente } from './sidebar-paciente';

describe('SidebarPaciente', () => {
  let component: SidebarPaciente;
  let fixture: ComponentFixture<SidebarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
