import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreRoutingModule } from './genre-routing.module';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { GenreListComponent } from './genre-list.component';


@NgModule({
  declarations: [
    AddGenreComponent,
    UpdateGenreComponent,
    GenreListComponent
  ],
  imports: [
    CommonModule,
    GenreRoutingModule
  ]
})
export class GenreModule { }
