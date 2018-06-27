import * as firebase from 'firebase';

export default async ({ email, password }) => {
  try {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};
