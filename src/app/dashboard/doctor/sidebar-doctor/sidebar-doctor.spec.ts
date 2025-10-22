import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDoctor } from './sidebar-doctor';

describe('SidebarDoctor', () => {
  let component: SidebarDoctor;
  let fixture: ComponentFixture<SidebarDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
