import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublisherRoutingModule } from './publisher-routing.module';
import { PublihserListComponent } from './publihser-list.component';
import { AddPublihserComponent } from './add-publihser/add-publihser.component';
import { UpdatePublihserComponent } from './update-publihser/update-publihser.component';


@NgModule({
  declarations: [
    PublihserListComponent,
    AddPublihserComponent,
    UpdatePublihserComponent,
  ],
  imports: [
    CommonModule,
    PublisherRoutingModule
  ]
})
export class PublisherModule { }
