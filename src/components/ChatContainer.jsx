import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios';
import { getMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

const ChatContainer = ({ currentChat, currentUser }) => {

    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(getMessagesRoute, {
                params: {
                    from: currentUser._id,
                    to: currentChat._id
                }
            });
            setMessages(response.data);
            console.log(response)
            console.log(messages)
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {

        fetchMessages();
    }, [currentChat]);


    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
    };

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
            <div className="chat-messages">
                {
                    messages.map((message) => {
                        return (
                            <div>
                                <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                                    <div className="content">
                                        <p>
                                            {message.messages}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 78% 12%;
    padding-top: 1rem;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-rows: 15% 70% 15%;
        }
        @media screen and (min-width: 360px) and (max-width: 480px){
           grid-template-rows: 15% 70% 15%;
        }
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
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        .message{
            display: flex;
            align-items: center;
            .content{
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended{
            justify-content: flex-end;
            .content{
                background-color: #4f04ff21;
            }
        }
        .recieved{
            justify-content: flex-start;
            .content{
                background-color: #9900ff20;
            }
        }
    }
`;

export default ChatContainer
