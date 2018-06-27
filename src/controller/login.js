import * as firebase from 'firebase';

export default async (doc) => {
  const { email, password } = doc;
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }

  return firebase.auth().currentUser;
};
