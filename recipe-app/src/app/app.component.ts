import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCalorieEntryComponent } from './new-calorie-entry/new-calorie-entry.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';
}
