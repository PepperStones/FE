import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'


function ChatList() {

    const center = {
        icon: null,
        text: "username",
        clickFunc: null
    };


    return (
        <div>
            <TopNav
                lefter={null}
                center={center}
                righter={null}
            />

            <FooterNav></FooterNav>
        </div>
    );
}

export default ChatList;

const ChatPersonList = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

gap: 10px;
padding: 20px;

`;