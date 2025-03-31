
import { appwrite } from "./environments/environment";
import { Client, Databases, ID, Query} from 'appwrite'
import { Movie } from "./app/models/movie.model";

const projectId: string = appwrite.projectKey
const databaseId: string = appwrite.databaseId
const collectionId: string = appwrite.collectionId


const client: any = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const database: any = new Databases(client)

export const updateSearchCount = async (searchTearm: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(databaseId, collectionId, [Query.equal('searchTearm', searchTearm)])
        if (result.documents.length > 0) {
            const doc = result.documents[0]
            await database.updateDocument(databaseId, collectionId, doc.$id, {
                count: doc.count + 1
            })
        }else {
            await database.createDocument( databaseId, collectionId, ID.unique(), {
                searchTearm, 
                count: 1, 
                movie_id: 
                movie.id, 
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (e) {
        
    }
}