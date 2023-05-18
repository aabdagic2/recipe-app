import { Component, NgModule, OnInit } from '@angular/core';
import { EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'new-calorie-entry',
  templateUrl: './new-calorie-entry.component.html',
  styleUrls: ['./new-calorie-entry.component.css']
})

export class NewCalorieEntryComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(private http:HttpClient){}
  showModal = false;
  name!: string;
  calories!: number;
  image!: string;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveEntry() {
      var made=  {name:this.name,
      image:"https://static.vecteezy.com/system/resources/previews/005/542/677/original/modern-shape-plate-with-spoon-and-fork-logo-symbol-icon-graphic-design-illustration-idea-creative-vector.jpg",
      description:this.calories.toString(),
      rating:0,
     calories:this.calories};
     this.http.post('https://localhost:7079/create', made).subscribe(
        () => {
          // Recipe saved successfully
      console.log(made.calories);
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    
    this.closeModal();
  }
}
