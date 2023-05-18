import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesTodayComponent } from './calories-today.component';

describe('CaloriesTodayComponent', () => {
  let component: CaloriesTodayComponent;
  let fixture: ComponentFixture<CaloriesTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaloriesTodayComponent]
    });
    fixture = TestBed.createComponent(CaloriesTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
