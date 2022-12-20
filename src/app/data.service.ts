import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) {}

  getPAbbrevations() {
    return this.http
      .get<any>('../assets/abbrevations.json')
      .toPromise()
      .then((data:any) => {
        return data;
      });
  }
}
