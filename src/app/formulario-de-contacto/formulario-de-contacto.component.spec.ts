import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeContactoComponent } from './formulario-de-contacto.component';

describe('FormularioDeContactoComponent', () => {
  let component: FormularioDeContactoComponent;
  let fixture: ComponentFixture<FormularioDeContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioDeContactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDeContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
