import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onComponent(processid: string) {
    this.invokeComponentFunction.emit(processid);
  }
}
