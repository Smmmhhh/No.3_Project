import React, { Component } from 'react';
import axios from 'axios';

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room_name: '',
            chatrooms: [],
        };
    }

    componentDidMount() {
        this.findAllRoom();
    }

    findAllRoom = () => {
        axios.get('/chat/rooms')
            .then((response) => {
                this.setState({ chatrooms: response.data });
            })
            .catch(() => {
                alert('채팅방을 불러오는데 실패했습니다.');
            });
    };

    createRoom = () => {
        const { room_name } = this.state;
        if (!room_name) {
            alert('방 제목을 입력해 주세요.');
            return;
        }

        const params = new URLSearchParams();
        params.append('name', room_name);

        axios.post('/chat/room', params)
            .then((response) => {
                alert(response.data.roomName + ' 방 개설에 성공했습니다.');
                this.setState({ room_name: '' });
                this.findAllRoom();
            })
            .catch(() => {
                alert('채팅방을 개설하는데 실패했습니다.');
            });
    };

    enterRoom = (roomId) => {
        const sender = prompt('닉네임을 입력해 주세요.');
        if (sender) {
            localStorage.setItem('wschat.sender', sender);
            localStorage.setItem('wschat.roomId', roomId);
            window.location.href = `/chat/room/enter/${roomId}`;
        }
    };

    render() {
        const { room_name, chatrooms } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>채팅방 리스트</h3>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">방제목</label>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        value={room_name}
                        onChange={(e) => this.setState({ room_name: e.target.value })}
                        onKeyUp={(e) => { if (e.key === 'Enter') this.createRoom(); }}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={this.createRoom}>
                            채팅방 개설
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {chatrooms.map((item) => (
                        <li
                            className="list-group-item list-group-item-action"
                            key={item.roomId}
                            onClick={() => this.enterRoom(item.roomId)}
                        >
                            {item.roomName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ChatApp;
