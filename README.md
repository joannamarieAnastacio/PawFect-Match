rules firebase:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
    }

    // Allow write access to the users collection for authenticated users
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow write access to any subcollection within a user document
      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Allow read and write access to the chat collection for authenticated users
    match /chat/{document=**} {
      allow read, write: if request.auth != null;
    }

    // Allow write access to the matches collection for authenticated users
    match /matches/{matchId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;

      // Allow write access to the messages subcollection within a match document
      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }

    // Allow write access to the contact messages collection for authenticated users
    match /contact_messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
