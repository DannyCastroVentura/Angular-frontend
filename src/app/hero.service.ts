import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
    private router: Router, 
    private route: ActivatedRoute) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    this.spinnerService.requestStarted();
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => {
          this.log('fetched heroes');
          this.spinnerService.requestEnded();
        }),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    this.spinnerService.requestStarted();
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => {
        this.log(`fetched hero id=${id}`);
        this.spinnerService.requestEnded();
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    this.spinnerService.requestStarted();
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => { 
        this.log(`updated hero id=${hero.id}`);         
        this.spinnerService.requestEnded();
      }),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {    
    this.spinnerService.requestStarted();
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => {
        this.log(`added hero w/ id=${newHero.id}`);       
        this.spinnerService.requestEnded();
      }),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    this.spinnerService.requestStarted();
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleted hero id=${id}`);               
        this.spinnerService.requestEnded();
      }),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }



  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.body.error}`);

      //se o status for 404 é porque está a procura de um heroi que não existe, então volta para a aba heroes
      if(error.status === 404){
        this.spinnerService.resetSpinner();
        this.router.navigate([`../heroes`], { relativeTo: this.route });
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

