import { Injectable } from '@angular/core'
import { Observable, from, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { Client, Databases, ID, Query } from 'appwrite'

import { Movie } from '../models/movie.model'

import { appwrite } from '../../environments/environment'


interface SearchDocument {
  $id: string;
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppwriteService {

  PROJECT_ID: string = appwrite.projectKey
  DATABASE_ID: string = appwrite.databaseId
  MATRIX_COLLECTION_ID: string = appwrite.matrixCollectionId
  BOOKMARKS_COLLECTION_ID: string = appwrite.bookmarksCollectionId
  MOVIE_COLLECTION_ID: string = appwrite.movieCollectionId

  client: any = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(this.PROJECT_ID)

  database = new Databases(this.client)


  // Matrix Functions
  isSearchDocument(doc: any): doc is SearchDocument {
    return (
      typeof doc === 'object' &&
      doc !== null &&
      '$id' in doc &&
      'searchTerm' in doc &&
      'count' in doc &&
      'movie_id' in doc &&
      'poster_url' in doc
    )
  }

  updateSearchCount(searchTerm: string, movie: Movie): Observable<any> {
    if (!movie || !movie.id) {
      console.error("Error: Movie is undefined or missing 'id'", movie);
      return throwError(() => new Error("Invalid movie object"));
    }

    return from(
      this.database.listDocuments(this.DATABASE_ID, this.MATRIX_COLLECTION_ID, [
        Query.equal('searchTerm', searchTerm.trim().toLowerCase()),
      ])
    ).pipe(
      switchMap((result: any) => {
        if (result.documents.length > 0) {
          const doc = result.documents[0];

          if (this.isSearchDocument(doc)) {
            const updatedCount = doc.count + 1;

            return from(
              this.database.updateDocument(this.DATABASE_ID, this.MATRIX_COLLECTION_ID, doc.$id, {
                count: updatedCount,
              })
            ).pipe(
              switchMap(() => of(movie))
            );
          } else {
            console.error("Invalid document structure: ", doc);
            return throwError(() => new Error("Invalid Document Structure"));
          }
        } else {
          return from(
            this.database.createDocument(
              this.DATABASE_ID,
              this.MATRIX_COLLECTION_ID,
              ID.unique(),
              {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`,
              }
            )
          ).pipe(
            switchMap(() => of(movie)) // Fix: Return type as Movie
          );
        }
      }),
      catchError((err) => {
        console.error("Error updating search count: ", err);
        return throwError(() => err);
      })
    );
  }


  // Movies CRUD functions
  createMovie(movie: any): Observable<any> {
    if (!movie || !movie.title || !movie.poster_path || !movie.vote_average || !movie.original_language || !movie.release_date) {
      throw new Error("Missing required bookmark fields")
    }

    return from(
      this.database.createDocument(
        this.DATABASE_ID,
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
    return from(this.database.listDocuments(this.DATABASE_ID, this.MOVIE_COLLECTION_ID))
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
      this.database.getDocument(this.DATABASE_ID, this.MOVIE_COLLECTION_ID, id)
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
        this.DATABASE_ID,
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
      this.database.deleteDocument(this.DATABASE_ID, this.MOVIE_COLLECTION_ID, id)
    ).pipe(
      catchError(err => {
        console.error("Error Deleting Movie: ", err)
        return throwError(() => err)
      })
    )
  }


  // Bookmark functions
  createBookmark(movie: any): Observable<any> {
    if (!movie || !movie.id || !movie.title || !movie.poster_path || !movie.vote_average || !movie.original_language || !movie.release_date) {
      console.error("Error: Missing required bookmark fields", movie);
      return throwError(() => new Error("Missing required bookmark fields"));
    }

    const data = {
      movieTitle: movie.title,
      moviePoster: movie.poster_path,
      movieVote: movie.vote_average,
      movieLanguage: movie.original_language,
      movieRelease: movie.release_date,
      movieId: movie.id,
    }
    console.log("Bookmark Data:", data)

    return from(
      this.database.createDocument(
        this.DATABASE_ID,
        this.BOOKMARKS_COLLECTION_ID,
        ID.unique(),
        data
      )
    ).pipe(
      tap((response) => console.log("Bookmark created successfully:", response)),
      catchError((error) => {
        console.error("Error creating bookmark:", error);
        return throwError(() => error);
      })
    )
  }
}
