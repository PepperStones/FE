import React from "react";
import { useLocation, Link } from 'react-router-dom';
import styled from "styled-components";

const BottomNav = ({ }) => {
    const location = useLocation(); // 현재 경로를 가져옴

    return (
        <Nav>
            <NavItem className={location.pathname === '/home' ? 'active' : ''}>
                <NavLink to="/home">
                    <IconHome src={location.pathname === '/home' ? null : null} />
                    <p>홈</p>
                </NavLink>
            </NavItem>
            <NavItem className={location.pathname === '/quest' ? 'active' : ''}>
                <NavLink to="/quest">
                    <IconQuest src={location.pathname === '/quest' ? null : null} />
                    <p>퀘스트</p>
                </NavLink>
            </NavItem>
            <NavItem className={location.pathname === '/board' ? 'active' : ''}>
                <NavLink to="/board">
                    <IconBoard src={location.pathname === '/board' ? null : null} />
                    <p>게시판</p>
                </NavLink>
            </NavItem>
            <NavItem className={location.pathname === '/mypage' ? 'active' : ''}>
                <NavLink to="/mypage">
                    <IconMypage src={location.pathname === '/mypage' ? null : null} />
                    <p>나의 정보</p>
                </NavLink>
            </NavItem>
        </Nav>
    );
};

export default BottomNav;

const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: white;
    border-top: 1px solid #ccc;
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
    color: var(--grey-grey-5, #9E9E9E);
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    border-radius: 10px;
    width: 80%;
    height: 100%;
    user-select: none;

    &.active {
        color: #6A39C0; /* 활성화된 텍스트 색상 */
    }
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
`;

const IconHome = styled.img`
    width: 27px;
    height: 19px;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const IconQuest = styled.img`
    width: 27px;
    height: 19px;
    margin-top: 10px;
    margin-bottom: 7px;
`;

const IconBoard = styled.img`
    width: 22px;
    height: 22px;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const IconMypage = styled.img`
    width: 22px;
    height: 22px;
    margin-top: 10px;
    margin-bottom: 5px;
`;