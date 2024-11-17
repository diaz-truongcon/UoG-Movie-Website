import { Card, Avatar, Input, Button,Badge } from 'antd';
import { SendOutlined, SearchOutlined, CloseOutlined, WechatOutlined, CheckOutlined, SmileOutlined, CheckCircleOutlined, FullscreenOutlined,FullscreenExitOutlined, DeleteFilled } from '@ant-design/icons';
import React, { useState, useContext, useEffect } from 'react';
import { ContextMessages } from "../../../context/MessagesProvider";
import { formatCommentTime } from "../../../utils/ContantsFunctions";
import { updateDocument, addDocument , deleteDocument } from '../../../Service/FirebaseService';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { ContextCustomers } from "../../../context/CustomersContext";
function ChatBoxAdmin(props) {
    const [chatVisible, setChatVisible] = useState(false);
    const [chatUser, setChatUser] = useState([]);
    const [chatRoom, setChatRoom] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const messages = useContext(ContextMessages);
    const [idChatUser, setIdChatUser] = useState("");
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const customers = useContext(ContextCustomers);
    const [screen,setScreen] = useState(false);
    useEffect(() => {
        const latestMessages = new Map();

        messages.forEach((msg) => {
            // Nếu sender đã tồn tại trong Map và tin nhắn hiện tại mới hơn, cập nhật tin nhắn
            if (!latestMessages.has(msg.sender) || latestMessages.get(msg.sender).timestamp < msg.timestamp) {
                latestMessages.set(msg.sender, msg);
            }
        });

        // Convert Map to array and sort by timestamp in descending order (most recent first)
        const sortedMessages = Array.from(latestMessages.values()).sort((a, b) => b.timestamp - a.timestamp);
        setChatUser(sortedMessages);
    }, [messages]);

  
    useEffect(() => {
        openChatRoom();
    }, [messages, idChatUser])

    const openChatRoom = () => {
        const userMessages = messages
            .filter((msg) => msg.sender === idChatUser)
            .sort((a, b) => a.timestamp - b.timestamp); // Sort messages by timestamp in ascending order
        setChatRoom(userMessages);
        const mesByUser = userMessages.filter((msg) => msg.type === "user" && msg.status === false);

        try {
            mesByUser.map(async (msg) => {
                await updateDocument('Messages', msg.id, { status: true });
            });
        } catch (err) {
            console.error("Error update message: ", err);
        };
    };

    const handleSendMessage = async () => {
        const trimmedMessage = messageInput.trim();
        if (trimmedMessage) {
            setMessageInput('');
            await addDocument('Messages', {
                text: trimmedMessage,
                sender: idChatUser,
                type: isLoggedIn.role,
                timestamp: new Date(),
                status: false
            });       
        }
    };

    const getImgUser = (id) => {
        const user = customers.find((c) => c.id === id);
        return user?.imgUrl;
    }
    const getUsenameUser = (id) => {
        const user = customers.find((c) => c.id === id);
        return user?.username;
    }
    const unreadMessages = () => {
        return chatUser.filter((msg) => msg.status === false && msg.type === "user").length;
    }
    
 const deleteChatUser = (id) => {
   const messageByUser = messages.filter((msg) => msg.sender === id);
   messageByUser.forEach(async (msg) => {
       await deleteDocument('Messages', msg.id);
   });
 }
 
    return chatVisible ? (
        <div className='chat-box-admin' style={{ minWidth: screen ? "95vw" : "50vw", minHeight: screen ? "95vh" : ""}}>
            <Card title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src="https://firebasestorage.googleapis.com/v0/b/netphim-acb5c.appspot.com/o/Customers%2F01bb6f74-c837-43aa-ab2d-44e71db89c17?alt=media&token=326698dd-c6e4-4702-b4ee-aa0ffb58b8ab" />
                        <span style={{ marginLeft: '10px' }}>Admin</span>
                    </div>
                    <div>
                        <span onClick={() => setScreen(!screen)} style={{ marginRight: "10px" }}>
                            {
                                screen ? <FullscreenExitOutlined /> :<FullscreenOutlined  />
                            }
                        </span>
                        <CloseOutlined onClick={() => {setChatVisible(false); setIdChatUser("")}} />
                    </div>
                </div>
            } style={{ backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)", height: screen ? "95vh" : "" }}>
                <div style={{ display: 'flex' }}>
                    {/* Sidebar - takes up 1/3 of the width */}
                    <div style={{ flex: 1, paddingRight: '10px', borderRight: '1px solid #f0f0f0' }}>
                        <Input placeholder="Search" prefix={<SearchOutlined />} />
                        <div style={{ marginTop: '10px', overflowY: "auto", height: screen ? "calc(95vh - 200px)" : "200px" }}>
                            {chatUser.map((user, index) => (
                                <div className='chat-user' key={index} onClick={() => setIdChatUser(user.sender)}>
                                    <Avatar src={getImgUser(user.sender)} />
                                    <div>
                                        <h5 className={user.status || user.type == "admin" ? "" : "black"}>{getUsenameUser(user.sender)}</h5>
                                        <p className={user.status || user.type == "admin" ? "" : "black"}>{user.text}</p> {/* Display the latest message */}
                                    </div>
                                    <DeleteFilled className='delete-chat' onClick={() => deleteChatUser(user.sender)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat area - takes up 2/3 of the width */}
                    <div style={{ flex: 2, paddingLeft: '10px' }}>
                        <div style={{ height: screen ? "calc(95vh - 200px)" : "200px", overflowY: 'scroll', marginBottom: '10px' }}>
                            {
                                chatRoom.map((mes, index) => (
                                    <>
                                        {mes.type === "user" ? (
                                            <div style={{ width: screen ? "40%" : "60%", display: "flex", gap: "10px", marginBottom: "10px" }} key={index}>
                                                <div style={{ alignSelf: "end" }}>
                                                    <Avatar src={getImgUser(mes.sender)} />
                                                </div>
                                                <div style={{ padding: '10px', borderRadius: "10px", flex: "1", backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)" }}>
                                                    <div>{mes.text}</div>
                                                    <div style={{ color: '#8c8c8c', textAlign: "end" }}>{formatCommentTime(mes.timestamp)} {!mes.status ? (<CheckOutlined />) : (<CheckCircleOutlined />)}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            // Optionally handle messages from other roles here
                                            <div style={{ width: screen ? "40%" : "60%", marginBottom: "10px", marginLeft: "auto", marginRight: "10px" }} key={index}>
                                                <div style={{ padding: '10px', borderRadius: "10px", flex: "1", backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)" }}>
                                                    <div style={{ color: 'white' }}>{mes.text}</div> {/* Display the message text for other roles */}
                                                    <div style={{ color: '#8c8c8c', textAlign: "end" }}>{formatCommentTime(mes.timestamp)}{!mes.status ? (<CheckOutlined />) : (<CheckCircleOutlined />)} </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))
                            }
                        </div>
                        <Input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onPressEnter={handleSendMessage}
                            suffix={
                                <Button type="link" onClick={handleSendMessage}>
                                    <SmileOutlined />
                                    <SendOutlined />
                                </Button>
                            }
                            placeholder="Type a message..."
                        />
                    </div>
                </div>
            </Card>
        </div>
    ) : <div
    style={{
        position: "fixed",
        zIndex: "100",
        bottom: "50px",
        right: "50px",
        cursor: "pointer",
    }}
    onClick={() => {
        setChatVisible(true);
    }}
>
    <Badge count={unreadMessages()} offset={[-10, 10]} size="small">
        <WechatOutlined
            style={{
                color: "#4481eb",
                fontSize: "3rem",
            }}
        />
    </Badge>
</div>;
}

export default ChatBoxAdmin;
