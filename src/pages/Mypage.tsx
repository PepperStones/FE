

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import LoadingModal from '../components/loading/Loading.tsx';
import DefaultModal from '../components/modal/DefaultModal.tsx';
import PWAInstallModal from '../components/modal/PWAInstallModal.tsx';

import EditIconImg from '../assets/images/orange_circle_pencil.png'
import DepartmentImg from '../assets/images/yellow_house.png'
import JoinDateImg from '../assets/images/yellow_calendar.png'
import LevelImg from '../assets/images/yellow_diamod_star.png'
import PasswordImg from '../assets/images/yellow_lock.png'
import SettingImg from "../assets/images/admin/orange_group.png"

import S0DxEx from '../assets/images/customItem/S0DxEx.png'
import S0DxE0 from '../assets/images/customItem/S0DxE0.png'
import S0D0Ex from '../assets/images/customItem/S0D0Ex.png'
import S0D0E0 from '../assets/images/customItem/S0D0E0.png'

import S1DxEx from '../assets/images/customItem/S1DxEx.png'
import S1DxE0 from '../assets/images/customItem/S1DxE0.png'
import S1D0Ex from '../assets/images/customItem/S1D0Ex.png'
import S1D0E0 from '../assets/images/customItem/S1D0E0.png'

import S2DxEx from '../assets/images/customItem/S2DxEx.png'
import S2DxE0 from '../assets/images/customItem/S2DxE0.png'
import S2D0Ex from '../assets/images/customItem/S2D0Ex.png'
import S2D0E0 from '../assets/images/customItem/S2D0E0.png'

import S3DxEx from '../assets/images/customItem/S3DxEx.png'
import S3DxE0 from '../assets/images/customItem/S3DxE0.png'
import S3D0Ex from '../assets/images/customItem/S3D0Ex.png'
import S3D0E0 from '../assets/images/customItem/S3D0E0.png'

import S4DxEx from '../assets/images/customItem/S4DxEx.png'
import S4DxE0 from '../assets/images/customItem/S4DxE0.png'
import S4D0Ex from '../assets/images/customItem/S4D0Ex.png'
import S4D0E0 from '../assets/images/customItem/S4D0E0.png'

import S5DxEx from '../assets/images/customItem/S5DxEx.png'
import S5DxE0 from '../assets/images/customItem/S5DxE0.png'
import S5D0Ex from '../assets/images/customItem/S5D0Ex.png'
import S5D0E0 from '../assets/images/customItem/S5D0E0.png'

import { fetchMyInfo, fetchStarCustomization, MypageInfoResponse, StarCustomizationResponse } from "../api/user/MypageApi.ts";


