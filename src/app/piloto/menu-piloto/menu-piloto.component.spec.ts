import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPilotoComponent } from './menu-piloto.component';

describe('MenuPilotoComponent', () => {
  let component: MenuPilotoComponent;
  let fixture: ComponentFixture<MenuPilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPilotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
