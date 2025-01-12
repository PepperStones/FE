import React from "react";
import styled from "styled-components";
import SpeechBubbleImage from "../../assets/images/speech_bubble_1.png";
import { motion } from "framer-motion";

interface SpeechBubbleProps {
  text: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text }) => (
  <TagContainer
    as={motion.div}
    // animate={{
    //   opacity: isPageOption === 1 ? 1 : 0,
    //   scale: isPageOption === 1 ? 1 : 0.8,
    // }}
    transition={{
      duration: 0.8, // 애니메이션 지속 시간
      ease: "easeInOut", // 자연스러운 이징 효과
    }}
  >
    <TagImage src={SpeechBubbleImage} alt="Tag" />
    <TagText className="caption-sm-300">{text}</TagText>
  </TagContainer>
);

export default SpeechBubble;
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;

  position: relative;
  padding-top: 4px;
  padding-bottom: 4px;
  width: fit-content; /* 컨텐츠 크기에 맞게 자동으로 조절 */
`;

const TagImage = styled.img`
  height: 20px; /* 높이는 고정 */
  width: 100%; /* 텍스트에 맞게 가로 크기 조정 */
  object-fit: contain; /* 텍스트 길이에 맞게 이미지를 축소/확대 */
  position: absolute; /* 텍스트와 이미지가 겹치도록 설정 */
  z-index: 0; /* 텍스트 위에 표시되지 않도록 뒤로 보냄 */
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
