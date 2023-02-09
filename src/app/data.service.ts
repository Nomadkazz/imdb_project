import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://www.omdbapi.com/?apikey=a39a2593";


  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      console.log("eror clieant")
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      console.log("Server clieant")
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getMoviesByName(name:string, ):Observable<Movie[]>{
    return this.httpClient.get(this.REST_API_SERVER+"&s="+name).pipe(map(data => {
      var movies = []
      data["Search"].map(movie => {
        this.getMovieById(movie['imdbID']).subscribe(m => {
          movies.push(m)
        })
      });
      return movies;
    }));
  }

  public getMoviesByNamePage(name:string, page:string='1', ):Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER+"&s="+name+"&page="+page).pipe(map(data => {
      return data;
    }));
  }

  public getMoviesByNameYearPage(name:string, year:string, page:string='1', ):Observable<Movie[]>{
    return this.httpClient.get(this.REST_API_SERVER+"&s="+name+'&y='+year+"&page="+page).pipe(map(data => {
      var movies = []
      data["Search"].map(movie => {
        this.getMovieById(movie['imdbID']).subscribe(m => {
          movies.push(m)
        })
      });
      return movies;
    }));
  }

  public getMovieById(id:string ):Observable<Movie>{
    return this.httpClient.get(this.REST_API_SERVER+"&i="+id).pipe(map(movie => {
      // console.log(id, movie['Title'])
        return new Movie(
              movie['imdbID'],
              movie['Title'],
              movie['Year'],
              "WEB-DL",
              movie['imdbRating'],
              movie['Plot'],
              movie['Country'],
              movie['Genre'],
              movie['Poster']
        );
    }));
  }
}
