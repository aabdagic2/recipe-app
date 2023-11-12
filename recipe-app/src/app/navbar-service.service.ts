import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarServiceService {
  loggedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  setLoggedIn() {
    this.loggedInEvent.emit(true);
  }
}
