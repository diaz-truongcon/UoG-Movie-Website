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

// Function to check if a user is eligible to access content based on VIP level
export const checkVipEligibility = async (userId, plans, movie) => {
  try {
    // Fetch user's active subscription plans
    const userPlans = await getPlansByUser(userId, plans);
    if (userPlans == 0) {
      console.log("User does not have an active VIP subscription.");
      return false; // No active VIP plan
    }
    const movieLevel = plans.find(plan => plan.id === movie.vip).level;
    const status = userPlans >= movieLevel ? true : false;
    return status; // Trả về trạng thái eligibility
  } catch (error) {
    console.error("Error checking VIP eligibility:", error);
    return false; // Return false in case of error
  }
};

export const getPlansByUser = async (idUser, plans) => {
  try {
    // Tạo truy vấn để lấy dữ liệu của người dùng dựa trên idUser
    const vipQuery = query(collection(db, "Subscriptions"), where("idUser", "==", idUser));
    const querySnapshot = await getDocs(vipQuery);
    // Lưu trữ thông tin VIP hợp lệ (chưa hết hạn)
    const vipData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const currentDate = new Date();
      const expiryDate = data.expiryDate ? data.expiryDate.toDate() : null;

      // Chỉ lấy các gói VIP chưa hết hạn
      if (expiryDate && expiryDate > currentDate) {
        vipData.push({
          id: doc.id,
          ...data,
        });
      }
    });

    // Duyệt qua các plan và tìm VIP có level cao nhất dựa vào vipData
    const highestVipLevels = vipData.map(vip => {
      const planForVip = plans.find(plan => plan.id === vip.plan);
      return planForVip ? planForVip.level : null; // Không tìm thấy kế hoạch tương ứng
    });

    // Tìm cấp độ cao nhất từ các cấp độ VIP đã lấy
    const maxVipLevel = highestVipLevels.reduce((highest, current) => {
      return current > highest ? current : highest;
    }, 0); // Bắt đầu với level thấp nhất là 0

    return maxVipLevel; // Trả về level cao nhất của VIP
  } catch (error) {
    console.error("Error fetching VIP plans:", error);
    return null; // Trả về null nếu có lỗi
  }
};

export async function checkIfMovieRented(userEmail, movieId) {
  try {
    // Tạo query để tìm kiếm trong bộ sưu tập `RentMovies`
    const rentalsRef = collection(db, "RentMovies");
    const q = query(rentalsRef,
      where("isUser", "==", userEmail),
      where("movieId", "==", movieId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Lấy tài liệu đầu tiên (nếu có nhiều giao dịch thuê cho cùng một phim, tùy yêu cầu, có thể thay đổi logic này)
      const rentalData = querySnapshot.docs[0].data();
      const expiryDate = rentalData.expiryDate;

      // Kiểm tra xem expiryDate có còn hiệu lực không
      if (expiryDate && expiryDate.toDate() > new Date()) {
        return true;  // Đã thuê và còn trong thời hạn
      } else {
        return false; // Đã thuê nhưng hết hạn
      }
    } else {
      return false; // Chưa thuê
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra bộ phim đã thuê:", error);
    return false;
  }
}

export async function getSubscriptionsByMonthAndYear(month, year) {
  try {
    // Tạo khoảng thời gian bắt đầu và kết thúc
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
    const endDate = new Date(year, month, 1); // Ngày đầu tiên của tháng tiếp theo

    // Thực hiện truy vấn
    const rentalsRef = collection(db, "Subscriptions");
    const q = query(
      rentalsRef,
      where("startDate", ">=", startDate),
      where("startDate", "<", endDate)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Không có dữ liệu nào phù hợp.");
      return [];
    }

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });

    return results; // Trả về danh sách tài liệu
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    return []; // Trả về mảng rỗng trong trường hợp có lỗi
  }
}

export async function getObjectById(collectionName, id) {
  try {
    // Tạo tham chiếu đến document
    const docRef = doc(db, collectionName, id);
    
    // Lấy dữ liệu từ document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Trả về dữ liệu nếu tồn tại
      return docSnap.data();
    } else {
      // Document không tồn tại
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
}
