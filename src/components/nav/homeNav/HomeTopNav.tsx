// HomeTopNav.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import SpeechBubble from "../../info/InfoBubble.tsx";

import FirstIconImg from "../../../assets/images/solar_star-ring-linear.png";
import ThirdIconImg from "../../../assets/images/solar_star-line.png";
import SecondIconImg from "../../../assets/images/streamline_galaxy-2.png";
import CenterIconImg from "../../../assets/images/fluent_book-question-mark-rtl-24-regular.png";
import RightIconImg from "../../../assets/images/solar_bell-outline.png";
import PopupUp from "../../../assets/images/up_arrow.png";
import PopupDown from "../../../assets/images/down_arrow.png";
import RightArrow from "../../../assets/images/right_arrow.png";

import levelData from "../../../constants/levels.json";

interface UserData {
  username: string;
  level: string;
  centerName: string;
  jobName: string;
  recentExperience: number;
  totalAccumulatedExperience: number;
}

interface HomeTopNavProps {
  hometitle: {
    first: string;
    second: string;
    third: string;
  };
  isPopupOpen: boolean; // 팝업 상태 전달
  togglePopup: () => void; // 팝업 토글 함수 전달
  userData: UserData; // 사용자 데이터 전달
  isPageOption: number; // isPageOption 추가
  handleIconPage: () => void;
}

const HomeTopNav: React.FC<HomeTopNavProps> = ({
  hometitle,
  isPopupOpen,
  togglePopup,
  userData,
  isPageOption,
  handleIconPage,
}) => {
  // 로컬 스토리지에서 초기 상태 로드
  const [infoTagState, setInfoTagState] = useState(() => {
    const savedState = localStorage.getItem("infoTagState");
    return savedState
      ? JSON.parse(savedState)
      : { page0: true, page1: true, page2: true };
  });

  const [progressState, setProgressState] = useState(0); // ProgressBar 상태

  const leftIconSrc =
    isPageOption === 0
      ? FirstIconImg
      : isPageOption === 1
      ? SecondIconImg
      : ThirdIconImg;

  const navigate = useNavigate();

  useEffect(() => {
    // 상태가 변경될 때 로컬 스토리지에 저장
    localStorage.setItem("infoTagState", JSON.stringify(infoTagState));
  }, [infoTagState]);

  const handleHideInfoTag = () => {
    setInfoTagState((prevState) => ({
      ...prevState,
      [`page${isPageOption}`]: false,
    }));
  };

  // 현재 레벨 확인 함수
  const getCurrentLevel = (totalExp: number) => {
    for (let i = levelData.length - 1; i >= 0; i--) {
      if (totalExp >= levelData[i].required_experience) {
        return {
          level: levelData[i].level,
          requiredExperience: levelData[i + 1].required_experience,
        };
      }
    }
    return {
      level: levelData[0].level,
      requiredExperience: levelData[1].required_experience,
    };
  };

  const { level, requiredExperience } = getCurrentLevel(
    userData.totalAccumulatedExperience
  );

  const calculateProgressPercent = (current: number, max: number) => {
    if (max === 0) return 0; // Avoid division by zero
    return (current / max) * 100;
  };

  const progressPercent = calculateProgressPercent(
    userData.totalAccumulatedExperience,
    requiredExperience
  );

  const experiencePercent = Math.floor(
    (userData.totalAccumulatedExperience / requiredExperience) * 100
  );

  return (
    <NavContainer>
      <TopNav>
        <Left>
          <NavIcon
            src={leftIconSrc}
            alt="Left Icon"
            onClick={() => {
              handleIconPage();
              handleHideInfoTag(); // InfoTag 숨김
            }}
          />
          {/* InfoTag 표시 여부 */}
          {infoTagState[`page${isPageOption}`] && (
            <SpeechBubble
              text={
                isPageOption === 0
                  ? "우리 별자리를 확인해보세요!"
                  : isPageOption === 1
                  ? "우리 은하를 확인해보세요!"
                  : "나의 별로 돌아갈 수 있어요!"
              }
            />
          )}
        </Left>

        <Center>
          <NavIcon
            src={CenterIconImg}
            alt="Center Icon"
            onClick={() => {
              navigate("/board");
            }}
          />
        </Center>

        <Right>
          <NavIcon
            src={RightIconImg}
            alt="Right Icon"
            onClick={() => navigate("/notification_list")}
          />
        </Right>
      </TopNav>

      <HeadContainer>
        <Title>
          <p className="title-md-100">{hometitle.first}</p>
          <MiddleTitle>
            <NameTitle className="title-lg-300">{hometitle.second}</NameTitle>
            <RegularText className="title-md-100">
              {hometitle.third}
            </RegularText>
          </MiddleTitle>
        </Title>
        <PopupWrapper>
          <PopUp isPopupOpen={isPopupOpen}>
            <MyInfo>
              <MyLevel>
                <Lavel className="caption-sm-300">나의 레벨</Lavel>
                <Text className="text-lg-300">{userData.level}</Text>
              </MyLevel>
              <Divider></Divider>
              <MyLevel>
                {" "}
                <Lavel className="caption-sm-300">최근 획득 경험치</Lavel>
                <Text className="text-lg-300">
                  + {userData.recentExperience} do
                </Text>
              </MyLevel>
              <Icon
                src={RightArrow}
                onClick={() => navigate("/experience-point")}
              ></Icon>
            </MyInfo>

            <MyExp>
              <ExpHead>
                <TotalExp className="text-lg-300">
                  {userData.totalAccumulatedExperience}
                  <MaxExp className="caption-md-300">
                    / {requiredExperience}
                  </MaxExp>
                </TotalExp>
                <Percent className="text-lg-300">{experiencePercent}%</Percent>
              </ExpHead>

              <BarContainer>
                <BarFill progress={progressPercent} />
                <Circle position={progressPercent} />
              </BarContainer>
              <ExpText className="caption-sm-200"> 올 해 획득한 경험치</ExpText>
              <ExpDivider />
              <ExpDetail className="caption-sm-200">
                자세히 보기
                <DtailIcon
                  src={RightArrow}
                  onClick={() => navigate("/experience-point")}
                ></DtailIcon>
              </ExpDetail>
            </MyExp>
          </PopUp>
          <PopupButton
            src={isPopupOpen ? PopupUp : PopupDown}
            alt="Popup Toggle Button"
            isPopupOpen={isPopupOpen}
            onClick={togglePopup}
          ></PopupButton>
        </PopupWrapper>
      </HeadContainer>
    </NavContainer>
  );
};

