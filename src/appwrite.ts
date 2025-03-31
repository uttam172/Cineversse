
import { appwrite } from "./environments/environment";
import { Client, Databases, ID, Query} from 'appwrite'
import { Movie } from "./app/models/movie.model";

const projectId: string = appwrite.projectKey
const databaseId: string = appwrite.databaseId
const collectionId: string = appwrite.collectionId


const client: any = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const database = new Databases(client)

export const updateSearchCount = async (searchTearm: string, movie: Movie[]) => {
    console.log("appwrite file: ", searchTearm, movie)
    try {
        const result = await database.listDocuments(databaseId, collectionId, 
            [Query.equal('searchTearm', searchTearm.trim().toLocaleLowerCase())])
        if (result.documents.length > 0) {
            const doc = result.documents[0]
            const updatedCount = (doc["count"] ?? 0) + 1
            await database.updateDocument(databaseId, collectionId, doc.$id, {
                count: updatedCount
            })
        }else {
            await database.createDocument( databaseId, collectionId, ID.unique(), {
                searchTearm, 
                count: 1, 
                movie_id: movie[0].id, 
                poster_url: `https://image.tmdb.org/t/p/w500${movie[0].poster_path}` 
            })
        }
    } catch (e) {
        console.error("Error updating search count:", e)
    }
}