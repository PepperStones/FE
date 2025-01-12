// Home.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import StarImg from "../assets/images/my_star.png";
import MilkyWay from "../assets/images/milky_way.png";
import spaceMan from "../assets/images/spaceMan.png";

import BottomNav from "../components/nav/FooterNav.tsx";

import HomeTopNav from "../components/nav/homeNav/HomeTopNav.tsx";
import StarAnimation from "../components/star/StarAnimation.tsx";

export const myMock = [
  {
    username: "서준",
    level: "F1-I",
    centerName: "음성 2센터",
    jobName: "개발팀",
    recentExperience: Number(1300),
    totalAccumulatedExperience: Number(5000),
  },
];

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPageOption, setIsPageOption] = useState(0);
  // 0 == 나의 별
  // 1 == 팀 별자리
  // 2 == 두핸즈 은하

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const hometitle = {
    first:
      isPageOption === 0
        ? "오늘도 빛나는"
        : isPageOption === 1
        ? `${myMock[0].centerName}의`
        : "빛나는 열정이 모여",
    second:
      isPageOption === 0
        ? `${myMock[0].username}의 별`
        : isPageOption === 1
        ? `${myMock[0].jobName}`
        : "DOHANDS 은하",
    third:
      isPageOption === 0
        ? `을 보러 오셨군요!`
        : isPageOption === 1
        ? `자리가 빛나고 있어요!`
        : "를 밝히고 있어요!",
  };

  // 다음 별
  const handleNextPage = () => {
    setIsPageOption((prev) => prev + 1);
  };

  //이전 별
  const handlePrevPage = () => {
    setIsPageOption((prev) => prev - 1);
  };

  const handleIconPage = () => {
    setIsPageOption((prev) => (prev + 1) % 3); // 0 → 1 → 2 → 0 순환
  };

  return (
    <HomeContainer>
      <HomeTopNav
        hometitle={hometitle}
        isPopupOpen={isPopupOpen}
        togglePopup={togglePopup}
        userData={myMock[0]}
        isPageOption={isPageOption} // isPageOption 전달
        handleIconPage={handleIconPage}
      />
      {/* <Star isPopupOpen={isPopupOpen} src={StarImg} alt="Star Img"></Star> */}
      <StarAnimation
        handleIconPage={handleIconPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        isPageOption={isPageOption}
        isPopupOpen={isPopupOpen}
        setIsPageOption={setIsPageOption}
      ></StarAnimation>
      <BottomNav />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  background-image: url(${MilkyWay});
  background-size: cover;
  background-attachment: fixed; /* 배경 이미지 고정 */
  height: 100vh; /* 전체 화면 높이 */
  overflow: hidden; /* 자식 요소의 크기 변화가 부모에 영향을 미치지 않도록 설정 */

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단과 하단에 간격 배치 */
  z-index: -1; /* 다른 요소 아래로 배치 */
`;

const Star = styled.img<{ isPopupOpen: boolean }>`
  margin: auto;

  width: 347px;
  height: 350px;

  transition: width 0.9s ease, height 0.9s ease, transform 0.9s ease;
  transform: ${(props) =>
    props.isPopupOpen
      ? "scale(1.7) translateY(70px)"
      : "scale(1) translateY(0)"};
  z-index: 1; /* 배경 위에 표시 */
`;
