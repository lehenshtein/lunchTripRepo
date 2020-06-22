import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getValues();
  }
  getValues() {
    this.http.get('http://localhost:5000/api/values')
      .subscribe(res => {
          this.values = res;
          console.log(res);
        },
        error => console.log(error));
  }

  toggleMode() {
    this.registerMode = !this.registerMode;
  }
}
