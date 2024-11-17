// src/services/firebaseService.js
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export const fetchDocumentsRealtime = (collectionName, callback) => {
  const collectionRef = collection(db, collectionName);

  // Lắng nghe dữ liệu thay đổi trong thời gian thực
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    // Gọi callback với dữ liệu mới nhất
    callback(documents);
  });

  // Hàm trả về unsubscribe để có thể dừng lắng nghe khi không cần nữa
  return unsubscribe;
};

export const fetchDocuments = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
};

// Thêm tài liệu mới vào một bộ sưu tập cụ thể với tùy chọn tải lên hình ảnh
export const addDocument = async (collectionName, values, imgUpload) => {
  try {
    if (imgUpload) {
      const storageRef = ref(storage, `${collectionName}/${uuidv4()}`);
      await uploadBytes(storageRef, imgUpload);
      const imgUrl = await getDownloadURL(storageRef);
      values.imgUrl = imgUrl; // Lưu URL vào đối tượng values
      console.log(values);
    }
    await addDoc(collection(db, collectionName), values);
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Hàm thêm tài liệu với email làm id
export const addDocumentById = async (collectionName, id, values, imgUpload) => {
  try {
    if (imgUpload) {
      const storageRef = ref(storage, `${collectionName}/${uuidv4()}`);
      await uploadBytes(storageRef, imgUpload);
      const imgUrl = await getDownloadURL(storageRef);
      values.imgUrl = imgUrl; // Lưu URL vào đối tượng values
    }
    // Sử dụng setDoc với email làm id
    await setDoc(doc(db, collectionName, id), values);
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

// Update a document in a given collection with an optional image upload
export const updateDocument = async (collectionName, docId, values, imgUpload, oldImgUrl) => {
  if (imgUpload) {
    const storageRef = ref(storage, `${collectionName}/${uuidv4()}`);
    await uploadBytes(storageRef, imgUpload);
    const imgUrl = await getDownloadURL(storageRef);
    values.imgUrl = imgUrl;

    // Delete the old image if it exists
    if (oldImgUrl) {
      const oldFilename = oldImgUrl.split('%2F').pop().split('?').shift();
      const oldImgRef = ref(storage, `${collectionName}/${oldFilename}`);
      await deleteObject(oldImgRef);
    }
  }
  await updateDoc(doc(collection(db, collectionName), docId), values);
};

// Delete a document from a given collection and its associated image
export const deleteDocument = async (collectionName, docId, imgUrl) => {
  await deleteDoc(doc(collection(db, collectionName), docId));

  // Delete the associated image if it exists
  if (imgUrl) {
    const filename = imgUrl.split('%2F').pop().split('?').shift();
    const imgRef = ref(storage, `${collectionName}/${filename}`);
    await deleteObject(imgRef);
  }
};
