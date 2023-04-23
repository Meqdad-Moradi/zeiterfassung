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

  search(query: string): string[] {
    const terms = query.split(/\s+/); // split query into terms
    const filteredTerms = terms.filter((term) => term.length >= 3); // filter out terms with length < 3
    const queries = [...filteredTerms];
    
    if (terms.length !== filteredTerms.length) {
      queries.push(query);
    }
    return queries;

    // const terms = query.split(' ');
    // const shortWordIndex = terms.find((item) => item.length < 3);
    // console.log(shortWordIndex);

    // const termsArr = terms.map((term, i) => {
    //   // return shortWordIndex === term ? (terms[shortWordIndex] = query) : term;
    //   return term
    // });

    // return termsArr;
  }
}
