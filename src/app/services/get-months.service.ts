import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetMonthsService {
  constructor(private http: HttpClient) {}

  fetchMonths(): Observable<any> {
    return this.http.get('../assets/months.json');
  }
}