export default HomeTopNav;

// 스타일 컴포넌트

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  background: var(--sub-10);

  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;

  border-radius: 0px 0px 25px 25px;
  position: fixed;
  top: 0; /* 화면 상단에 고정 */
  left: 0;
  right: 0;
  z-index: 1000; /* 다른 요소 위에 표시 */
`;

const TopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px; /* 좌우 여백 */

  height: 71px;
`;

const Left = styled.div`
  flex: 1; /* 남는 공간 균등 배분 */

  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 왼쪽 정렬 */

  gap: 10px;
`;
const Center = styled.div`
  flex: 1; /* 남는 공간 균등 배분 */
  display: flex;
  justify-content: right; /* 중앙 정렬 */

  padding-right: 17px;
`;
const Right = styled.div`
  display: flex;
  justify-content: right; /* 중앙 정렬 */
`;

const NavIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--gray-90);
  margin: 0 30px;
  gap: 5px;
`;

const MiddleTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline; /* 텍스트 기준선 맞춤 */
`;

const NameTitle = styled.p`
  font-weight: bold;
  font-size: 24px; /* "서준의 별"의 크기 */
  line-height: 1.2; /* 텍스트 간격 */
`;

const RegularText = styled.p`
  font-size: 16px; /* "을 보러 오셨군요!"의 크기 */
  line-height: 1.2; /* 텍스트 간격 */
  color: var(--gray-90); /* 색상 설정 */
`;

