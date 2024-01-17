import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUsersRoute } from '../utils/APIRoutes';
import axios from 'axios';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

const Chat = () => {

    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);


    const checkTokenAndNavigate = () => {
        if (!localStorage.getItem('chatter-token')) {
            navigate('/login');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chatter-token')))
            setIsLoaded(true);
        }
    };


    useEffect(() => {
        checkTokenAndNavigate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchData = () => {
        if (currentUser) {
            if (currentUser.isAvatarSet) {
                axios.get(`${allUsersRoute}/${currentUser._id}`).then(({ data: { users } }) => {
                    setContacts(users)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                navigate('/setAvatar');
            }
        }

    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return (

        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    isLoaded && currentChat === undefined ? <Welcome currentUser={currentUser} /> : <ChatContainer currentChat={currentChat} currentUser={currentUser} />
                }
            </div>
        </Container>

    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    background-color: #131324;
    align-items: center;
    .container{
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;
        }
        @media screen and (min-width: 360px) and (max-width: 480px){
            grid-template-columns: 35% 65%;
        }
    }
`;

export default Chat
