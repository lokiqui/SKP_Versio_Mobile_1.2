import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInstructorComponent } from './menu-instructor.component';

describe('MenuInstructorComponent', () => {
  let component: MenuInstructorComponent;
  let fixture: ComponentFixture<MenuInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
