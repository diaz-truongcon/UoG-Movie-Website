import { collection, query, where, getDocs,getDoc,doc } from "firebase/firestore";
import { db } from "../config/firebase";
// Trả về level cao nhất của VIP theo id người dùng
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
  
      return maxVipLevel; 
    } catch (error) {
      console.error("Error fetching VIP plans:", error);
      return null; // Trả về null nếu có lỗi
    }
  };

// Chức năng kiểm tra xem người dùng có đủ điều kiện truy cập nội dung dựa trên cấp độ VIP hay không
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

 // Tạo query tìm kiếm các package với idPlan cụ thể
  export const getPackagesByPlan = async (idPlan) => {
    const q = query(collection(db, 'Packages'), where('idPlan', '==', idPlan));
    const querySnapshot = await getDocs(q);
  
    const packages = [];
    querySnapshot.forEach((doc) => {
      packages.push({ id: doc.id, ...doc.data() }); // Gộp doc ID vào data để dễ sử dụng
    });
  
    return packages;
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
