import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {

  validationErrors: string[] = []

  constructor(private http: HttpClient) { }

  getNotFoundError() {
    this.http.get(`${environment.baseAPIUrl}/api/Books/1`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  getServerError() {
    this.http.get(`${environment.baseAPIUrl}/api/Bugs/server-error`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  getBadRequestError() {
    this.http.get(`${environment.baseAPIUrl}/api/Bugs/bad-request`).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  getValidationError() {
    this.http.get(`${environment.baseAPIUrl}/api/Books/one`).subscribe({
      next: response => console.log(response),
      error: error => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    })
  }


}
