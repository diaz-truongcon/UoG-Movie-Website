// src/services/firebaseService.js
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, where ,getDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

// Fetch all documents from a given collection
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

// Hàm để đăng ký một bộ sưu tập và gọi lại một callback với dữ liệu mới
export const subscribeToCollection = (collectionName, callback) => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(newData);
    });
  
    return unsubscribe; // Trả về hàm unsubscribe để dọn dẹp
  };
  
  // Hàm tìm kiếm về danh sách yêu thích theo userId
  export const getFavorites = async (userId) => {
    const q = query(collection(db, 'Favorites'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const favoriteMovies = [];
    querySnapshot.forEach((doc) => {
        favoriteMovies.push({
            id: doc.id, // Lấy id của document
            ...doc.data() // Lấy các dữ liệu của document
        });
    });
    return favoriteMovies;
};

export const getPackagesByPlan = async (idPlan) => {
    // Tạo query tìm kiếm các package với idPlan cụ thể
    const q = query(collection(db, 'Packages'), where('idPlan', '==', idPlan));
    const querySnapshot = await getDocs(q);

    const packages = [];
    querySnapshot.forEach((doc) => {
        packages.push({ id: doc.id, ...doc.data() }); // Gộp doc ID vào data để dễ sử dụng
    });

    return packages;
};


export const checkVipEligibility = async (userId, movieId) => {
    try {
        // Tạo truy vấn lấy thông tin đăng ký gói VIP của người dùng
        const subscriptionQuery = query(
            collection(db, 'Subscriptions'), 
            where('idUser', '==', userId)
        );
        const userSubscriptionSnapshot = await getDocs(subscriptionQuery);
         
        if (userSubscriptionSnapshot.empty) {
            return false; // Người dùng chưa có gói VIP
        }

        const subscriptionData = userSubscriptionSnapshot.docs[0].data();
        console.log(subscriptionData);
        
        // const { planId, startDate, endDate } = subscriptionData;

        // const now = new Date();
        // if (now < new Date(startDate) || now > new Date(endDate)) {
        //     return false; 
        // }

        // Lấy thông tin gói VIP từ bảng Plans
        const userPlanDoc = doc(db, 'Plans', planId);
        const userPlanSnapshot = await getDoc(userPlanDoc);
        if (!userPlanSnapshot.exists()) {
            return false; // Gói VIP không tồn tại
        }

        const userPlanLevel = userPlanSnapshot.data().level;

        // Lấy thông tin bộ phim từ bảng Movies
        const movieDoc = doc(db, 'Movies', movieId);
        const movieSnapshot = await getDoc(movieDoc);
        if (!movieSnapshot.exists()) {
            return false; // Phim không tồn tại
        }

        const requiredVipId = movieSnapshot.data().vip; // ID của gói VIP yêu cầu để xem phim

        // Lấy cấp độ VIP yêu cầu của phim từ bảng Plans
        const requiredVipPlanDoc = doc(db, 'Plans', requiredVipId);
        const requiredVipPlanSnapshot = await getDoc(requiredVipPlanDoc);
        if (!requiredVipPlanSnapshot.exists()) {
            return false; // Gói VIP yêu cầu của phim không tồn tại
        }

        const requiredVipLevel = requiredVipPlanSnapshot.data().level;

        // Kiểm tra nếu cấp độ VIP của người dùng đủ để xem phim
        return userPlanLevel >= requiredVipLevel;

    } catch (error) {
        console.error('Error checking VIP eligibility:', error);
        return false; // Trả về false nếu có lỗi
    }
};

  