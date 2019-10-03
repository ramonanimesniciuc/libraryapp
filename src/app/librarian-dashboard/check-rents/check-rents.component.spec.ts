import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRentsComponent } from './check-rents.component';

describe('CheckRentsComponent', () => {
  let component: CheckRentsComponent;
  let fixture: ComponentFixture<CheckRentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckRentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
