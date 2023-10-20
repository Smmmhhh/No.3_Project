import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function ChatDetail() {
    const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId'));
    const [sender, setSender] = useState(localStorage.getItem('wschat.sender'));
    const [room, setRoom] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    let client = null;

    useEffect(() => {
        findRoom();
        connect();

        return () => {
            if (client) client.deactivate();
        };
    }, []);

    const findRoom = () => {
        fetch(`/chat/room/${roomId}`)
            .then(response => response.json())
            .then(data => {
                setRoom(data);
            })
            .catch(error => console.error('Error:', error));
    };

    const sendMessage = () => {
        const payload = {
            type: 'TALK',
            roomId: roomId,
            sender: sender,
            message: message
        };

        fetch("/app/chat/message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                // 필요한 후속 처리를 여기에 추가합니다.
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setMessage('');
    };

    const connect = () => {
        // WebSocket & STOMP 초기화
        const sock = new SockJS("/ws/chat");
        client = new Client({
            webSocketFactory: () => sock,
            onConnect: function(frame) {
                client.subscribe(`/topic/chat/room/${roomId}`, function(message) {
                    const recv = JSON.parse(message.body);
                    setMessages(prevMessages => [recv, ...prevMessages]);
                });
                client.publish({ destination: `/app/chat/message${roomId}`, body: JSON.stringify({type: 'ENTER', roomId: roomId, sender: sender}) });
            },
            onStompError: function(error) {
                console.error('Error:', error);
            }
        });

        client.activate();
    };

    return (
        <div className="container">
            <h2>{room.name}</h2>
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text">내용</label>
                </div>
                <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => { if(e.key === 'Enter') sendMessage() }} />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={sendMessage}>보내기</button>
                </div>
            </div>
            <ul className="list-group">
                {messages.map((msg, index) => (
                    <li key={index} className="list-group-item">
                        {msg.sender} - {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatDetail;