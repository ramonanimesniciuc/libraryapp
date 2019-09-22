import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveBookComponent } from './reserve-book.component';

describe('ReserveBookComponent', () => {
  let component: ReserveBookComponent;
  let fixture: ComponentFixture<ReserveBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
