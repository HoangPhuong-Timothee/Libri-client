import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  selectedTabIndex: number = 0

  constructor() { }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index
  }

}
