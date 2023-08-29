import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillEditComponent } from './bill-edit.component';

describe('BillEditComponent', () => {
  let component: BillEditComponent;
  let fixture: ComponentFixture<BillEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillEditComponent]
    });
    fixture = TestBed.createComponent(BillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
