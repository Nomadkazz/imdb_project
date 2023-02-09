import { Movie } from './../movie';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs';
import { retry, catchError, map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  serverMessage$:Observable<any>;

  private results: Observable<Movie>;
  trend_movies:Movie[] = [];
  updated_trend_movies:boolean = false;
  movie_ids:string[] = [];
  data:any;

  constructor(private dataService: DataService, private changeDetection: ChangeDetectorRef) {
    this.dataService.getMoviesByNameYearPage("love", '2022').pipe(take(1)).toPromise().then((data => {
        this.trend_movies = data;
      })
    )
  }

  ngOnInit(): void {
    var collected_movies = []
    console.log("TRENDS")
    // var subscr = this.dataService.getMoviesByNameYearPage("love", '2022')

    // console.log(typeof(subscr))
    // console.log(subscr)
    // console.log(typeof(serverMessage$))
    // console.log(serverMessage$)
      // this.trend_movies.map(movie =>{
      //   console.log(movie)
      //   this.dataService.getMovieById(movie.id).subscribe((data: any[])=>{
      //     data != undefined ? this.updated_trend_movies = true : data;
      //     movie.plot = data["Plot"]
      //     movie.rating_imdb = data["imdbRating"]
      //   })
      // })
    console.log("Trend movies list: ", this.trend_movies);

    this.changeDetection.detectChanges();

  }

  public updateList(){
    console.log("UPDATE")
    // if (this.trend_movies.length == 10){
    //   this.trend_movies.map(movie =>{
    //     console.log(movie)
    //     this.dataService.getMovieById(movie.id).subscribe((data: any[])=>{
    //       data != undefined ? this.updated_trend_movies = true : data;
    //       movie.plot = data["Plot"]
    //       movie.rating_imdb = data["imdbRating"]
    //     })
    //   })
    //   this.changeDetection.detectChanges();
    // }
  }

}
