import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Libri';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authService.loadCurrentUser(token).subscribe()
    }
  }

}
