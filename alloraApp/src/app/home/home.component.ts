import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService';
import { InfoObject } from '../models/module';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = 'alloraApp';
    data: InfoObject;
    objectKeys = [];

    constructor(public dataService: DataService, public authService: AuthService) {

    }

    ngOnInit() {
        this.dataService.getData().subscribe(result => {
            this.data = result;
            this.objectKeys = Object.keys(this.data.data);
        });
    }

    logout() {
        this.authService.logout();
        this.authService.navToLogin();
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
        this.data.last_update = Date.now();
        this.dataService.postData(this.data).subscribe((result) => {
            alert(result.message);
        },
            (error) => {
                alert(error.message)
            }
        );
    }
}
