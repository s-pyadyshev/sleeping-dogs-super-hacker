import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

let app = null
let db = null
let auth = null

export const useFirebase = () => {
  if (!app) {
    const config = useRuntimeConfig()
    
    const firebaseConfig = {
      apiKey: config.public.firebaseApiKey || "AIzaSyAHvUZdQDDh63nLHX-bjc6ioCHwQRmKwAs",
      authDomain: config.public.firebaseAuthDomain || "sdsh-4a971.firebaseapp.com",
      databaseURL: config.public.firebaseDatabaseURL || "https://sdsh-4a971.firebaseio.com",
      projectId: config.public.firebaseProjectId || "sdsh-4a971",
      storageBucket: config.public.firebaseStorageBucket || "sdsh-4a971.appspot.com",
      messagingSenderId: config.public.firebaseMessagingSenderId || "338962237581",
      appId: config.public.firebaseAppId || "1:338962237581:web:871ae61f90521730adfac4"
    }

    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)
  }

  return {
    app,
    db,
    auth
  }
}