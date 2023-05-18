import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCalorieEntryComponent } from './new-calorie-entry.component';

describe('NewCalorieEntryComponent', () => {
  let component: NewCalorieEntryComponent;
  let fixture: ComponentFixture<NewCalorieEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCalorieEntryComponent]
    });
    fixture = TestBed.createComponent(NewCalorieEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
