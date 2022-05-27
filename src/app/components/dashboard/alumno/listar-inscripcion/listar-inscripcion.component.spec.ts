import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInscripcionComponent } from './listar-inscripcion.component';

describe('ListarInscripcionComponent', () => {
  let component: ListarInscripcionComponent;
  let fixture: ComponentFixture<ListarInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
