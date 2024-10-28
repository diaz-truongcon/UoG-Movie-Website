import React, { useState, useContext, useEffect } from 'react';
import { Card, Avatar, Input, Button, Badge } from 'antd';
import { SendOutlined, CheckOutlined, SearchOutlined, SmileOutlined, CloseOutlined, WechatOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { CustomerLoginContext } from '../../../context/CustomerLoginContext';
import { addDocument, updateDocument } from "../../../Service/FirebaseService";
import { ContextMessages } from "../../../context/MessagesProvider";
import { formatCommentTime } from "../../../utils/ContantsFunctions";

const ChatBoxUsers = () => {
    const [chat, setChat] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const { isLoggedIn } = useContext(CustomerLoginContext);
    const [chatUser, setChatUser] = useState([]);
    const messages = useContext(ContextMessages);

    const handleSendMessage = async () => {
        const trimmedMessage = messageInput.trim();
        if (trimmedMessage) {
            await addDocument('Messages', {
                text: trimmedMessage,
                sender: isLoggedIn.id,
                type: isLoggedIn.role,
                timestamp: new Date(),
                status: false
            });
            setMessageInput('');
        }
    };
    useEffect(() => {
        openChatRoom();
    }, [messages])
    const openChatRoom = () => {
        const listChat = messages.filter((e) => e.sender === isLoggedIn.id).sort((a, b) => a.timestamp - b.timestamp);
        setChatUser(listChat);
    }
    const unreadMessages = () => {
        return chatUser.filter((msg) => msg.status === false && msg.type === "admin").length;
    }
    const clickChatUser = () => {
        setChat(true);
        const mesByUser = chatUser.filter((msg) => msg.type === "admin" && msg.status === false);
        try {
            mesByUser.map(async (msg) => {
                await updateDocument('Messages', msg.id, { status: true });
            });
        } catch (err) {
            console.error("Error update message: ", err);
        };
    }
    return (
        <div style={{ minWidth: "30vw", padding: '20px', position: "fixed", zIndex: "100", bottom: "10px", right: "10px" }}>
            {isLoggedIn ? (
                chat ? (
                    <Card
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                                <div>
                                    <Avatar src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icon-png-image_400960953_wh1200.png" />
                                    <span style={{ marginLeft: '10px' }}>Beta Support</span>
                                </div>
                                <div>
                                    <SearchOutlined style={{ marginRight: "10px" }} />
                                    <CloseOutlined onClick={() => setChat(false)} />
                                </div>
                            </div>
                        }
                    >
                        <div style={{ height: "300px", overflowY: "auto", paddingBottom: "10px" }}>
                            {
                                chatUser.map((mes, index) => (
                                    <>
                                        {mes.type === "admin" ? (
                                            <div style={{ width: "60%", display: "flex", gap: "10px", marginBottom: "10px" }} key={index}>
                                                <div style={{ alignSelf: "end" }}>
                                                    <Avatar src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icon-png-image_400960953_wh1200.png" />
                                                </div>
                                                <div style={{ padding: '10px', borderRadius: "10px", flex: "1", backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)" }}>
                                                    <div>{mes.text}</div>
                                                    <div style={{ color: '#8c8c8c', textAlign: "end" }}>{formatCommentTime(mes.timestamp)} {!mes.status ? (<CheckOutlined />) : (<CheckCircleOutlined />)}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            // Optionally handle messages from other roles here
                                            <div style={{ width: "60%", marginBottom: "10px", marginLeft: "auto", marginRight: "10px" }} key={index}>
                                                <div style={{ padding: '10px', borderRadius: "10px", flex: "1", backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)" }}>
                                                    <div style={{ color: 'white' }}>{mes.text}</div> {/* Display the message text for other roles */}
                                                    <div style={{ color: '#8c8c8c', textAlign: "end" }}>{formatCommentTime(mes.timestamp)} {!mes.status ? (<CheckOutlined />) : (<CheckCircleOutlined />)}</div>
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
                    </Card>
                ) : (
                    <div
                        style={{
                            position: "fixed",
                            zIndex: "100",
                            bottom: "50px",
                            right: "50px",
                            cursor: "pointer",
                        }}
                        onClick={clickChatUser}
                    >
                        <Badge count={unreadMessages()} offset={[-10, 10]} size="small">
                            <WechatOutlined
                                style={{
                                    color: "#4481eb",
                                    fontSize: "3rem",
                                }}
                            />
                        </Badge>
                    </div>
                )
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default ChatBoxUsers;
