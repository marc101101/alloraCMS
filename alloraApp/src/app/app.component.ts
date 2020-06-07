import { Component, OnInit } from '@angular/core';
import { DataService } from './dataService';
import { InfoObject } from './module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alloraApp';
  data: InfoObject;
  objectKeys = [];

  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getData().subscribe(result => {
      this.data = result;
      this.objectKeys = Object.keys(this.data.data);
    });
  }

  logout() {
    console.log("logout");

  }

  getRowNumber(element) {
    let returnVal = 1;
    if (element.length >= 130) {
      returnVal = 2;
    }
    if (element.length >= 260) {
      returnVal = 3;
    }
    if (element.length >= 390) {
      returnVal = 4;
    }
    if (element.length >= 520) {
      returnVal = 5;
    }
    return returnVal;
  }

  publish() {
    this.dataService.postData(this.data).subscribe((result) => {
      alert(result.message);
    },
      (error) => {
        alert(error.message)
      }
    );
  }
}
