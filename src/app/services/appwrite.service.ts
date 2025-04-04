import { Injectable } from '@angular/core'
import { Client, Databases, ID } from 'appwrite'
import { appwrite } from '../../environments/environment'
import { Movie } from '../models/movie.model'
import { Observable, from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AppwriteService {

  PROJECT_ID: string = appwrite.projectKey
  DATABSE_ID: string = appwrite.databaseId
  MATRIX_COLLECTION_ID: string = appwrite.collectionId
  BOOKMARKS_COLLECTION_ID: string = appwrite.bookmarksCollectionId
  MOVIE_COLLECTION_ID: string = appwrite.movieCollectionId

  client: any = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(this.PROJECT_ID)

  database = new Databases(this.client)

  createMovie(movie: any): Observable<any> {
    if (!movie || !movie.title || !movie.poster_path || !movie.vote_average || !movie.original_language || !movie.release_date) {
      throw new Error("Missing required bookmark fields")
    }

    return from(
      this.database.createDocument(
        this.DATABSE_ID,
        this.MOVIE_COLLECTION_ID,
        ID.unique(),
        {
          movieTitle: movie.title,
          moviePoster: movie.poster_path,
          movieVote: movie.vote_average,
          movieLanguage: movie.original_language,
          movieRelease: movie.release_date,
        }
      )
    ).pipe(
      catchError(err => {
        console.error("Error Adding Movie: ", err)
        return throwError(() => err)
      })
    )
  }

  fetchMovie(): Observable<Movie[]> {
    return from(this.database.listDocuments(this.DATABSE_ID, this.MOVIE_COLLECTION_ID))
      .pipe(
        map(res => res.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.movieTitle,
          poster_path: doc.moviePoster,
          vote_average: doc.movieVote,
          original_language: doc.movieLanguage,
          release_date: doc.movieRelease,
          isSaved: doc.isSaved
        }))),
        catchError(err => {
          console.error("Error Fetching Movies: ", err)
          return throwError(() => err)
        })
      )
  }

  fetchMovieById(id: string): Observable<Movie> {
    return from(
      this.database.getDocument(this.DATABSE_ID, this.MOVIE_COLLECTION_ID, id)
    ).pipe(
      map((doc: any) => ({
        id: doc.$id,
        title: doc.movieTitle,
        poster_path: doc.moviePoster,
        vote_average: doc.movieVote,
        original_language: doc.movieLanguage,
        release_date: doc.movieRelease,
        isSaved: doc.isSaved
      })),
      catchError(err => {
        console.error("Error fetching Movie By Id: ", err);
        return throwError(() => err);
      })
    );
  }

  editMovie(id: string, updatedMovie: any): Observable<any> {

    const { id: _, ...movieData } = updatedMovie
    return from(
      this.database.updateDocument(
        this.DATABSE_ID,
        this.MOVIE_COLLECTION_ID,
        id,
        {
          movieTitle: movieData.title,
          moviePoster: movieData.poster_path,
          movieVote: movieData.vote_average,
          movieLanguage: movieData.original_language,
          movieRelease: movieData.release_date,
        }
      )
    ).pipe(
      catchError(err => {
        console.error("Error Updating Movie: ", err)
        return throwError(() => err)
      })
    )
  }

  deleteMovie(id: string): Observable<any> {
    return from(
      this.database.deleteDocument(this.DATABSE_ID, this.MOVIE_COLLECTION_ID, id)
    ).pipe(
      catchError(err => {
        console.error("Error Deleting Movie: ", err)
        return throwError(() => err)
      })
    )
  }

}
