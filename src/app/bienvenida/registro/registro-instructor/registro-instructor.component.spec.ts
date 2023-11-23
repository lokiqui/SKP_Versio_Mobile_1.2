import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInstructorComponent } from './registro-instructor.component';

describe('RegistroInstructorComponent', () => {
  let component: RegistroInstructorComponent;
  let fixture: ComponentFixture<RegistroInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
