import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showSuccess(summary: string, detail: string) {
    console.log(summary + ': ' + detail)
    this.messageService.add({severity: 'success', summary, detail});
  }

  showError(summary: string, detail: string) {
    this.messageService.add({severity: 'error', summary, detail});
  }

  // Other toast types (info, warn, etc.) can be added similarly
}
