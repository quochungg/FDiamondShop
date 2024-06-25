import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from 'src/config/firebase';

const uploadFile = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }
  console.log(file);
  const storageRef = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;
