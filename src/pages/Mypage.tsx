
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import LoadingModal from '../components/loading/Loading.tsx';
import DefaultModal from '../components/modal/DefaultModal.tsx';

import ProfileImg from '../assets/images/reward/star_skin_1.png'
import EditIconImg from '../assets/images/orange_circle_pencil.png'
import DepartmentImg from '../assets/images/yellow_house.png'
import JoinDateImg from '../assets/images/yellow_calendar.png'
import LevelImg from '../assets/images/yellow_diamod_star.png'
import PasswordImg from '../assets/images/yellow_lock.png'

import { fetchMyInfo, fetchStarCustomization, MypageInfoResponse, StarCustomizationResponse } from "../api/user/MypageApi.ts";

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

    const [myInfo, setMyInfo] = useState<MypageInfoResponse["data"] | null>(null);
    const [starData, setStarData] = useState<StarCustomizationResponse['data'] | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/login');
    };

    const handleUpdatePwdClick = () => navigate('/mypage-pwd');
    const handleCustomizingClick = () => navigate('/mypage-customize');
    const openLogOutModal = () => setIsLogOutModalOpen(true);
    const closeLogOutModal = () => setIsLogOutModalOpen(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchMyInfo();
                setMyInfo(response.data); // 사용자 정보 저장
                console.log("My Info:", response.data);
            } catch (error) {
                console.error("Failed to load my info:", error);
            }
        };

        const loadStarData = async () => {
            try {
                const response = await fetchStarCustomization();
                setStarData(response.data); // 스타 데이터 저장
                console.log("Star Data:", response.data);
            } catch (error) {
                console.error("Error loading star customization:", error);
            }
        };

        // 두 비동기 작업을 병렬로 처리
        const fetchAllData = async () => {
            setIsLoading(true); // 로딩 시작
            await Promise.all([loadData(), loadStarData()]); // 두 작업 완료 대기
            setIsLoading(false); // 로딩 종료
        };

        fetchAllData();
    }, []);

    return (
        <MypageContainer>
            <TopNav lefter={null} center={Center} righter={null} />

            <ProfileInfoContainer>
                <ProfileContainer>
                    <ProfileImageContainer isFromCustomize={isFromCustomize}>
                        <ProfileImage src={ProfileImg} alt="프로필 이미지" />
                        <EditIcon src={EditIconImg} alt="아이콘" onClick={handleCustomizingClick} />
                    </ProfileImageContainer>
                    <ProfileName className='title-md-300'>{myInfo?.name}</ProfileName>
                    <ProfileEIN className='text-sm-300'>{myInfo?.companyNum}</ProfileEIN>
                </ProfileContainer>

                <ProfileDetailContainer isFromCustomize={isFromCustomize}>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={DepartmentImg} /><IconDescription className='text-md-200'>소속</IconDescription>
                        </DetailLeft>
                        <DetailRight className='text-sm-200'>{myInfo?.centerGroup}</DetailRight>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={JoinDateImg} /><IconDescription className='text-md-200'>입사일</IconDescription>
                        </DetailLeft>
                        <DetailRight className='text-sm-200'>{myInfo?.joinDate}</DetailRight>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={LevelImg} /><IconDescription className='text-md-200'>레벨</IconDescription>
                        </DetailLeft>
                        <DetailRight className='text-sm-200'>{myInfo?.level}</DetailRight>
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
                        <EvaluationDescription className='text-md-200'>{myInfo?.grade}등급</EvaluationDescription>
                    </DetailLeft>
                    <DetailRight className='text-sm-200'>+ 3500 do</DetailRight>
                </Evaluation>

                <LogOutContainer>
                    <LogOut className='caption-md-300' onClick={openLogOutModal}>로그아웃 &gt;</LogOut>
                </LogOutContainer>

            </ProfileInfoContainer>

            <DefaultModal
                showDefaultModal={isLogOutModalOpen}
                title="로그아웃 하시겠습니까?"
                description=""
                onAcceptFunc={handleLogOut}
                onUnacceptFunc={closeLogOutModal}
            />
            <LoadingModal isOpen={isLoading} />

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

    ${({ isFromCustomize }) => isFromCustomize && css`animation: ${slideBwdTop} 0.75s cubic-bezier(0.25, 0.45, 0.46, 0.94) both;`}
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
background: var(--black-50);

${({ isFromCustomize }) => isFromCustomize && css`animation: ${fadeIn} 0.5s ease-in-out;`}
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
background: var(--black-50);
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
background: var(--black-50);

padding: 12px 14px;

${({ isFromCustomize }) => isFromCustomize && css`animation: ${fadeIn} 0.5s ease-in-out;`}
`;

const EvaluationTime = styled.div`
border-radius: 15px;
border: 1px solid #666;
border-bottom: none;
background: var(--black-30);

padding: 3px 10px;

color: var(--orange-90);
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

color: var(--orange-90);
`;

const LogOutContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

margin-top: 100px;
`;

const LogOut = styled.button`
border: none;
background: var(--black-20);
color: var(--gray-50);
`;