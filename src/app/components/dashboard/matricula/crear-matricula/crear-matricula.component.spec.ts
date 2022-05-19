import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMatriculaComponent } from './crear-matricula.component';

describe('CrearMatriculaComponent', () => {
  let component: CrearMatriculaComponent;
  let fixture: ComponentFixture<CrearMatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMatriculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
