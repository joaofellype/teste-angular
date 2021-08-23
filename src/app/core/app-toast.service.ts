import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  private toastKey = 'main-toast';

  constructor(private messageService: MessageService) { }


  createMessage(summary: string, detail: string, severity: 'success' | 'info' | 'warn' | 'error') {
    this.messageService.add({key: this.toastKey,severity, summary, detail});
  }

  clearMessages(){
    this.messageService.clear(this.toastKey);
  }

}
