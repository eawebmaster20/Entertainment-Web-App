import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { DataService } from '../../shared/services/data/data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatCardModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(public dataService: DataService){}
  isActive(param:string):boolean {
    return this.dataService.selectedCategory === param
  }

  setCategory(param:string):void {
    this.dataService.selectedCategory = param;
    this.dataService.searchPlaceholder = param
  }

  ngOnInit(): void {
    this.setCategory('movies or TV series')
  }
}
