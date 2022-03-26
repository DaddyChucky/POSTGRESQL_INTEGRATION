import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietesComponent } from './varietes.component';

describe('VarietesComponent', () => {
  let component: VarietesComponent;
  let fixture: ComponentFixture<VarietesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarietesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
