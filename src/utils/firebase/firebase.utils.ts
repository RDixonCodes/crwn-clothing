import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';
import { getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';


const firebaseConfig = {
    apiKey: "AIzaSyDJkalQ103ho3GFZwtcQhV8jO2Jp0LjDoU",
    authDomain: "crwn-clthn.firebaseapp.com",
    projectId: "crwn-clthn",
    storageBucket: "crwn-clthn.appspot.com",
    messagingSenderId: "324597988956",
    appId: "1:324597988956:web:65920c7a65db68e9abf099"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => 
  signInWithPopup(auth, googleProvider);

  export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export type ObjectToAdd = {
    title: string;
  }
  //using async when adding to or dealing with a db.
  export const addCollectionAndDocuments = async <T extends ObjectToAdd> 
  (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    //instantiate writeBatch then pass it the db.
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done')
};


    export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
        const collectionRef = collection(db, 'catagories');
        const q = query(collectionRef);

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category)
    };
// only uses displayName since that is the only information we take
export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string,
    email: string,
}

    export const createUserDocumentFromAuth = async (userAuth: User, 
    additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
        if(!userAuth) return;
    // doc() takes three arguments. Database, collection, and an identifier(can use the uid from google sign in)
        const userDocRef = doc(db, 'users', userAuth.uid);

        const userSnapshot = await getDoc(userDocRef);
        console.log(userSnapshot)
        console.log(userSnapshot.exists())
        //esixts() helps to show if a document exist in the collection

        if(!userSnapshot.exists()) {
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName, 
                    email, 
                    createdAt,
                    ...additionalInformation,
                });
                } catch (error) {
                    console.log('error creating the user', error);
            }
        }

        //check if user data exists

        //if user data doesn't exists create/ set the document with the data from 
        //userAuth in my collection.


        //if user data exists
        return userSnapshot as QueryDocumentSnapshot<UserData>;

  };

  export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  };

  export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
  onAuthStateChanged(auth, callback)

  export const getCurrentUser = (): Promise<User | null> => {
    return new Promise (( resolve, reject ) => {
        const unsubsribe = onAuthStateChanged(
    auth,
    (userAuth) => {
        // close listener so that there isn't a memory leak
        unsubsribe();
        resolve(userAuth);
        },
        reject
        )
    })
};

