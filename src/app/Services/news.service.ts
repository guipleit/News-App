import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private readonly API_KEY: string = '666a5399a1b443acb4e71aeb88836ee0';
  private baseUrl: string = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) { }

  public getNews(query: string): Observable<any> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(query)}&apiKey=${this.API_KEY}`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error making API call', error);
        return throwError(() => new Error('Api request error!'));
      })
    );
  }
}
