mkdir -p src/environments && 
echo "export const environment = { 
  production: false, 
  apiUrl: '${apiUrl}', 
  apiToken: '${apiToken}' 
}; 

export const appwrite = { 
  projectKey: '${appwriteProjectKey}', 
  databaseId: '${appwriteDatabaseId}', 
  matrixCollectionId: '${appwriteMatrixCollectionId}', 
  bookmarksCollectionId: '${appwriteBookmarksCollectionId}', 
  movieCollectionId: '${appwriteMovieCollectionId}' 
};" 

> src/environments/environment.ts && 
echo "export const environment = { 
  production: true, 
  apiUrl: '${apiUrl}', 
  apiToken: '${apiToken}' 
}; 

export const appwrite = { 
  projectKey: '${appwriteProjectKey}', 
  databaseId: '${appwriteDatabaseId}', 
  matrixCollectionId: '${appwriteMatrixCollectionId}', 
  bookmarksCollectionId: '${appwriteBookmarksCollectionId}', 
  movieCollectionId: '${appwriteMovieCollectionId}' 
};" 

> src/environments/environment.prod.ts && 
ng build --configuration=production
