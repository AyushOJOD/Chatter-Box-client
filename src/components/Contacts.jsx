import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from "../assets/logo.svg"
import Logout from './Logout';

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.userName);
            setCurrentUserImage(currentUser.avatar);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h3>Chatter Box</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <div className={`contact ${index === currentSelected ? 'selected' : ''
                                        }`} key={contact._id} onClick={() => changeCurrentChat(index, contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatar}`} alt="avatar" />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.userName}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="currentUser">
                        <div className="avatar" onClick={() => { setCurrentSelected(undefined); changeChat(undefined) }}>
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                        <Logout />
                    </div>
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;
        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb{
                background-color: #ffffff39;
                border-radius: 1rem;
                width: 0.1rem;
            }
        }
        .contact{
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            cursor: pointer;
            border-radius: 0.2rem;
            padding: 0.4rem;
            display: flex;
            gap: 1rem;
            align-items: center;
            transition: 0.5sec ease-in-out;  
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                    text-transform: uppercase;
                }
            }
        }
        .selected{
            background-color: #9186f3;

        }
    }
    .currentUser{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0d0d30;
        gap: 2rem;
        .avatar{
            img{
                height: 4rem;
                max-inline-size: 100%;
                cursor: pointer;
            }
        }
        .username{
            h2{
                color: white;
                text-transform: uppercase;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px){
            gap: 0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
        @media screen and (min-width: 360px) and (max-width: 480px){
            gap: 0.5rem;
            .username{
                h2{
                    font-size: 1rem;
                }
            }
        }
    }
    

`;

export default Contacts
