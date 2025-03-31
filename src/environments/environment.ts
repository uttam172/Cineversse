export const environment = {
    production: false,  // false for development mode
    apiUrl: 'https://api.themoviedb.org/3',  // Development API URL
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGRmYWZhNDMxMDAwMWUwMmFjNjYwMmIyMDJkMThiMyIsIm5iZiI6MTc0MzA2ODQ4Ni41Mywic3ViIjoiNjdlNTFkNDY1ZjNlMGFjMTg4MDAyMWE3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.aZTdxW6DyEQInlvQGc7UzikCl_WYRxR4OO9vk7pHEEs',
}

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${environment.apiKey}`
    }
}

export const appwrite = {
    projectKey: '67ea562b00216cfe9e50',
    databaseId: '67ea56fc002691272bdb',
    collectionId: '67ea57340038ca287601',
}