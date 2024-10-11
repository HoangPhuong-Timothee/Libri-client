import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedTabIndex: number = 0

  constructor() { }

  ngOnInit(): void {
    this.loadCurrentTab()
  }

  onTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('selectedTabIndex', event.index.toString())
  }

  loadCurrentTab() {
    const savedTabIndex = localStorage.getItem('selectedTabIndex')
    if (savedTabIndex !== null) {
      this.selectedTabIndex = +savedTabIndex
    }
  }

}
