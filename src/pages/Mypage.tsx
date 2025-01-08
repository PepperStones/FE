
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'

function Mypage() {
    const Center = {
        text: "마이페이지",
    };

    const Righter = {
        text: "수정",
        clickFunc: null
    }

    return (

        <MypageContainer>
            <TopNav lefter={null} center={Center} righter={Righter} />

            <FooterNav/>
        </MypageContainer>

    );
}

export default Mypage;

const MypageContainer = styled.div`
display: flex;
flex-direction: column;

overflow: hidden;
`;