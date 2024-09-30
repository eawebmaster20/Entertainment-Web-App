import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { Store } from '@ngrx/store';
import { selectAllMovies } from '../../shared/state/board.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { fetchMovies } from '../../shared/state/board.actions';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { LocalstorageService } from '../../shared/services/localStorage/localstorage.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MatCardModule,ToastModule, MatButtonModule, FilterPipe, AsyncPipe, FormsModule, CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  providers: [MessageService],
})
export class ContentComponent implements OnInit {
  bookmarked:boolean = false;
  selectAll = selectAllMovies
  constructor(
    public store:Store, 
    public dataService:DataService,
    public notification:NotificationService,
    private localStorage:LocalstorageService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ){}
  isBookmarked():boolean{
    return this.bookmarked;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
   this.store.dispatch(fetchMovies());
  //  this.messageService.add({severity: 'success', summary:'summary',detail: 'msg'})
  //  this.notification.showSuccess('success', 'wowowowowo')
  }
  show(addRemove:boolean) {
    if (this.localStorage.getItem('user')) {
      if (addRemove) {
        this.messageService.add({ severity: 'success', summary: 'cool', detail: 'Added to Your bookmarks' });
        return
      }
      this.messageService.add({ severity: 'warn', summary: 'cool', detail: 'removed from Your bookmarks' });
    }
}
}
