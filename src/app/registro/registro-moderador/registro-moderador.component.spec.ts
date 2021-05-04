import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroModeradorComponent } from './registro-moderador.component';

describe('RegistroModeradorComponent', () => {
  let component: RegistroModeradorComponent;
  let fixture: ComponentFixture<RegistroModeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroModeradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
