import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessagesService {

  private newUserAddressSubject = new Subject<string>();
  private errorSubject = new Subject<string>();

  sendNewUserAddressMessage(message: string) {
    this.newUserAddressSubject.next(message);
  }

  getNewUserAddressMessage(): Observable<string> {
    return this.newUserAddressSubject.asObservable();
  }

  sendErrorMessage(message: string) {
    this.errorSubject.next(message);
  }

  getErrorMessage(): Observable<string> {
    return this.errorSubject.asObservable();
  }
}
