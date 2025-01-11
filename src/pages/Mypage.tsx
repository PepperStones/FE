
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'

import ProfileImg from '../assets/images/reward/star_skin_1.png'
import EditIconImg from '../assets/images/circle_pencil.png'
import DepartmentImg from '../assets/images/yellow_house.png'
import JoinDateImg from '../assets/images/yellow_calendar.png'
import LevelImg from '../assets/images/yellow_diamod_star.png'
import PasswordImg from '../assets/images/yellow_lock.png'

// Keyframes 정의
const slideBwdTop = keyframes`
  0% {
    transform: scale(1.55) translateZ(160px) translateY(39px);
  }
  100% {
    transform: scale(1) translateZ(0px) translateY(0px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function Mypage() {
    const Center = {
        text: "나의 정보",
    };

    const navigate = useNavigate();
    const location = useLocation();
    const isFromCustomize = location.state?.fromCustomize || false;

    const handleUpdatePwdClick = () => {
        navigate('/mypage-pwd');
    };

    const handleCustomizingClick = () => {
        navigate('/mypage-customize');
    };

    return (
        <MypageContainer>
            <TopNav lefter={null} center={Center} righter={null} />

            <ProfileInfoContainer>
                <ProfileContainer>
                    <ProfileImageContainer isFromCustomize={isFromCustomize}>
                        <ProfileImage src={ProfileImg} alt="프로필 이미지" />
                        <EditIcon src={EditIconImg} alt="아이콘" onClick={handleCustomizingClick} />
                    </ProfileImageContainer>
                    <ProfileName className='title-md-300'>서 준</ProfileName>
                    <ProfileEIN className='text-sm-300'>20-76026744</ProfileEIN>
                </ProfileContainer>

                <ProfileDetailContainer isFromCustomize={isFromCustomize}>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={DepartmentImg} /><IconDescription className='text-md-200'>소속</IconDescription>
                        </DetailLeft>
                        <DetailRight className='text-sm-200'>음성 2센터</DetailRight>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={JoinDateImg} /><IconDescription className='text-md-200'>입사일</IconDescription>
                        </DetailLeft>
                        <DetailRight className='text-sm-200'>2021.01.01</DetailRight>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={LevelImg} /><IconDescription className='text-md-200'>레벨</IconDescription>
                        </DetailLeft>
                        <DetailRight className='text-sm-200'>F1-1</DetailRight>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={PasswordImg} /><IconDescription className='text-md-200'>비밀번호</IconDescription>
                        </DetailLeft>
                        <FixButton className='caption-sm-200' onClick={handleUpdatePwdClick}>변경하기 &gt;</FixButton>
                    </DetailContent>
                </ProfileDetailContainer>

                <Evaluation isFromCustomize={isFromCustomize}>
                    <DetailLeft>
                        <EvaluationTime className='caption-sm-300'>24년 상반기 인사평가</EvaluationTime>
                        <EvaluationDescription className='text-md-200'>A등급</EvaluationDescription>
                    </DetailLeft>
                    <DetailRight className='text-sm-200'>+ 3500 do</DetailRight>
                </Evaluation>

            </ProfileInfoContainer>

            <FooterNav />
        </MypageContainer>

    );
}

export default Mypage;

const MypageContainer = styled.div`
display: flex;
flex-direction: column;

`;

const ProfileInfoContainer = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 20px;
`;

const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const ProfileImageContainer = styled.div<{ isFromCustomize: boolean }>`
    position: relative;
    width: 100px;
    height: 100px;

    margin-bottom: 20px;

    ${({ isFromCustomize }) => isFromCustomize && css `animation: ${slideBwdTop} 0.75s cubic-bezier(0.25, 0.45, 0.46, 0.94) both;`}
`;

const ProfileImage = styled.img`
width: 97px;
height: 97px;

margin-bottom: 20px;
`;

const EditIcon = styled.img`
    position: absolute;
    bottom: 5px; /* 오른쪽 하단에 위치 */
    right: 5px;
    width: 28px; /* 아이콘 크기 */
    height: 28px;
`;

const ProfileName = styled.div`

margin-bottom: 5px;

color: var(--primary-80);
`;

const ProfileEIN = styled.div`

color: var(--gray-40);
`;

const ProfileDetailContainer = styled.div<{ isFromCustomize: boolean }>`

border-radius: 15px;
background: var(--sub-20);

${({ isFromCustomize }) => isFromCustomize && css `animation: ${fadeIn} 0.5s ease-in-out;`}
`;

const DetailLeft = styled.div`
display: flex;
flex-direction: row;
flex: 1;

gap: 8px;
`;

const DetailRight = styled.div`
display: flex;
justify-content: center;
align-items: center;

color: var(--gray-40);
`;

const FixButton = styled.button`

border: none;
background: var(--sub-20);
color: var(--gray-100);
`;

const DetailContent = styled.div`
display: flex;
flex-direction: row;

padding: 11px 20px;
`;

const MypageIcon = styled.img`
width: 14px;
height: 14px;
`;

const Evaluation = styled.div<{ isFromCustomize: boolean }>`
display: flex;
flex-direction: row;
flex: 1;

border-radius: 15px;
background: var(--sub-20);

padding: 12px 14px;

${({ isFromCustomize }) => isFromCustomize && css `animation: ${fadeIn} 0.5s ease-in-out;`}
`;

const EvaluationTime = styled.div`
border-radius: 15px;
border: 1px solid var(--accent-40);
background: var(--accent-80);

padding: 3px 10px;

color: var(--accent-10);
`;

const EvaluationDescription = styled.div`
display: flex;
justify-content: center;
align-items: center;

color: var(--accent-80);
`;

const IconDescription = styled.div`
display: flex;
justify-content: center;
align-items: center;

color: var(--primary-80);
`;