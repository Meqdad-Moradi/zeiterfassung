import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTimesService {
  constructor(private http: HttpClient) {}

  fetchTime(): Observable<any> {
    return this.http.get('./assets/data.json');
  }
}
