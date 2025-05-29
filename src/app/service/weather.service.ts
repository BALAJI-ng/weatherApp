import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { observable, of, throwError, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'https://openweathermap.org/api';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  private API_URL = environment.API_URL;

  getlocation(id: any, params: HttpParams = new HttpParams()): Observable<any> {
    const currentapi = `api.openweathermap.org/data/2.5/weather?zip=` + id + `,us&appid=5a4b2d457ecbef9eb2a71e480b947604`
    return this.http.get(`${environment.API_URL}` + currentapi, { params }).pipe(
      tap(_ => console.log(``))
    );
  }


  getdailyforecast(id: any, params: HttpParams = new HttpParams()): Observable<any> {
    const dailyapi = `api.openweathermap.org/data/2.5/forecast/daily?zip=` + id + `,us&appid=5a4b2d457ecbef9eb2a71e480b947604`
    return this.http.get(`${environment.API_URL}` + dailyapi, { params }).pipe(
      tap(_ => console.log(``))
    );
  }

}
