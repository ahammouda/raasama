import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawReSimComponent } from './draw-re-sim.component';

describe('DrawReSimComponent', () => {
  let component: DrawReSimComponent;
  let fixture: ComponentFixture<DrawReSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawReSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawReSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
