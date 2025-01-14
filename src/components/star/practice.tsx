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

//별 위치
const starData = [
  { id: 1, x: 0, y: 0, size: 30 },
  { id: 2, x: -15, y: -79, size: 30 },
  { id: 3, x: -58, y: -120, size: 30 },
  { id: 4, x: -116, y: -103, size: 30 },
  { id: 5, x: -77, y: -206, size: 30 },
  { id: 6, x: -48, y: -228, size: 30 },
  { id: 7, x: -17, y: -203, size: 30 },
  { id: 8, x: +21, y: -235, size: 30 },
  { id: 9, x: 41, y: -158, size: 30 },
  { id: 10, x: 88, y: -108, size: 30 },
  { id: 11, x: 226, y: -153, size: 30 },
];

// 라인 위치
const lineData = [
  { x1: 0, y1: 0, x2: -15, y2: -79 },
  { x1: -15, y1: -79, x2: -58, y2: -120 },
  { x1: -58, y1: -120, x2: -116, y2: -103 },
  { x1: -116, y1: -103, x2: -77, y2: -206 },
  { x1: -77, y1: -206, x2: -48, y2: -228 },
  { x1: -48, y1: -228, x2: -17, y2: -203 },
  { x1: -17, y1: -203, x2: +21, y2: -235 },
  { x1: +21, y1: -235, x2: 41, y2: -158 },
  { x1: 41, y1: -158, x2: 88, y2: -108 },
  { x1: 21, y1: -235, x2: 226, y2: -153 },
];

// StarContainer 유동적 크기 조정 함수
const calculateBounds = (
  starData: Array<{ x: number; y: number; size: number }>
) => {
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  starData.forEach((star) => {
    const halfSize = star.size / 2;
    minX = Math.min(minX, star.x - halfSize);
    minY = Math.min(minY, star.y - halfSize);
    maxX = Math.max(maxX, star.x + halfSize);
    maxY = Math.max(maxY, star.y + halfSize);
  });

  return { minX, minY, width: maxX - minX, height: maxY - minY };
};

