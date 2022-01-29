// FireBase APP
import FireBaseAppCFG from "../config/firebaseConfig";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  getDocFromCache,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const FireBaseAPI = {
  save: async (
    collectionName,
    data,
    onSuccess = (response) => {},
    onError = (response) => {}
  ) => {
    try {
      const docRef = await addDoc(
        collection(FireBaseAppCFG.db, collectionName),
        data
      );
      onSuccess(docRef);
    } catch (e) {
      onError(e);
    }
  },

  findAll: async (collectionName) => {
    try {
      const querySnapshot = await getDocs(
        collection(FireBaseAppCFG.db, collectionName)
      );

      const result = [];

      querySnapshot.forEach((d) => {
        var data = d.data();
        data.documentId = d.id;
        result.push(data);
      });

      return result;
    } catch (e) {
      return [];
    }
  },

  findById: async (collectionName, id) => {
    let docRef = doc(FireBaseAppCFG.db, collectionName, id);
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      let docSnap = await getDocFromCache(docRef);
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      let data = docSnap.data();
      data.documentId = docSnap.id;

      return data;
    } catch (e) {
      try {
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          var data = docSnap.data();
          data.documentId = docSnap.id;
          return data;
        }
      } catch (error) {
        return undefined;
      }

      return undefined;
    }
  },

  saveUser: async (
    user,
    onSuccess = (response) => {},
    onError = (error) => {}
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FireBaseAppCFG.auth,
        user.email,
        user.password
      );
      onSuccess(userCredential);
      user.FireBaseAPI.save("user", user);
    } catch (e) {
      onError(e);
    }
  },

  logIn: async (
    user,
    onSuccess = (response) => {},
    onError = (error) => {}
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FireBaseAppCFG.auth,
        user.email,
        user.password
      );
      onSuccess(userCredential);
    } catch (e) {
      onError(e);
    }
  },

  logOut: async () => {
    FireBaseAppCFG.auth.signOut();
  },
};

export default FireBaseAPI;
