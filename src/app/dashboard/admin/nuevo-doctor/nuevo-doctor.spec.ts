import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDoctor } from './nuevo-doctor';

describe('NuevoDoctor', () => {
  let component: NuevoDoctor;
  let fixture: ComponentFixture<NuevoDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
