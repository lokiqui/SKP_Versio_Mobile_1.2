import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaVueloComponent } from './historia-clinica.component';

describe('HistoriaVueloComponent', () => {
  let component: HistoriaVueloComponent;
  let fixture: ComponentFixture<HistoriaVueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaVueloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
