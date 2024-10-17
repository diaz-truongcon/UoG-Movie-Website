import React, { createContext, useState, useEffect } from 'react';
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextComments = createContext();

// Tạo Provider cho Comments
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Comments", (commentsList) => {
      setComments(commentsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextComments.Provider value={comments}>
      {children}
    </ContextComments.Provider>
  );
};
