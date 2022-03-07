import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private counter = 0;
  private spinner$ = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted(){
    if(++this.counter === 1){
      this.spinner$.next('start');
    }
  }

  requestEnded(){
    if(this.counter === 0 || --this.counter === 0){
      this.spinner$.next('stop');
    }
  }

  resetSpinner() {
    this.counter = 0;
    this.spinner$.next('stop');
  }
}
