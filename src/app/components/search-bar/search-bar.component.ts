import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
 constructor(public dataService: DataService){}
}
