import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPilotoComponent } from './registro-piloto.component';

describe('RegistroPilotoComponent', () => {
  let component: RegistroPilotoComponent;
  let fixture: ComponentFixture<RegistroPilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPilotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
