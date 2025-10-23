import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoresAdmin } from './doctores-admin';

describe('DoctoresAdmin', () => {
  let component: DoctoresAdmin;
  let fixture: ComponentFixture<DoctoresAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctoresAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoresAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
