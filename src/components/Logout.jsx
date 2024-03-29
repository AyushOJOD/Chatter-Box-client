import React from 'react'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem('chatter-token');
        navigate('/login');
    }

    return (
        <Button onClick={handleLogout} title='Log out'>
            <BiPowerOff />
        </Button>
    )
}

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: #ebe7ff
    }
`;

export default Logout
