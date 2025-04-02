
import { appwrite } from "./environments/environment";
import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID: string = appwrite.projectKey
const DATABASE_ID: string = appwrite.databaseId
const COLLECTION_ID: string = appwrite.collectionId
const BOOKMARKS_ID: string = appwrite.bookmarksCollectionId

interface SearchDocument {
    $id: string;
    searchTerm: string;
    count: number;
    movie_id: number;
    poster_url: string;
}

interface Bookmarks {
    $id: string
    movie_id: number
    movieTitle: string
    moviePoster: string
    movieVote: number
    movieLanguage: string
    movieRelease: string
}

function isSearchDocument(doc: any): doc is SearchDocument {
    return (
        typeof doc === 'object' &&
        doc !== null &&
        '$id' in doc &&
        'searchTerm' in doc &&
        'count' in doc &&
        'movie_id' in doc &&
        'poster_url' in doc
    );
}

const client: any = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm: string, movie: any) => {
    if (!movie || !movie.id) {
        console.error("Error: movie is undefined or missing 'id'", movie);
        return;
    }

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm.trim().toLowerCase())
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            if (isSearchDocument(doc)) { 
                const updatedCount = doc.count + 1;
                await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                    count: updatedCount
                });
            } else {
                console.error("Invalid document structure:", doc);
            }
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie?.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`
            });
        }
    } catch (e) {
        console.error("Error updating search count:", e);
    }
};

export const createBookmark = async (bookmark: Omit<Bookmarks, '$id'>) => {
    try {
        if (!bookmark.movie_id || !bookmark.movieTitle || !bookmark.moviePoster || !bookmark.movieVote || !bookmark.movieLanguage || !bookmark.movieRelease) {
            throw new Error("Missing required bookmark fields");
        }

        const response = await database.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(), 
            {
                movie_id: bookmark.movie_id,
                movieTitle: bookmark.movieTitle,
                moviePoster: bookmark.moviePoster,
                movieVote: bookmark.movieVote,
                movieLanguage: bookmark.movieLanguage,
                movieRelease: bookmark.movieRelease
            }
        );

        console.log("Bookmark created successfully:", response);
        return response;
    } catch (error) {
        console.error("Error creating bookmark:", error);
        return null;
    }
};
