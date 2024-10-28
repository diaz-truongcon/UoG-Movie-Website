import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../Service/FirebaseService";

export const ContextMessages = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Messages", (messagesList) => {
      setMessages(messagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextMessages.Provider value={messages}>
      {children}
    </ContextMessages.Provider>
  );
};
