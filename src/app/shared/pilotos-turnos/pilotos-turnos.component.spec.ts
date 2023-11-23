import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotosTurnosComponent } from './pilotos-turnos.component';

describe('PilotosTurnosComponent', () => {
  let component: PilotosTurnosComponent;
  let fixture: ComponentFixture<PilotosTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilotosTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotosTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
