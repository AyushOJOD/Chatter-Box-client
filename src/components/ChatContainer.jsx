import React from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';

const ChatContainer = ({ currentChat }) => {

    const handleSendMsg = async (msg) => { };

    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat?.avatar}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h3>{currentChat?.userName}</h3>
                    </div>
                </div>
            </div>
            <Messages />
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}

const Container = styled.div`
    padding-top: 1rem;
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .username{
                h3{
                    font-size: 1.5rem;
                    color: #fff;
                    text-transform: uppercase;
                }
            }
        }
    }
`;

export default ChatContainer
