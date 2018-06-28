import * as firebase from 'firebase';

const upload = async ({ folder, file }) => {
  const storageRef = firebase.storage().ref();
  const metadata = {
    'contentType': file.type
  };

  try {
    return  await storageRef.child(`${folder}/` + file.name).put(file, metadata);
  } catch (error) {
    return error;
  }
};

const downloadURL = async (snapshot) => {
  try {
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    return error;
  }
}

const onProcess = (uploadTask) => {
  uploadTask.on('state_changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, (error) => {
    console.log(error);
  }, () => {
    console.log('Upload is done');
  });
}

export { upload, downloadURL, onProcess }
