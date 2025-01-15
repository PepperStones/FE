import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

import StarImage from "../../assets/images/star/real_star.png";
import tagImage from "../../assets/images/union.png";
import spaceMan from "../../assets/images/spaceman.png";
import levelsData from "../../constants/levels.json";
import Bubble_Icon from "../../assets/images/star/spaceMan_bubble.png";
import allStar from "../../assets/images/star/all_star.png";
import { HomeResponse } from "../api/user/HomeApi.ts";

// export interface HomeResponse {
//   code: Number;
//   data: {
//     user: User;
//     team: Team;
//   };
// }

// export interface User {
//   name: string;
//   level: string;
//   centerName: string;
//   jobName: string;
//   recentExperience: number;
//   totalExperienceThisYear: number;
// }

// export interface Team {
//   count: number;
//   levels: string[];
// }

interface HomePage {
  isPopupOpen: boolean;
  isPageOption: number;
  setIsPageOption: (value: number) => void;
  home: HomeResponse;
}

const STAR_SIZE = 10;
const MY_STAR = 1;

//별 위치
const starData = [
  { id: 1, x: 70, y: 0 }, // 나의별
  { id: 2, x: 50, y: 30 },
  { id: 3, x: 40, y: 10 },
  { id: 4, x: 20, y: 30 },
  { id: 5, x: 90, y: 50 },
  { id: 6, x: 120, y: 90 },
  { id: 7, x: 190, y: 40 },
  { id: 8, x: 0, y: 100 },
  { id: 9, x: 35, y: 95 },
  { id: 10, x: 50, y: 110 },
  { id: 11, x: 65, y: 150 },
];

// 라인 위치
const lineData = [
  { x1: 190, y1: 40, x2: 70, y2: 0 },
  { x1: 70, y1: 0, x2: 50, y2: 30 },
  { x1: 50, y1: 30, x2: 40, y2: 10 },
  { x1: 40, y1: 10, x2: 20, y2: 30 },

  { x1: 70, y1: 0, x2: 90, y2: 50 },
  { x1: 90, y1: 50, x2: 120, y2: 90 },

  { x1: 20, y1: 30, x2: 0, y2: 100 },
  { x1: 0, y1: 100, x2: 35, y2: 95 },
  { x1: 35, y1: 95, x2: 50, y2: 110 },
  { x1: 50, y1: 110, x2: 65, y2: 150 },
];

const StarAnimation2: React.FC<HomePage> = ({
  isPageOption,
  isPopupOpen,
  setIsPageOption,
  home,
}) => {
  //컨테이너크기
  const [containerSize, setContainerSize] = useState({
    width: 1000, // ConstellationImage width
    height: 1000, // ConstellationImage height
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setContainerSize({ width: clientWidth, height: clientHeight });
    }
  }, []);

  // const enhancedStarData = starData.map((star, index) => {
  //   if (index === 0) {
  //     // 1번 별은 항상 사용자
  //     return {
  //       ...star,
  //       level: home.data.user.level,
  //       isActive: true, // 활성화 상태
  //       opacity: calculateOpacityByLevel(home.data.user.level),
  //     };
  //   } else {
  //     // 나머지 별에 팀원 정보 배치
  //     const teamLevel = home.data.team.levels[index] || null; // 팀원 레벨 또는 null
  //     return {
  //       ...star,
  //       level: teamLevel,
  //       isActive: !!teamLevel, // 팀원이 있으면 활성화
  //       opacity: calculateOpacityByLevel(teamLevel),
  //     };
  //   }
  // });

  useEffect(() => {
    console.log("Container Size:", containerSize);
    if (containerRef.current) {
      console.log(
        "Bounding Client Rect:",
        containerRef.current.getBoundingClientRect()
      );
    }
  }, [containerSize]);

  useEffect(() => {
    const resizeHandler = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    resizeHandler(); // 초기 크기 설정
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const getAnimationValues = (containerSize: {
    width: number;
    height: number;
  }) => {
    let scale = 1;
    let translateX = 0;
    let translateY = 0;

    if (isPageOption === 0) {
      translateX = starData[0].x;
      translateY = starData[0].y;
      scale = isPopupOpen ? 6 : 13; // 팝업 여부에 따른 스케일 조정
    }

    return {
      scale,
      translateX,
      translateY,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    };
  };

  return (
    <Container>
      <StarMapContainer
        animate={{
          scale: getAnimationValues(containerSize).scale,
          x: getAnimationValues(containerSize).translateX,
          y: getAnimationValues(containerSize).translateY,
        }}
        style={{}}
        transition={{
          duration: 1, // 애니메이션 지속 시간
          ease: "easeInOut", // 자연스러운 이징 효과
        }}
      >
        <ConstellationImage src={allStar} alt="별자리" />
        <StarContainer>
          <Line>
            {lineData.map((line, index) => (
              <motion.line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                initial={{ opacity: 1 }}
                animate={{ opacity: isPageOption === 0 ? 0 : 1 }}
                transition={{
                  duration: 0.8, // 애니메이션 지속 시간
                  ease: "easeInOut", // 자연스러운 이징 효과
                }}
                style={{
                  stroke: "rgba(255, 255, 255, 0.7)",
                  strokeWidth: 1,
                  strokeDasharray: "3 3", // 점선 스타일 추가
                }}
              />
            ))}
          </Line>
          {starData.map((star) => (
            <Star
              src={StarImage}
              alt="우리 별"
              size={STAR_SIZE}
              style={{
                left: `${star.x}px`,
                top: `${star.y}px`,
              }}
            ></Star>
          ))}
        </StarContainer>
        {/* {isPageOption === 2 && (
        <TagContainer
          as={motion.div}
          animate={{
            opacity: isPageOption === 2 ? 1 : 0, // 팝업 열림 여부에 따라 투명도 조절
            left: isPopupOpen ? "40%" : "35%", // StarContainer의 중앙
            top: isPopupOpen ? "81%" : "66%", // 중앙 아래에 위치
            scale: isPopupOpen ? 1.5 : 1, // 크기 변화
          }}
          transition={{
            duration: 1, // 애니메이션 지속 시간
            ease: "easeInOut", // 자연스러운 이징 효과
          }}
        >
          <OurStarTagImage src={tagImage} alt="Tag" />
          <TagText className="caption-sm-300">우리 별자리</TagText>
        </TagContainer>
      )} */}
      </StarMapContainer>
    </Container>
  );
};

export default StarAnimation2;

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

const StarContainer = styled(motion.div)`
  position: absolute; /* 이미지를 기준으로 위치 설정 */
  top: 50%; /* 세로 가운데 */
  left: 35%; /* 가로 가운데 */

  width: 190px;
  height: 150px;
`;

const Star = styled.img<{ size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  transform: translate(-50%, -50%);

  // border: 1px solid rgb(117, 113, 64);
`;

const Line = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  vector-effect: non-scaling-stroke; /* 선이 크기 조정에도 깨지지 않도록 설정 */
`;

const TagContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, 0);
`;

const OurStarTagImage = styled.img`
  width: 66px;
  height: 26px;
`;

const TagText = styled.span`
  position: absolute;
  top: 35%;
  color: var(--gray-100);
  pointer-events: none;
`;
