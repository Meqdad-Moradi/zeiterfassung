import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toasterSubject = new Subject<boolean>();

  get toaster() {
    return this.toasterSubject;
  }

  constructor() {}
}
