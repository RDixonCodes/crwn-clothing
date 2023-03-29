import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';



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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);