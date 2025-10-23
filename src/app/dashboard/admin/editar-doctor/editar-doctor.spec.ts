import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDoctor } from './editar-doctor';

describe('EditarDoctor', () => {
  let component: EditarDoctor;
  let fixture: ComponentFixture<EditarDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
