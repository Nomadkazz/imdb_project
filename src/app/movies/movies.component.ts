import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { Movie } from '../movie';
import { DataService } from '../data.service';
import { retry, catchError, map, tap, take } from 'rxjs/operators';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movie_list:Movie[] = [];
  data:any;
  page:number = 1;
  num_of_pages:number;
  cur_num_of_pages:number;

  constructor(private dataService: DataService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("inside movis")
    this.getDataByPage()
  }

  get numbers(): number[] {
    const limit = this.num_of_pages
    var arr = Array.from({ length: 10 }, (_, i) => i  + 1);
    // console.log(arr)
    return arr;
  }


  next() {
    this.page = this.page++;
    this.to(this.page)
    console.log(this.page)
    console.log(this.movie_list)
  }

  prev() {
    this.page = this.page;
    this.to(this.page)
  }

  to(page: number) {
    console.log("TO PAGE")
    this.page = page;
    this.getDataByPage(page);
    this.changeDetection.detectChanges();
  }


  public getDataByPage(page:number=this.page){
    this.dataService.getMoviesByNamePage("love", page.toString()).pipe(take(1)).toPromise().then((data => {
      this.movie_list = []
      this.cur_num_of_pages = data["Search"].length
      this.num_of_pages = Math.ceil(data["totalResults"] /10);

      data["Search"].forEach(movie => {
        this.dataService.getMovieById(movie['imdbID']).subscribe(m => {
          this.movie_list.push(m)
        })
      });

    }))

  }

  public onClickPageNumber(){

  }
}
