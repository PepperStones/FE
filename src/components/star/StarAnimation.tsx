import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import StarImage from "../../assets/images/my_star.png";
import tagImage from "../../assets/images/union.png";
import levelsData from "../../assets/images/data/levels.json";

const starData = [
  { id: 1, x: 120, y: 600, size: 30 },
  { id: 2, x: 110, y: 500, size: 30 },
  { id: 3, x: 70, y: 460, size: 30 },
  { id: 4, x: 30, y: 470, size: 30 }, // 내 별
  { id: 5, x: 70, y: 330, size: 30 },
  { id: 6, x: 110, y: 310, size: 30 },
  { id: 7, x: 140, y: 330, size: 30 },
  { id: 8, x: 170, y: 299, size: 30 },
  { id: 9, x: 200, y: 400, size: 30 },
  { id: 10, x: 250, y: 460, size: 30 },
  { id: 11, x: 350, y: 400, size: 30 },
];

const lineData = [
  { x1: 120, y1: 600, x2: 110, y2: 500 },
  { x1: 110, y1: 500, x2: 70, y2: 460 },
  { x1: 70, y1: 460, x2: 30, y2: 470 },
  { x1: 30, y1: 470, x2: 70, y2: 330 },
  { x1: 70, y1: 330, x2: 110, y2: 310 },
  { x1: 110, y1: 310, x2: 140, y2: 330 },
  { x1: 140, y1: 330, x2: 170, y2: 299 },
  { x1: 170, y1: 299, x2: 200, y2: 400 },
  { x1: 200, y1: 400, x2: 250, y2: 460 },
  { x1: 170, y1: 299, x2: 350, y2: 400 },
];

// Mock 데이터
const mockData = {
  user: {
    name: "홍길동",
    level: "F5",
    centerName: "서울센터",
    jobName: "개발팀",
    recentExperience: 150,
    totalExperienceThisYear: 12500,
  },
  team: {
    count: 4,
    levels: ["F2-II", "F3-III", "F5", "F5"],
  },
};

interface HomePage {
  handleIconPage: () => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isPopupOpen: boolean;
  isPageOption: number;
  setIsPageOption: (value: number) => void;
}

// 광량 계산 함수
const calculateOpacityByLevel = (levelName: string | null): number => {
  const minOpacity = 0.4; // 최소 광량
  const maxOpacity = 1; // 최대 광량

  // 레벨이 null인 경우(비활성화 상태)
  if (!levelName) return 0; // 완전히 투명하게 설정

  // 레벨 이름을 기준으로 인덱스 찾기
  const levelIndex = levelsData.findIndex((level) => level.level === levelName);

  if (levelIndex === -1) return minOpacity; // 레벨을 찾을 수 없을 경우 기본값

  // 레벨 인덱스를 기반으로 Opacity 계산
  const levelRatio = levelIndex / (levelsData.length - 1); // 0 ~ 1 사이 값
  const opacity = minOpacity + (maxOpacity - minOpacity) * levelRatio;

  return Math.min(Math.max(opacity, minOpacity), maxOpacity); // 0.4 ~ 1 사이로 제한
};