const StarAnimation: React.FC<HomePage> = ({
  isPageOption,
  handleIconPage,
  handlePrevPage,
  handleNextPage,
  isPopupOpen,
  setIsPageOption,
  home,
}) => {
  const [isActiveSpaceMan, setIsActiveSpaceMan] = useState(false);
  const [isActiveBubble, setIsActiveBubble] = useState(false); // 말풍선 활성화 상태
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조
  const [bubblePosition, setBubblePosition] = useState<{
    x: number;
    y: number;
  } | null>(null); // 말풍선 위치
  const [loading, setLoading] = useState(false);
  const [bounds, setBounds] = useState({
    minX: 0,
    minY: 0,
    width: 0,
    height: 0,
  });

  const [containerSize, setContainerSize] = useState({
    width: 1, // 초기값 1로 설정
    height: 1,
  });

  const [savedData, setSavedData] = useState<
    Array<{ level: string; total_experience: number | null }>
  >([]);

  // 배경 이미지 드래그를 위한 spring 설정
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // 드래그 범위 제한을 위한 상태
  const [dragBounds, setDragBounds] = useState({
    minX: -200, // 더 큰 음수값으로 변경
    maxX: 200, // 더 큰 양수값으로 변경
    minY: -200, // 더 큰 음수값으로 변경
    maxY: 200, // 더 큰 양수값으로 변경
  });

  // 통합된 드래그 바인딩
  const bindDrag = useDrag(({ down, movement: [mx, my], cancel }) => {
    if (isPageOption !== 2) {
      cancel();
      return;
    }

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;

    // 드래그 범위를 컨테이너 크기의 2배로 설정
    const dragLimit = {
      minX: -containerWidth,
      maxX: containerWidth,
      minY: -containerHeight,
      maxY: containerHeight,
    };

    const newX = Math.max(dragLimit.minX, Math.min(dragLimit.maxX, mx));
    const newY = Math.max(dragLimit.minY, Math.min(dragLimit.maxY, my));

    api.start({
      x: newX / 2,
      y: newY / 4,
      immediate: down,
    });
  });
  // 컨테이너 크기가 변경될 때 드래그 범위 업데이트
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      setDragBounds({
        minX: -containerWidth, // 왼쪽으로 20% 까지 드래그 가능
        maxX: containerWidth, // 오른쪽으로 20% 까지 드래그 가능
        minY: -containerHeight, // 위로 20% 까지 드래그 가능
        maxY: containerHeight, // 아래로 20% 까지 드래그 가능
      });
    }
  }, [containerSize]);

  // 드래그 제스처 정의
  const bind = useDrag(({ offset: [x, y] }) => {
    if (isPageOption === 2) {
      // page2일 때만 드래그 활성화
      api.start({ x, y });
    }
  });

  const myStarId = 1; // "내 별"의 ID

  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const originalContainerWidth = 363; // 디자인 기준 너비
  const originalContainerHeight = 800; // 디자인 기준 높이

  useEffect(() => {
    const calculatedBounds = calculateBounds(starData);
    setBounds(calculatedBounds);
  }, []);

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
        x1:
          (line.x1 / originalContainerWidth) * containerSize.width -
          bounds.minX,
        y1:
          (line.y1 / originalContainerHeight) * containerSize.height -
          bounds.minY,
        x2:
          (line.x2 / originalContainerWidth) * containerSize.width -
          bounds.minX,
        y2:
          (line.y2 / originalContainerHeight) * containerSize.height -
          bounds.minY,
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
      scale = isPopupOpen ? 17 : 12;
    }

    if (isPageOption === 1) {
      translateX = containerSize.width / 2 - myStar.x - 50;
      translateY = containerSize.height / 2 - myStar.y + 130;
      scale = 0.9;

      if (isPopupOpen) {
        translateX = containerSize.width / 2 - myStar.x;
        translateY = containerSize.height / 2 - myStar.y + 130;
        scale = 2;
      }
    }

    if (isPageOption === 2) {
      // 페이지 2일 때 중앙 정렬을 위한 계산
      scale = 0.35;
      translateX = bounds.minX - 40; // UnifiedContainer가 이미 중앙에 위치하므로 추가 이동 불필요
      translateY = bounds.minY + 80;

      if (isPopupOpen) {
        scale = 1;
        translateY = containerSize.height / 4; // 팝업 열렸을 때 약간 위로 이동
      }
    }

    return { translateX, translateY, scale };
  };
  //myStar.x - bounds.minX =>Star 컨테이너 안에서 별들의 상대적 위치 상대적으로 위치
  return (
    <Container ref={containerRef}>
      {isPageOption === 2 ? (
        <UnifiedContainer
          {...bindDrag()}
          style={{
            x,
            y,
            display: "block",
            touchAction: "none",
            transform: `translate(-50%, -50%)`, // 중앙 정렬을 위한 transform 추가
          }}
        >
          <ConstellationImage src={allStar} alt="별자리" />
          <StarContainer
            as={motion.div}
            style={{
              position: "absolute",
              left: "50%", // 중앙 정렬
              top: "50%", // 중앙 정렬
              width: `${bounds.width}px`,
              height: `${bounds.height}px`,
              transform: "translate(-50%, -50%)", // 중앙 정렬을 위한 transform
            }}
            animate={getAnimationValues(containerSize)}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <StarDiv>
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
                      strokeDasharray: "4 2", // 점선 스타일 추가
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
                        top: `${star.y - 15}px`, // 별 위쪽에 위치
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
                      left: `${star.x - bounds.minX}px`,
                      top: `${star.y - bounds.minY}px`,
                      opacity: star.opacity, // 활성화 여부에 따른 광량 적용
                      filter: star.isActive ? "none" : "grayscale(100%)", // 비활성화된 별은 흑백 처리
                    }}
                    onClick={() => handleStarClick(star.id)}
                  />
                  {star.id === myStarId && (
                    <TagContainer
                      as={motion.div}
                      style={{
                        left: `${myStar.x - bounds.minX - 25}px`,
                        top: `${myStar.y - bounds.minY + 25}px`,
                      }}
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
            </StarDiv>
          </StarContainer>
        </UnifiedContainer>
      ) : (
        <StarContainer
          as={motion.div}
          style={{
            position: "absolute",
            transformOrigin: `${myStar.x - bounds.minX}px ${
              myStar.y - bounds.minY
            }px`,
            left: `${bounds.minX}px`,
            top: `${bounds.minY}px`,
            width: `${bounds.width}px`,
            height: `${bounds.height}px`,
          }}
          animate={getAnimationValues(containerSize)}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <StarDiv>
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
                    strokeDasharray: "4 2", // 점선 스타일 추가
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
                      top: `${star.y - 15}px`, // 별 위쪽에 위치
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
                    left: `${star.x - bounds.minX}px`,
                    top: `${star.y - bounds.minY}px`,
                    opacity: star.opacity, // 활성화 여부에 따른 광량 적용
                    filter: star.isActive ? "none" : "grayscale(100%)", // 비활성화된 별은 흑백 처리
                  }}
                  onClick={() => handleStarClick(star.id)}
                />
                {star.id === myStarId && (
                  <TagContainer
                    as={motion.div}
                    style={{
                      left: `${myStar.x - bounds.minX - 25}px`,
                      top: `${myStar.y - bounds.minY + 25}px`,
                    }}
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
          </StarDiv>
        </StarContainer>

        // {isPageOption === 2 && (
        //   <TagContainer
        //     as={motion.div}
        //     animate={{
        //       opacity: isPageOption === 2 ? 1 : 0, // 팝업 열림 여부에 따라 투명도 조절
        //       left: isPopupOpen ? "40%" : "35%", // StarContainer의 중앙
        //       top: isPopupOpen ? "81%" : "66%", // 중앙 아래에 위치
        //       scale: isPopupOpen ? 1.5 : 1, // 크기 변화
        //     }}
        //     transition={{
        //       duration: 1, // 애니메이션 지속 시간
        //       ease: "easeInOut", // 자연스러운 이징 효과
        //     }}
        //   >
        //     <OurStarTagImage src={tagImage} alt="Tag" />
        //     <TagText className="caption-sm-300">우리 별자리</TagText>
        //   </TagContainer>
        // )}
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

  // border: 1px solid rgb(117, 64, 64);
`;
const AnimatedConstellationImage = styled(animated.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  touch-action: none;
  will-change: transform;
`;

const StarContainer = styled(motion.div)`
  backface-visibility: hidden; /* 렌더링 최적화 */
  border: 1px solid rgb(117, 64, 64);

  position: absolute;
  transform-origin: center center; /* 중앙을 기준으로 변환 */
`;

const Star = styled.img<{ size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  transform: translate(-50%, -50%);

  border: 1px solid rgb(117, 113, 64);
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
  color: var(--gray-100);
  pointer-events: none;
`;

const SpaceManContiner = styled.div`
  width: 1px;
  height: 1px;

  z-index: 1000;

  gap: 0.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpaceMan = styled.img`
  position: absolute;
  top: 35%;
`;

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

const StarDiv = styled.div`
  border: 1px solid rgb(117, 64, 64);
`;

// Styled Components
const AnimatedStarContainer = styled(animated.div)`
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

// 별자리 이미지 스타일링
const ConstellationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// Styled components update
const UnifiedContainer = styled(animated.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  left: 50%; // 중앙 정렬을 위해 변경
  top: 50%; // 중앙 정렬을 위해 변경
  user-select: none;
  touch-action: none;
  will-change: transform;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;
