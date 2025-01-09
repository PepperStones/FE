// Home.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import StarImg from "../assets/images/my_star.png";
import MilkyWay from "../assets/images/milky_way.png";

import BottomNav from "../components/nav/FooterNav.tsx";

import HomeTopNav from "../components/nav/HomeTopNav.tsx";

export const myMock = [
  {
    id: 1,
    username: "서준",
    level: "F1-1",
    recentExperience: Number(3000),
    totalAccumulatedExperience: Number(5000),
    max_exp: Number(9000),
  },
];

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const hometitle = {
    first: "오늘도 빛나는",
    second: `${myMock[0].username}의 별`,
    third: "을 보러 오셨군요!",
  };

  return (
    <HomeContainer>
      <HomeTopNav
        hometitle={hometitle}
        isPopupOpen={isPopupOpen}
        togglePopup={togglePopup}
        userData={myMock[0]}
      />
      <Star isPopupOpen={isPopupOpen} src={StarImg} alt="Star Img"></Star>
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