const StarAnimation: React.FC<HomePage> = ({
  isPageOption,
  handleIconPage,
  handlePrevPage,
  handleNextPage,
  isPopupOpen,
  setIsPageOption,
}) => {
  const myStarId = 1; // "내 별"의 ID

  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({
    width: 1, // 초기값 1로 설정
    height: 1,
  });

  const originalContainerWidth = 363; // 디자인 기준 너비
  const originalContainerHeight = 800; // 디자인 기준 높이

  // 사용자와 팀원의 레벨 정보를 별에 배치
  const enhancedStarData = starData.map((star, index) => {
    if (index === 0) {
      // 1번 별은 항상 사용자
      return {
        ...star,
        level: mockData.user.level,
        isActive: true, // 활성화 상태
        opacity: calculateOpacityByLevel(mockData.user.level),
      };
    } else {
      // 나머지 별에 팀원 정보 배치
      const teamLevel = mockData.team.levels[index - 1] || null; // 팀원 레벨 또는 null
      return {
        ...star,
        level: teamLevel,
        isActive: !!teamLevel, // 팀원이 있으면 활성화
        opacity: calculateOpacityByLevel(teamLevel),
      };
    }
  });

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

  // 별 위치 계산
  const adjustedStarData = enhancedStarData.map((star) => ({
    ...star,
    x: (star.x / originalContainerWidth) * containerSize.width,
    y: (star.y / originalContainerHeight) * containerSize.height,
  }));

  // 선 데이터 계산
  const adjustedLineData = lineData
    .map((line) => {
      // 선의 두 끝에 해당하는 별 찾기
      const startStar = enhancedStarData.find(
        (star) => star.x === line.x1 && star.y === line.y1
      );
      const endStar = enhancedStarData.find(
        (star) => star.x === line.x2 && star.y === line.y2
      );

      // 두 별이 모두 활성화 상태인지 확인
      const isActive = startStar?.isActive && endStar?.isActive;

      return {
        ...line,
        x1: (line.x1 / originalContainerWidth) * containerSize.width,
        y1: (line.y1 / originalContainerHeight) * containerSize.height,
        x2: (line.x2 / originalContainerWidth) * containerSize.width,
        y2: (line.y2 / originalContainerHeight) * containerSize.height,
        isActive,
      };
    })
    .filter((line) => line.isActive); // 활성화된 선만 포함
  const myStar = adjustedStarData.find((star) => star.id === myStarId);

  const handleStarClick = (id: number) => {
    console.log(`Clicked star ID: ${id}`);
    if (id === myStarId) {
      console.log("Setting isPageOption to 0");
      setIsPageOption(0);
    }
  };

  const getAnimationValues = (containerSize: {
    width: number;
    height: number;
  }) => {
    if (!myStar) return { translateX: 0, translateY: 0, scale: 1 };

    let translateX = 0;
    let translateY = 0;
    let scale = 1;

    if (isPageOption === 0) {
      translateX = containerSize.width / 2 - myStar.x;
      translateY =
        containerSize.height / 2 - myStar.y + (isPopupOpen ? 300 : 40);
      scale = isPopupOpen ? 20 : 12;
    }
    if (isPageOption === 1) {
      if (isPopupOpen) {
        translateX = containerSize.width / 2 - myStar.x;
        translateY = containerSize.height / 2 - myStar.y + 130;
        scale = 3; // 팝업 열렸을 때의 확대 비율
      }
    }

    if (isPageOption === 2) {
      scale = 0.5; // 팝업 열렸을 때의 확대 비율
      translateX = containerSize.width / 2 - myStar.x - 40;
      translateY = containerSize.height / 2 - myStar.y + 100;
      if (isPopupOpen) {
        translateX = containerSize.width / 2 - myStar.x - 50;
        translateY = containerSize.height / 2 - myStar.y + 210;
        scale = 0.7;
      }
    }

    return { translateX, translateY, scale };
  };

  return (
    <Container ref={containerRef}>
      <StarContainer
        as={motion.div}
        style={{
          transformOrigin: `${myStar?.x}px ${myStar?.y}px`, // 줌 기준 설정
        }}
        animate={getAnimationValues(containerSize)}
        transition={{
          duration: 1, // 애니메이션 지속 시간
          ease: "easeInOut", // 자연스러운 이징 효과
        }}
      >
        <SVG>
          {adjustedLineData.map((line, index) => (
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
                strokeWidth: 2,
              }}
            />
          ))}
        </SVG>
        {adjustedStarData.map((star) => (
          <React.Fragment key={star.id}>
            <Star
              src={StarImage}
              alt={`Star ${star.id}`}
              animate={{
                scale: star.id === myStarId ? 3 : 1,
                opacity: star.id === myStarId ? 1 : 0.8,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              size={star.size}
              style={{
                left: `${star.x}px`,
                top: `${star.y}px`,
                opacity: star.opacity, // 활성화 여부에 따른 광량 적용
                filter: star.isActive ? "none" : "grayscale(100%)", // 비활성화된 별은 흑백 처리
              }}
              onClick={() => handleStarClick(star.id)}
            />
            {star.id === myStarId && (
              <TagContainer
                as={motion.div}
                style={{ left: `${star.x - 23}px`, top: `${star.y + 14}px` }}
                animate={{
                  opacity: isPageOption === 1 ? 1 : 0,
                  scale: isPageOption === 1 ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.8, // 애니메이션 지속 시간
                  ease: "easeInOut", // 자연스러운 이징 효과
                }}
              >
                <TagImage src={tagImage} alt="Tag" />
                <TagText className="caption-sm-300">나의 별</TagText>
              </TagContainer>
            )}
          </React.Fragment>
        ))}
      </StarContainer>

      {isPageOption === 2 && (
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
      )}
    </Container>
  );
};

export default StarAnimation;

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
`;

const StarContainer = styled(motion.div)`
  position: relative;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  backface-visibility: hidden; /* 렌더링 최적화 */
`;

const Star = styled.img<{ size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  transform: translate(-50%, -50%);
`;

const SVG = styled.svg`
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

const TagImage = styled.img`
  width: 49px;
  height: 26px;
`;

const OurStarTagImage = styled.img`
  width: 66px;
  height: 26px;
`;

const TagText = styled.span`
  position: absolute;
  top: 35%;
  color: var(--primary-10);
  pointer-events: none;
`;
