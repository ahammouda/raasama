import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingExamplesComponent } from './drawing-examples.component';

describe('DrawingExamplesComponent', () => {
  let component: DrawingExamplesComponent;
  let fixture: ComponentFixture<DrawingExamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingExamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
