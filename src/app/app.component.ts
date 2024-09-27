import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api/api.service';
import { DataService } from './shared/services/data/data.service';
import { Store } from '@ngrx/store';
import { fetchMovies } from './shared/state/board.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private api:ApiService, private dataService:DataService, private store:Store){}
  ngOnInit(): void {
  }
}
