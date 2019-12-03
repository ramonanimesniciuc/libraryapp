import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReturnComponent } from './confirm-return.component';

describe('ConfirmReturnComponent', () => {
  let component: ConfirmReturnComponent;
  let fixture: ComponentFixture<ConfirmReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
