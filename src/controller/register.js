import * as firebase from 'firebase';
import config from '../utils/config';

const { firebaseVerification: { verification }} = config;

const register = async ({ email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user =  firebase.auth().currentUser;
    emailVerification({ verification, user });
    return user;
  } catch (error) {
    return error;
  }
};

const emailVerification = async ({ verification, user }) => {
  if (!verification) return true;
  try {
    return await user.sendEmailVerification();
  } catch (error) {
    return error;
  }
};

export { register };