// Keyframes 정의
const slideBwdTop = keyframes`
  0% {
    transform: scale(2.3) translateZ(160px) translateY(50px);
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

const profileImgMap = {

    "S0DxEx": S0DxEx,
    "S0DxE0": S0DxE0,
    "S0D0Ex": S0D0Ex,
    "S0D0E0": S0D0E0,

    "S1DxEx": S1DxEx,
    "S1DxE0": S1DxE0,
    "S1D0Ex": S1D0Ex,
    "S1D0E0": S1D0E0,

    "S2DxEx": S2DxEx,
    "S2DxE0": S2DxE0,
    "S2D0Ex": S2D0Ex,
    "S2D0E0": S2D0E0,

    "S3DxEx": S3DxEx,
    "S3DxE0": S3DxE0,
    "S3D0Ex": S3D0Ex,
    "S3D0E0": S3D0E0,

    "S4DxEx": S4DxEx,
    "S4DxE0": S4DxE0,
    "S4D0Ex": S4D0Ex,
    "S4D0E0": S4D0E0,

    "S5DxEx": S5DxEx,
    "S5DxE0": S5DxE0,
    "S5D0Ex": S5D0Ex,
    "S5D0E0": S5D0E0,
};

function Mypage() {
  const Center = {
    text: "나의 정보",
  };

  const navigate = useNavigate();
  const location = useLocation();
  const isFromCustomize = location.state?.fromCustomize || false;

  const [myInfo, setMyInfo] = useState<MypageInfoResponse["data"] | null>(null);
  const [starData, setStarData] = useState<
    StarCustomizationResponse["data"] | null
  >(null);

  const [profileImg, setProfileImg] = useState<string | null>(null); // 프로필 이미지
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null); // 선택된 스킨
  const [selectedDeco, setSelectedDeco] = useState<string | null>(null); // 선택된 장식
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null); // 선택된 효과

  const [isLoading, setIsLoading] = useState(true);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");

    navigate("/login");
  };

  const handleUpdatePwdClick = () => navigate("/mypage-pwd");
  const handleCustomizingClick = () => navigate("/mypage-customize");
  const openInstallModal = () => setIsInstallModalOpen(true);
  const closeInstallModal = () => setIsInstallModalOpen(false);
  const openLogOutModal = () => setIsLogOutModalOpen(true);
  const closeLogOutModal = () => setIsLogOutModalOpen(false);

  // 프로필 이미지 키 생성 함수
  const generateProfileImgKey = (
    skin: string | null,
    deco: string | null,
    effect: string | null
  ) => {
    if (!skin || !deco || !effect) return null;
    return `${skin}${deco}${effect}`; // 예: "S2D3E5"
  };


    const [isD0, setIsD0] = useState<boolean | undefined>(false); // 여우

    const [isLoading, setIsLoading] = useState(true);
    const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');


    const loadStarData = async () => {
      try {
        const response = await fetchStarCustomization();
        setStarData(response.data); // 스타 데이터 저장
        console.log("Star Data:", response.data);

        // Map initial profile image
        if (
          response.data.nowSkin &&
          response.data.nowDecoration &&
          response.data.nowEffect
        ) {
          const initialKey = generateProfileImgKey(
            response.data.nowSkin,
            response.data.nowDecoration,
            response.data.nowEffect
          );
          if (initialKey && profileImgMap[initialKey]) {
            setProfileImg(profileImgMap[initialKey]);
          }
        }
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

                // Map initial profile image
                if (response.data.nowSkin && response.data.nowDecoration && response.data.nowEffect) {
                    const initialKey = generateProfileImgKey(
                        response.data.nowSkin,
                        response.data.nowDecoration,
                        response.data.nowEffect
                    );
                    if (initialKey && profileImgMap[initialKey]) {
                        setProfileImg(profileImgMap[initialKey]);
                    }
                }
                setIsD0(profileImg?.includes('D0'));

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

        setIsD0(profileImg?.includes('D0'));
    }, []);

    useEffect(() => {
        // 선택된 스킨/장식/효과가 변경될 때 프로필 이미지 업데이트
        if (selectedSkin && selectedDeco && selectedEffect) {
            const newKey = generateProfileImgKey(selectedSkin, selectedDeco, selectedEffect);
            if (newKey && profileImgMap[newKey]) {
                setProfileImg(profileImgMap[newKey]);
            } else {
                console.error(`No image found for key: ${newKey}`);
            }
        }

        setIsD0(profileImg?.includes('D0'));
    }, [selectedSkin, selectedDeco, selectedEffect]);

    return (
        <MypageContainer>
            <TopNav lefter={null} center={Center} righter={null} />

            <ProfileInfoContainer>
                <ProfileContainer>
                    <ProfileImageContainer isFromCustomize={isFromCustomize}>

                        <ProfileImage isD0={profileImg?.includes('D0') ?? false} src={profileImg || undefined} alt="프로필 이미지" />

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
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={SettingImg} /><IconDescription className='text-md-200'>인앱 설치</IconDescription>
                        </DetailLeft>
                        <FixButton className='caption-sm-200' onClick={openInstallModal}>설처하기 &gt;</FixButton>
                    </DetailContent>
                </ProfileDetailContainer>

                <Evaluation isFromCustomize={isFromCustomize}>
                    <DetailLeft>
                        <EvaluationTime className='caption-sm-300'>인사평가 결과</EvaluationTime>
                        <EvaluationDescription className='text-md-200'>{myInfo?.grade}등급</EvaluationDescription>
                    </DetailLeft>
                    <DetailRight className='text-sm-200'>+ {myInfo?.experience} do</DetailRight>
                </Evaluation>

                <LogOutContainer>
                    <LogOut className='caption-md-300' onClick={openLogOutModal}>로그아웃 &gt;</LogOut>
                </LogOutContainer>

            </ProfileInfoContainer>

            <PWAInstallModal showModal={isInstallModalOpen} onClose={closeInstallModal} />

            <DefaultModal
                showDefaultModal={isLogOutModalOpen}
                title="로그아웃 하시겠습니까?"
                description=""
                onAcceptFunc={handleLogOut}
                onUnacceptFunc={closeLogOutModal}

            />
          </ProfileImageContainer>
          <ProfileName className="title-md-300">{myInfo?.name}</ProfileName>
          <ProfileEIN className="text-sm-300">{myInfo?.companyNum}</ProfileEIN>
        </ProfileContainer>

        <ProfileDetailContainer isFromCustomize={isFromCustomize}>
          <DetailContent>
            <DetailLeft>
              <MypageIcon src={DepartmentImg} />
              <IconDescription className="text-md-200">소속</IconDescription>
            </DetailLeft>
            <DetailRight className="text-sm-200">
              {myInfo?.centerGroup}
            </DetailRight>
          </DetailContent>
          <DetailContent>
            <DetailLeft>
              <MypageIcon src={JoinDateImg} />
              <IconDescription className="text-md-200">입사일</IconDescription>
            </DetailLeft>
            <DetailRight className="text-sm-200">
              {myInfo?.joinDate}
            </DetailRight>
          </DetailContent>
          <DetailContent>
            <DetailLeft>
              <MypageIcon src={LevelImg} />
              <IconDescription className="text-md-200">레벨</IconDescription>
            </DetailLeft>
            <DetailRight className="text-sm-200">{myInfo?.level}</DetailRight>
          </DetailContent>
          <DetailContent>
            <DetailLeft>
              <MypageIcon src={PasswordImg} />
              <IconDescription className="text-md-200">
                비밀번호
              </IconDescription>
            </DetailLeft>
            <FixButton
              className="caption-sm-200"
              onClick={handleUpdatePwdClick}
            >
              변경하기 &gt;
            </FixButton>
          </DetailContent>
          <DetailContent>
            <DetailLeft>
              <MypageIcon src={SettingImg} />
              <IconDescription className="text-md-200">
                인앱 설치
              </IconDescription>
            </DetailLeft>
            <FixButton className="caption-sm-200" onClick={openInstallModal}>
              설처하기 &gt;
            </FixButton>
          </DetailContent>
        </ProfileDetailContainer>

        <Evaluation isFromCustomize={isFromCustomize}>
          <DetailLeft>
            <EvaluationTime className="caption-sm-300">
              인사평가 결과
            </EvaluationTime>
            <EvaluationDescription className="text-md-200">
              {myInfo?.grade}등급
            </EvaluationDescription>
          </DetailLeft>
          <DetailRight className="text-sm-200">
            + {myInfo?.experience} do
          </DetailRight>
        </Evaluation>

        <LogOutContainer>
          <LogOut className="caption-md-300" onClick={openLogOutModal}>
            로그아웃 &gt;
          </LogOut>
        </LogOutContainer>
      </ProfileInfoContainer>

      <PWAInstallModal
        showModal={isInstallModalOpen}
        onClose={closeInstallModal}
      />

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

  overflow-y: scroll;
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

  ${({ isFromCustomize }) =>
    isFromCustomize &&
    css`
      animation: ${slideBwdTop} 0.75s cubic-bezier(0.25, 0.45, 0.46, 0.94) both;
    `}
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

  ${({ isFromCustomize }) =>
    isFromCustomize &&
    css`
      animation: ${fadeIn} 0.5s ease-in-out;
    `}
`;

const DetailLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  justify-content: center;
  align-items: center;
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

  ${({ isFromCustomize }) =>
    isFromCustomize &&
    css`
      animation: ${fadeIn} 0.5s ease-in-out;
    `}
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

  margin-top: 70px;

  @media (max-width: 360px) {
    margin-top: 20px;
  }
`;

const LogOut = styled.button`
  border: none;
  background: var(--black-20);
  color: var(--gray-50);
`;
