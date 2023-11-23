import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosInstruccionComponent } from './turnos-instruccion.component';

describe('TurnosInstruccionComponent', () => {
  let component: TurnosInstruccionComponent;
  let fixture: ComponentFixture<TurnosInstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosInstruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosInstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
