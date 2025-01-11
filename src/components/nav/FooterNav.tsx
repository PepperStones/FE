import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

import Home from "../../assets/images/gray_star.png";
import ActHome from "../../assets/images/yellow_star.png";
import Quest from "../../assets/images/gray_task_add.png";
import ActQuest from "../../assets/images/yellow_task_add.png";
import Board from "../../assets/images/gray_pin_paper.png";
import ActBoard from "../../assets/images/yellow_pin_paper.png";
import Mypage from "../../assets/images/gray_person_circle.png";
import ActMypage from "../../assets/images/yellow_person_circle.png";

import Synchronize from "../../assets/images/admin/gray_arrow_cycle.png"
import ActSynchronize from "../../assets/images/admin/yellow_arrow_cycle.png"

/* lefter, center, righter 모두 인터페이스 동일
interface FooterNavProps {
    isAdmin?: boolean // 어드민 계정 여부
}
*/

const BottomNav = ({ isAdmin = false }) => {
  const location = useLocation(); // 현재 경로를 가져옴

  return (
    <Nav>
      {isAdmin ?
        <>
          <NavItem className={location.pathname.startsWith("/member") ? "active" : ""}>
            <NavLink to="/member">
              <IconQuest src={location.pathname.startsWith("/member") ? ActMypage : Mypage} />
              <p>구성원</p>
            </NavLink>
          </NavItem>
          <NavItem
            className={location.pathname.startsWith("/admin-board") ? "active" : ""}
          >
            <NavLink to="/admin-board">
              <IconBoard
                src={location.pathname.startsWith("/admin-board") ? ActBoard : Board}
              />
              <p>게시글</p>
            </NavLink>
          </NavItem>
          <NavItem className={location.pathname.startsWith("/synchro") ? "active" : ""}>
            <NavLink to="/synchro">
              <IconMypage
                src={location.pathname.startsWith("/synchro") ? ActSynchronize : Synchronize}
              />
              <p>동기화</p>
            </NavLink>
          </NavItem>
        </>
        :
        <>
          <NavItem className={location.pathname.startsWith("/home") ? "active" : ""}>
            <NavLink to="/home">
              <IconHome
                src={location.pathname.startsWith("/home") ? ActHome : Home}
              />
              <p>홈</p>
            </NavLink>
          </NavItem>
          <NavItem className={location.pathname.startsWith("/quest") ? "active" : ""}>
            <NavLink to="/quest">
              <IconQuest src={location.pathname.startsWith("/quest") ? ActQuest : Quest} />
              <p>퀘스트</p>
            </NavLink>
          </NavItem>
          <NavItem
            className={location.pathname.startsWith("/board") ? "active" : ""}
          >
            <NavLink to="/board">
              <IconBoard
                src={location.pathname.startsWith("/board") ? ActBoard : Board}
              />
              <p>게시판</p>
            </NavLink>
          </NavItem>
          <NavItem className={location.pathname.startsWith("/mypage") ? "active" : ""}>
            <NavLink to="/mypage">
              <IconMypage
                src={location.pathname.startsWith("/mypage") ? ActMypage : Mypage}
              />
              <p>나의 정보</p>
            </NavLink>
          </NavItem>
        </>
      }

    </Nav>
  );
};

export default BottomNav;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  height: 100px;

  background-color: var(--sub-20);
  border: 1px solid var(--sub-40);

  box-shadow: 0px 0px 9px 6px rgba(0, 0, 0, 0.03);
  border-radius: 20px 20px 0px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--grey-grey-5, #9e9e9e);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 10px;
  width: 80%;
  height: 100%;
  user-select: none;

  &.active {
    color: var(--primary-70); /* 활성화된 텍스트 색상 */
  }

  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  width: inherit;
  height: inherit;

  & > p {
    margin: 0;
    padding: 0;
  }
  p {
    margin-bottom: 32px;
  }
`;

const IconHome = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 19px;
  margin-bottom: 5px;
`;

const IconQuest = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 19px;
  margin-bottom: 1px;
`;

const IconBoard = styled.img`
  width: 24px;
  height: 22px;
  margin-top: 21px;
  margin-bottom: 5px;
`;

const IconMypage = styled.img`
  width: 22px;
  height: 22px;
  margin-top: 19px;
  margin-bottom: 5px;
`;
