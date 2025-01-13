import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import StarImage from "../../assets/images/my_star.png";
import tagImage from "../../assets/images/union.png";
import spaceMan from "../../assets/images/spaceman.png";
import levelsData from "../../constants/levels.json";
import Bubble_Icon from "../../assets/images/star/spaceMan_bubble.png";

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

// // Mock 데이터
// const mockData = {
//   user: {
//     name: "홍길동",
//     level: "F5",
//     centerName: "서울센터",
//     jobName: "개발팀",
//     recentExperience: 150,
//     totalExperienceThisYear: 12500,
//   },
//   team: {
//     count: 4,
//     levels: ["F2-II", "F3-III", "F5", "F5"],
//   },
// };

interface LevelData {
  level: string;
  total_experience: number | null;
}

interface LevelsDataType {
  F: LevelData[];
  B: LevelData[];
  G: LevelData[];
  T: LevelData[];
}

export interface Home {
  code: Number;
  data: {
    user: User;
    team: Team;
  };
}

export interface User {
  name: string;
  level: string;
  centerName: string;
  jobName: string;
  recentExperience: number;
  totalExperienceThisYear: number;
}

export interface Team {
  count: number;
  levels: string[];
}

interface HomePage {
  handleIconPage: () => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isPopupOpen: boolean;
  isPageOption: number;
  setIsPageOption: (value: number) => void;
  home: Home;
}

