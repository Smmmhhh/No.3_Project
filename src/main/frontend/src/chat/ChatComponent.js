import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs"; // 수정된 부분

const ChatComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new WebSocket("ws://localhost:8881/ws");
            const stomp = new Client();

            stomp.webSocketFactory = () => socket;

            stomp.onConnect = () => {
                stomp.subscribe("/topic/messages", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages([...messages, receivedMessage]);
                });
            };

            stomp.activate();
            setStompClient(stomp);
        };

        connectWebSocket();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [messages, stompClient]);

    const sendMessage = () => {
        if (stompClient && messageInput.trim() !== "") {
            const newMessage = {
                content: messageInput,
                sender: "user", // You can replace this with the actual user information
            };

            stompClient.publish({
                destination: "/app/chat",
                body: JSON.stringify(newMessage),
            });
            setMessageInput("");
        }
    };

    return (
        <div>
            <div>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender}:</strong> {msg.content}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
