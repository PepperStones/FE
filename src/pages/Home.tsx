// Home.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import StarImg from "../assets/images/my_star.png";
import MilkyWay from "../assets/images/milky_way.png";
import StarAnimation from "../components/star/StarAnimation.tsx";
import spaceMan from "../assets/images/spaceMan.png";

import BottomNav from "../components/nav/FooterNav.tsx";
import HomeTopNav from "../components/nav/homeNav/HomeTopNav.tsx";
import allStar from "../assets/images/star/all_star.png";

import { fetchHome, HomeResponse } from "../api/user/HomeApi.ts";
import StarAnimation2 from "../components/star/StarAnimation2.tsx";
import SpaceImg from "../assets/images/space.png";
const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPageOption, setIsPageOption] = useState(0);
  const [homeData, setHomeData] = useState<HomeResponse>();
  // 0 == 나의 별
  // 1 == 팀 별자리
  // 2 == 두핸즈 은하

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetchHome();
        setHomeData(response);
      } catch (error) {
        console.error("Error fetching Home:", error);
      }
    };

    fetchHomeData();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  if (!homeData) {
    return <div>No data available</div>;
  }

  const hometitle = {
    first:
      isPageOption === 0
        ? "오늘도 빛나는"
        : isPageOption === 1
        ? `${homeData.data.user.centerName}의`
        : "빛나는 열정이 모여",
    second:
      isPageOption === 0
        ? `${homeData.data.user.name}의 별`
        : isPageOption === 1
        ? `그룹${homeData.data.user.jobName}`
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
        userData={homeData.data.user}
        isPageOption={isPageOption} // isPageOption 전달
        handleIconPage={handleIconPage}
      />
      {/* <Star isPopupOpen={isPopupOpen} src={StarImg} alt="Star Img"></Star> */}
      <StarAnimation
        isPageOption={isPageOption}
        isPopupOpen={isPopupOpen}
        setIsPageOption={setIsPageOption}
        home={homeData}
      ></StarAnimation>
      {isPageOption === 2 && (
        <Container>
          <StarMapContainer
            style={{}}
            transition={{
              duration: 1, // 애니메이션 지속 시간
              ease: "easeInOut", // 자연스러운 이징 효과
            }}
          >
            <ConstellationImage src={SpaceImg} alt="별자리" />
            {/* <StarAnimation2
          isPageOption={isPageOption}
          isPopupOpen={isPopupOpen}
          setIsPageOption={setIsPageOption}
          home={homeData}
        ></StarAnimation2> */}
          </StarMapContainer>
        </Container>
      )}

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

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단과 하단에 간격 배치 */

  z-index: -1; /* 다른 요소 아래로 배치 */

  overflow: scroll; /* 스크롤 가능하게 설정 */
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

const Container = styled.div`
  width: 100%;
  height: 100vh; /* 화면 높이에 맞춤 */
  overflow: scroll; /* 스크롤 가능하게 설정 */
  touch-action: pan-x pan-y; /* 터치로 스크롤 가능하게 설정 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */

  margin-bottom: 100px;
  transform-origin: center center;
  position: relative; /* 스크롤 영역 계산 보정 */
`;
const StarMapContainer = styled(motion.div)`
  position: relative; /* 자식 요소를 기준으로 배치 */
  width: 948px;
  height: 642px;
`;
const ConstellationImage = styled.img`
  width: 100%;
  height: 100%;
  min-width: 100vw; /* 화면보다 작아지지 않도록 설정 */
  min-height: 100vh; /* 화면보다 작아지지 않도록 설정 */
`;
