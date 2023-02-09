export class Movie{
  id:string
  title: string;
  year:string;
  extension:string;
  rating_imdb:string
  plot:string;
  country:string;
  genre:string;
  poster:string;
  constructor(
    id:string,
    title: string,
    year:string,
    extension:string,
    rating_imdb:string,
    plot:string,
    country:string,
    genre:string,
    poster:string,
  ){
    this.id = id
    this.title = title
    this.year = year
    this.extension =extension
    this.rating_imdb = rating_imdb
    this.plot = plot
    this.poster = poster
    this.country = country
    this.genre = genre
  }
}
