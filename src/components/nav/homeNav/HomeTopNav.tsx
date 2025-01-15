// Home.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatNumberWithCommas } from "../../../utils/NumberWithComma.ts";
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

interface User {
  name: string;
  level: string;
  centerName: string;
  jobName: string;
  recentExperience: number;
  totalExperienceThisYear: number;
}

interface HomeTopNavProps {
  hometitle: {
    first: string;
    second: string;
    third: string;
  };
  isPopupOpen: boolean; // 팝업 상태 전달
  togglePopup: () => void; // 팝업 토글 함수 전달
  userData: User; // 사용자 데이터 전달
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

  const MAX_PERCENT = 100;
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
    console.log(levelData);
  }, [infoTagState]);

  const handleHideInfoTag = () => {
    setInfoTagState((prevState) => ({
      ...prevState,
      [`page${isPageOption}`]: false,
    }));
  };

  // F 데이터를 저장할 배열
  const savedData: Array<{ level: string; total_experience: number }> = [];

  // F 데이터를 저장 및 반환하는 함수
  const saveData = (
    levelString: string
  ): Array<{ level: string; total_experience: number }> => {
    const groupKey = levelString[0]; // "F1-I" → "F"

    // 그룹 데이터 가져오기
    const groupData = levelData[groupKey];

    if (!groupData) {
      throw new Error(`No data found for group ${groupKey}`);
    }

    groupData.forEach((data) => {
      savedData.push(data);
    });

    // 반환
    return savedData;
  };

  // 현재 레벨 확인 함수
  const getCurrentLevel = (
    totalExp: number,
    levelDataArray: Array<{ level: string; total_experience: number }>
  ) => {
    for (let i = levelDataArray.length - 1; i >= 0; i--) {
      if (totalExp >= (levelDataArray[i].total_experience || 0)) {
        return {
          level: levelDataArray[i].level,
          requiredExperience: levelDataArray[i + 1].total_experience,
        };
      }
    }
    return {
      level: levelDataArray[0].level,
      requiredExperience: levelDataArray[1].total_experience,
    };
  };

  const { level, requiredExperience } = getCurrentLevel(
    userData.totalExperienceThisYear,
    saveData(userData.level)
  );

  const calculateProgressPercent = (current: number, max: number) => {
    if (max === 0) return 0; // Avoid division by zero

    const cal = (current / max) * 100;
    if (cal > MAX_PERCENT) {
      return MAX_PERCENT;
    } else {
      return Math.floor(cal);
    }
  };

  const progressPercent = calculateProgressPercent(
    userData.totalExperienceThisYear,
    9000
  );

  const experiencePercent = Math.floor(
    (userData.totalExperienceThisYear / 9000) * 100
  );

  return (
    <NavContainer isPageOption={isPageOption}>
      <TopNav>
        <Left>
          <NavIcon
            src={leftIconSrc}
            alt="Left Icon"
            onClick={() => {
              handleIconPage();
              handleHideInfoTag(); // InfoTag 숨김
            }}
            style={{ width: "22px", height: "22px" }}
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
              navigate("/challenge");
            }}
            style={{ width: "16px", height: "20px" }}
          />
        </Center>

        <Right>
          <NavIcon
            src={RightIconImg}
            alt="Right Icon"
            onClick={() => navigate("/notification_list")}
            style={{ width: "20px", height: "22px" }}
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
            <MyInfo onClick={() => navigate("/experience-point?tab=current")}>
              <MyLevel>
                <Lavel className="caption-sm-300">나의 레벨</Lavel>
                <Text className="text-lg-300">{userData.level}</Text>
              </MyLevel>
              <Divider></Divider>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "224px",
                }}
              >
                <ReventExpLavel className="caption-sm-300">
                  최근 획득 경험치
                </ReventExpLavel>

                <MyLevel>
                  <Text className="text-lg-300">
                    + {formatNumberWithCommas(userData.recentExperience)} do
                  </Text>

                  <Icon src={RightArrow}></Icon>
                </MyLevel>
              </div>
            </MyInfo>

            <MyExp>
              <ExpHead>
                <TotalExp className="text-lg-300">
                  {formatNumberWithCommas(userData.totalExperienceThisYear)}
                  <MaxExp className="caption-md-300"> / 9,000</MaxExp>
                </TotalExp>
                <Percent className="text-lg-300">{experiencePercent}%</Percent>
              </ExpHead>

              <BarContainer>
                <BarFill progress={progressPercent} />
                <Circle position={progressPercent} />
              </BarContainer>
              <ExpText className="caption-sm-200"> 올 해 획득한 경험치</ExpText>
              <ExpDivider />
              <ExpDetail
                className="caption-sm-200"
                onClick={() => navigate("/experience-point?tab=receipt")}
              >
                자세히 보기
                <DtailIcon src={RightArrow}></DtailIcon>
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

const NavContainer = styled.nav<{ isPageOption: number }>`
  display: flex;
  flex-direction: column;

  border-radius: 0px 0px 25px 25px;
  background: var(--gray-0);

  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;

  border-radius: 0px 0px 25px 25px;

  position: ${(props) => (props.isPageOption === 2 ? "static" : "fixed")};

  top: 0; /* 화면 상단에 고정 */
  left: 0;
  right: 0;

  z-index: 1000;
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
  width: 20px;
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

  border-bottom: none;
  flex-shrink: 0;
  background: var(--black-20);
  align-items: center;
  padding: 12px 15px;

  gap: 15px;
`;

const ReventExpLavel = styled.div`
  color: var(--gray-100);
  text-align: center;

  border-radius: 15px;
  width: 86px;
  background: var(--gray-0);

  padding: 3px 10px;
  align-items: center;
  flex-shrink: 0;
`;

const Lavel = styled.div`
  flex: 1;
  color: var(--gray-100);
  text-align: center;

  border-radius: 15px;
  background: var(--gray-0);

  padding: 3px 10px;
  align-items: center;
  flex-shrink: 0;
`;

const MyLevel = styled.div`
  display: flex;
  flex-direction: row;
  align-contents: space-between;

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

  background: var(--black-70);
`;

const MyExp = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid var(--, #404a75);

  background: var(--black-20);
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
  color: var(--orange-70);
`;

const Percent = styled.span`
  color: var(--orange-70);
`;
const BarContainer = styled.div`
  position: relative;

  width: 100%;
  height: 9px; /* 게이지 바 높이 */
  border-radius: 13px; /* 게이지 바 radius */

  margin-bottom: 11px;
`;

const BarFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 9px;

  background: linear-gradient(90deg, #151515 0%, #ff5c35 100%);
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
  background-color: var(--orange-70);
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
