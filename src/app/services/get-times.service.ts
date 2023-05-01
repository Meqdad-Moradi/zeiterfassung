import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ITime, ITotalTimes } from '../modules/times';
import { Observable, of, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../components/dialogs/toaster/toaster.component';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  private times: ITime[] = [];
  public readonly storeKey = 'timeTracking';

  private startTackingTimeSubject = new Subject<boolean>();
  private stopTackingTimeSubject = new Subject<boolean>();

  get startTrackingTime() {
    return this.startTackingTimeSubject;
  }

  get stopTrackingTime() {
    return this.stopTackingTimeSubject;
  }

  /**
   * constructor
   */
  constructor(private snackbar: MatSnackBar, private firestore: Firestore) {
    this.loadTimesFromStorage();
    // this.collectData();
    // this.updateDoc('n7eH2xZJO3wR7l9nZ7Ah');
    // this.deletedDoc('5mn0ncxU7WS4wrZoqCkP');
  }

  /**
   * loadTimesFromStorage
   */
  private loadTimesFromStorage(): void {
    const storedTimes = localStorage.getItem(this.storeKey);
    if (storedTimes) {
      this.times = JSON.parse(storedTimes);
    }
  }

  /**
   * addStartTime
   */
  addStartTime(): void {
    // don't add start time if the time is not stoped
    const isEndTimeEmpty =
      this.times.length && this.times[this.times.length - 1].endTime === '';
    if (isEndTimeEmpty) return;

    // add current date
    const now = moment();
    const id = Math.random() * 10000;
    let timeData: ITime = {
      id,
      startTime: now.format(),
      month: now.month(),
      endTime: '',
    };
    this.times.push(timeData);

    this.snackbar.openFromComponent(ToasterComponent, {
      data: 'Zeit wurde hinzugefügt!',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
    });

    localStorage.setItem('prevTime', JSON.stringify(now.format()));
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));

    // const collectionInstance = collection(this.firestore, 'zeiterfassung');
    // addDoc(collectionInstance, timeData)
    //   .then(() => {
    //     console.log('time added');
    //   })
    //   .catch((err) => console.log(err));
  }

  // collectData(): void {
  //   const collectionInstance = collection(this.firestore, 'zeiterfassung');
  //   collectionData(collectionInstance, { idField: 'id' }).subscribe((val) =>
  //     console.log(val)
  //   );
  // }

  // updateDoc(id: string): void {
  //   const docInstance = doc(this.firestore, 'zeiterfassung', id);
  //   const newDate = { endTime: moment().format() };

  //   updateDoc(docInstance, newDate)
  //     .then(() => {
  //       console.log('updated');
  //     })
  //     .catch((err) => console.error(err));
  // }

  // deletedDoc(id: string): void {
  //   const docInstance = doc(this.firestore, 'zeiterfassung', id);
  //   deleteDoc(docInstance)
  //     .then(() => {
  //       console.log('deleted');
  //     })
  //     .catch((err) => console.error(err));
  // }

  /**
   * addEndtime
   */
  addEndTime(): void {
    const now = moment().format();
    const prevTime = JSON.parse(localStorage.getItem('prevTime')!);

    const startedTime: ITime = this.times.find(
      (time: ITime) => time.startTime === prevTime
    )!;

    // return if the has not been started
    if (!startedTime) return;

    startedTime.endTime = now;
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));
  }

  /**
   * getTimes
   * @returns all times
   */
  getTimes(): ITime[] {
    return this.times;
  }

  /**
   * Returns total hours and minutes of stored times
   * @returns hours and minutes
   */
  getTotalHoursMinutes(currentMonth: number): Observable<ITotalTimes> {
    // Retrieve stored times from local storage
    const storedTimes = JSON.parse(localStorage.getItem(this.storeKey)!);

    // Calculate hours and minutes for each stored time
    const arr = storedTimes
      .filter(
        (item: ITime) =>
          item.endTime !== '' &&
          item.startTime !== '' &&
          item.month === currentMonth
      )
      .map((date: ITime) => {
        // Convert start and end times to moment objects
        const startTime = moment(date.startTime);
        const endTime = moment(date.endTime);

        // Handle invalid dates
        if (!moment.isMoment(startTime) || !moment.isMoment(endTime)) {
          return;
        }

        // Calculate hours and minutes for current time
        const hour = endTime.diff(startTime, 'hours');
        const mins = endTime.diff(startTime, 'minutes') % 60;

        return { hour, mins };
      });

    // Calculate total hours and minutes by reducing the array of stored times
    const total = arr.reduce(
      (acc: any, cur: any) => {
        if (cur) {
          // Add hours and minutes of current time to accumulator
          acc.hour += cur?.hour ?? 0;
          acc.mins += cur?.mins ?? 0;
        }
        return acc;
      },
      { hour: 0, mins: 0 }
    );

    // Convert total minutes to hours and minutes
    const totalHours = total.hour + Math.floor(total.mins / 60);
    const totalMins = total.mins % 60;

    // Return total hours and minutes as an object
    return of({ hour: totalHours, mins: totalMins });
  }

  /**
   * delete time
   * @param time
   */
  deleteTime(id: number): void {
    const filterTimes = this.times.filter((date: ITime) => date.id !== id);
    this.times = filterTimes;
    localStorage.setItem(this.storeKey, JSON.stringify(this.times));
  }
}
