export const environment = {
    production: false,  // false for development mode
    apiUrl: 'https://api.themoviedb.org/3/discover/movie',  // Development API URL
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGRmYWZhNDMxMDAwMWUwMmFjNjYwMmIyMDJkMThiMyIsIm5iZiI6MTc0MzA2ODQ4Ni41Mywic3ViIjoiNjdlNTFkNDY1ZjNlMGFjMTg4MDAyMWE3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.aZTdxW6DyEQInlvQGc7UzikCl_WYRxR4OO9vk7pHEEs',
}

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${environment.apiKey}`
    }
}