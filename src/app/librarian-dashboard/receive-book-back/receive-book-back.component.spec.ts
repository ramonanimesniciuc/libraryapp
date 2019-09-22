import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveBookBackComponent } from './receive-book-back.component';

describe('ReceiveBookBackComponent', () => {
  let component: ReceiveBookBackComponent;
  let fixture: ComponentFixture<ReceiveBookBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveBookBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveBookBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
