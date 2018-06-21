import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoSimComponent } from './algo-sim.component';

describe('AlgoSimComponent', () => {
  let component: AlgoSimComponent;
  let fixture: ComponentFixture<AlgoSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
