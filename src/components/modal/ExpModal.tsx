import React from "react";
import styled from "styled-components";
import levels from "../../assets/images/data/levels.json"; // JSON 데이터 가져오기

import grayStarIcon from "../../assets/images/gray-star-line-duotone.png";
import grayLevelIcon from "../../assets/images/icon-park-outline_level.png";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 열리지 않았을 때 아무것도 렌더링하지 않음

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>레벨별 필요 경험치 구간표</h1>
        </ModalHeader>
        <ModalTable>
          <TableHeader className="caption-sm-300">
            <span>
              <img src={grayLevelIcon} alt=""></img>
              <p>레벨</p>
            </span>
            <div></div>
            <span>
              {" "}
              <img src={grayStarIcon} alt=""></img>
              <p>총 필요 경험치</p>
            </span>
          </TableHeader>
          <TableBody>
            {levels.map((level) => (
              <Row className="caption-sm-200 " key={level.level}>
                <span>{level.level}</span>
                <span>{level.required_experience.toLocaleString()}</span>
              </Row>
            ))}
          </TableBody>
        </ModalTable>
        <ModalFooter>
          <CloseButton className="text-lg-300" onClick={onClose}>
            확인
          </CloseButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ExpModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* 배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 85%;
  max-width: 400px;
  background: var(--sub-20);
  border-radius: 15px;
  padding: 25px 28px 20px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;
  > h1 {
    font-size: 18px;
    color: var(--gray-100);
    text-align: center;
  }
`;

const ModalTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: flex;
  padding: 10px 0;
  font-weight: bold;

  color: var(--Sub-sub-80, #cacfe0);

  border-radius: 15px;
  background: var(--Sub-sub-30, #333b5e);

  > div {
    width: 1px;
    height: 14px;
    background: var(--sub-40);
  }

  > span {
    display: flex;
    flex-direction: row;
    align-items: center; /* 아이템 수직 중앙 정렬 */
    justify-content: center; /* 아이템 수평 중앙 정렬 */
    flex: 1;

    > img {
      width: 16px;
      height: 16px;
    }
    > p {
      margin-left: 6px; /* 텍스트와 아이콘 간격 */
    }
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 10px;
  border-radius: 15px;
  background: var(--Sub-sub-30, #333b5e);

  padding: 7px 12px;

  > span {
    padding: 7px 0;
  }
`;

const Row = styled.div`
  display: flex;

  padding: 8px 0;
  color: var(--gray-80);

  &:not(:last-child) {
    border-bottom: 1px solid var(--sub-40);
  }

  > span {
    flex: 1;
    text-align: center;
    position: relative;
  }
  > span:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 14px;
    background: var(--sub-40); /* 세로줄 색상 */
  }
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  background: var(--primary-70);
  color: var(--Grayscale-gray-0, #313131);
  width: 100%;
  height: 50px;

  border: none;
  border-radius: 10px;
  padding: 10px 20px;

  cursor: pointer;

  &:hover {
    background: var(--primary-80);
  }
`;
