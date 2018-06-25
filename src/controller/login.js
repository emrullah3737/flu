import * as firebase from 'firebase';

export default async (doc) => {
  const { email, password } = doc;
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }

  try {
    const user = await firebase.auth().onAuthStateChanged();
    return user;
  } catch (error) {
    return error;
  }
};