const HeadContainer = styled.div``;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PopUp = styled.div<{ isPopupOpen: boolean }>`
  padding: ${(props) => (props.isPopupOpen ? "0 20px " : "0")};

  margin-top: 25px;
  transform: ${(props) => (props.isPopupOpen ? "scale(1)" : "scale(0.8)")};
  opacity: ${(props) => (props.isPopupOpen ? 1 : 0)};
  height: ${(props) => (props.isPopupOpen ? "190px" : "0px")};
  width: 100%;

  overflow: hidden; /* 내용이 줄어들 때 깔끔하게 처리 */
  transition: all 1.2s ease;
`;

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  width: 100%;
  border-top: 1px solid #404a75;
  border-bottom: none;
  flex-shrink: 0;
  background: var(--sub-20, #262d46);

  align-items: center;
  padding: 12px 15px;

  gap: 15px;
`;
const Lavel = styled.div`
  color: var(--accent-10);
  text-align: center;

  border-radius: 15px;
  border: 1px solid var(--accent-40);
  background: var(--accent-80);

  padding: 3px 10px;
  align-items: center;
  flex-shrink: 0;
`;
const MyLevel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  white-space: nowrap;
`;

const Text = styled.span`
  color: var(--accent-80);
  text-align: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;

  background: #404a75;
`;
const MyExp = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid var(--, #404a75);

  background: #262d46;
  margin-top: 15px;

  padding-top: 14px;
  padding-left: 14px;
  padding-right: 14px;
  white-space: nowrap;
`;
const ExpHead = styled.div`
  display: flex;
  flex-direction: row;

  color: var(--gray-40);
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
`;

const MaxExp = styled.span`
  color: var(--gray-40);
`;
const TotalExp = styled.span`
  color: var(--primary-70);
`;
const Percent = styled.span`
  color: var(--primary-70);
`;
const BarContainer = styled.div`
  position: relative;

  width: 100%;
  height: 9px; /* 게이지 바 높이 */
  border-radius: 13px; /* 게이지 바 radius */
  background: var(--gray-20);
  margin-bottom: 11px;
`;

const BarFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 9px;
  background: var(--primary-70);
  border-radius: 13px; /* 모서리 둥글게 */

  transition: width 0.3s ease; /* 애니메이션 효과 */
`;

const Circle = styled.div<{ position: number }>`
  position: absolute;
  left: ${({ position }) => `calc(${position}% - 10px)`};
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  transition: all 0.3s ease; /* 애니메이션 효과 */

  width: 13px;
  height: 13px;
  background-color: var(--primary-70);
  border: none;
  border-radius: 50%; /* 원형 */
`;

const ExpText = styled.div`
  color: var(--gray-40);
  margin-bottom: 14px;
`;

const ExpDivider = styled.div`
  height: 0.5px;

  background: #474747;
  margin-bottom: 8px;
`;

const ExpDetail = styled.div`
  display: flex;
  gap: 7px;

  justify-content: end;
  justify-items: center;

  color: var(--gray-100);
  text-align: right;
  margin-bottom: 8px;
  z-index: 10;

  align-items: baseline;
`;

const DtailIcon = styled.img`
  width: 5px;
  height: 8px;
  flex-shrink: 0;
`;

const PopupButton = styled.img<{ isPopupOpen: boolean }>`
  width: 25px;
  height: 9px;
  margin-top: 12px;
  transform: ${(props) =>
    props.isPopupOpen ? "translateY(-12px)" : "translateY(-12px)"};
`;

const Icon = styled.img`
  width: 7px;
  height: 12px;
  flex-shrink: 0;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;

  position: relative;
  width: fit-content; /* 컨텐츠 크기에 맞게 자동으로 조절 */
`;

const TagImage = styled.img`
  height: 20px; /* 높이는 고정 */
  width: 100%; /* 텍스트에 맞게 가로 크기 조정 */
  object-fit: contain; /* 텍스트 길이에 맞게 이미지를 축소/확대 */
  position: absolute; /* 텍스트와 이미지가 겹치도록 설정 */
  z-index: -1; /* 텍스트 위에 표시되지 않도록 뒤로 보냄 */
`;

const TagText = styled.span`
  position: relative; /* 텍스트 위치 고정 */
  color: var(--sub-20);
  pointer-events: none;
  padding-right: 10px; /* 텍스트 양쪽 여백 */
  padding-left: 15px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  z-index: 1; /* 텍스트가 이미지 위에 보이도록 설정 */
`;

// border: 1px solid rgb(239, 10, 10);