const StarAnimation: React.FC<HomePage> = ({
  isPageOption,
  handleIconPage,
  handlePrevPage,
  handleNextPage,
  isPopupOpen,
  setIsPageOption,
  home,
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

  const [isActiveSpaceMan, setIsActiveSpaceMan] = useState(false);
  const [isActiveBubble, setIsActiveBubble] = useState(false); // 말풍선 활성화 상태
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조
  const [bubblePosition, setBubblePosition] = useState<{
    x: number;
    y: number;
  } | null>(null); // 말풍선 위치
  const [loading, setLoading] = useState(false);

  const handleBubbleClick = async (x: number, y: number) => {
    if (!loading) {
      setLoading(true); // 로딩 상태 활성화
      setIsActiveBubble(true); // 말풍선 활성화
      setBubblePosition({ x, y }); // 말풍선 위치 저장
      console.log("말풍선 활성화");

      // 5초 대기
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setIsActiveBubble(false); // 말풍선 비활성화
      console.log("말풍선 꺼짐");

      setLoading(false); // 로딩 상태 비활성화
    }
  };

  const [savedData, setSavedData] = useState<
    Array<{ level: string; total_experience: number | null }>
  >([]);

  // 데이터를 저장 및 초기화하는 함수
  const saveData = (levelString: string) => {
    // 레벨 문자열에서 그룹 키 추출 (F, B, G, T)
    const groupKey = levelString.charAt(0) as keyof LevelsDataType;
    const groupData = levelsData[groupKey];

    if (!groupData) {
      console.error(`그룹 ${groupKey}에 대한 데이터를 찾을 수 없습니다`);
      return;
    }

    setSavedData(groupData);
  };

  const calculateOpacityByLevel = (levelName: string | null): number => {
    const minOpacity = 0.4;
    const maxOpacity = 1;

    if (!levelName) return 0;

    // levelsData가 제대로 로드되었는지 확인
    if (!levelsData) {
      console.error("levelsData is not loaded");
      return minOpacity;
    }

    const groupKey = levelName.charAt(0) as keyof LevelsDataType;
    console.log("Group Key:", groupKey); // 디버깅을 위한 로그
    console.log("Level Data for group:", levelsData[groupKey]); // 해당 그룹의 데이터 확인

    const groupData = levelsData[groupKey];
    if (!groupData) {
      console.error(`그룹 ${groupKey}에 대한 데이터를 찾을 수 없습니다`);
      return minOpacity;
    }

    // 현재 레벨의 경험치 찾기
    const currentLevelData = groupData.find(
      (level) => level.level === levelName
    );
    console.log("Current Level Data:", currentLevelData); // 현재 레벨 데이터 확인

    if (!currentLevelData) {
      console.error(`레벨 ${levelName}에 대한 데이터를 찾을 수 없습니다`);
      return minOpacity;
    }

    // 현재 레벨의 total_experience가 null이면 최소 광량 반환
    if (currentLevelData.total_experience === null) {
      return minOpacity;
    }

    // 최대 경험치 값 찾기 전에 배열 확인
    const validExperiences = groupData
      .map((level) => level.total_experience)
      .filter((exp): exp is number => exp !== null);
    console.log("Valid Experiences:", validExperiences); // 유효한 경험치 값들 확인

    if (validExperiences.length === 0) {
      console.error("유효한 경험치 값이 없습니다");
      return minOpacity;
    }

    const maxExperience = Math.max(...validExperiences);
    const experienceRatio = currentLevelData.total_experience / maxExperience;
    console.log("Experience Ratio:", experienceRatio); // 경험치 비율 확인

    const opacity = minOpacity + (maxOpacity - minOpacity) * experienceRatio;
    console.log("Final Opacity:", opacity); // 최종 광량 값 확인

    return Math.min(Math.max(opacity, minOpacity), maxOpacity);
  };
  
  useEffect(() => {
    // 사용자 레벨 데이터를 저장
    if (home && home.data && home.data.user.level) {
      saveData(home.data.user.level);
    }
    console.log("levelsData:", levelsData);
  }, [home]);

  // useEffect(() => {
  //   return () => {
  //     // 컴포넌트가 언마운트될 때 타이머 초기화
  //     if (timerRef.current) {
  //       clearTimeout(timerRef.current);
  //     }
  //   };
  // }, []);

  // 사용자와 팀원의 레벨 정보를 별에 배치
  const enhancedStarData = starData.map((star, index) => {
    if (index === 0) {
      const opacity = calculateOpacityByLevel(home.data.user.level);
      console.log("User Star Opacity:", opacity); // 사용자 별의 광량 확인
      return {
        ...star,
        level: home.data.user.level,
        isActive: true,
        opacity,
      };
    } else {
      const teamLevel = home.data.team.levels[index] || null;
      const opacity = calculateOpacityByLevel(teamLevel);
      console.log(`Team Star ${index} Opacity:`, opacity); // 팀원 별의 광량 확인
      return {
        ...star,
        level: teamLevel,
        isActive: !!teamLevel,
        opacity,
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

    if (isPageOption === 0 && isPopupOpen) {
      setIsActiveSpaceMan(!isActiveSpaceMan);
    }
    handleBubbleClick();
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
          position: "absolute",
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
            {isActiveSpaceMan && star.id === myStarId && (
              <SpaceManContiner
                style={{
                  position: "absolute",
                  width: "20px", // 별 크기보다 약간 크게
                  height: `10px`,
                  left: `${star.x}px`,
                  top: `${star.y - 10}px`, // 별 위쪽에 위치
                  transform: "translate(-50%, -50%)",
                }}
                onClick={handleBubbleClick}
              >
                {isActiveBubble && (
                  <SpaceManBubble style={{}}>
                    <img src={Bubble_Icon} alt="" />
                    <div>
                      <p>힘드시죠? </p>
                      <p>항상 고생해주셔서 감사합니다!</p>
                    </div>
                  </SpaceManBubble>
                )}

                <SpaceMan
                  src={spaceMan}
                  alt="Space Man"
                  style={{
                    width: `${star.size - 28}px`, // 별 크기보다 약간 크게
                    height: `${star.size - 26}px`,
                  }}
                />
              </SpaceManContiner>
            )}
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
  // border: 1px solid rgb(117, 64, 64);
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

  // border: 1px solid rgb(117, 113, 64);
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

const SpaceManContiner = styled.div`
  width: 1px;
  height: 1px;

  // border: 1px solid rgb(117, 113, 64);
  z-index: 1000;

  gap: 0.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SpaceMan = styled.img``;

const SpaceManBubble = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > img {
    object-fit: cover; /* 이미지 크기 조정 */
    width: 9px;
  }
  > div {
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center; /* 텍스트를 중앙 정렬 */

    padding-top: 0.28px;

    > p {
      color: white; /* 텍스트 색상 */
      font-size: 0.5px; /* 텍스트 크기 */
      font-weight: bold; /* 텍스트 굵기 */
      z-index: 1; /* 텍스트를 이미지 위에 표시 */
      text-align: center; /* 텍스트를 중앙 정렬 */

      color: var(--Primary-primary-10, #59543a);
    }
  }
`;

const SpaceManButton = styled.div`
  width: 20px;
  height: 20px;
  background: rgba(217, 17, 17, 0);
  margin: auto;
  z-index: 1000;
`;
