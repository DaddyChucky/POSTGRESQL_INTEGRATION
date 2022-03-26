import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JardinsComponent } from './jardins.component';

describe('JardinsComponent', () => {
  let component: JardinsComponent;
  let fixture: ComponentFixture<JardinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JardinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JardinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
