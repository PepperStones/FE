import React from "react";
import styled from "styled-components";

// lefter, center, righter 모두 인터페이스 동일
interface lefter {
    icon: string;
    text: string;
    clickFunc: () => void;
}


const TopNav = ({ lefter, center, righter }) => {

    return (
        <NavContainer>
            <ImageContainer onClick={lefter ? lefter.clickFunc : undefined}>
                {lefter ?
                    lefter.icon ? (
                        <img src={lefter ? lefter.icon : undefined} alt="LeftIcon" />
                    ) : lefter.text ? (
                        <span>{lefter ? lefter.text : undefined}</span>
                    ) : null
                    : undefined}
            </ImageContainer>

            <CenterContent className="Podo-Ticket-Headline-H3">{center ? center.text : null}</CenterContent>

            <ImageContainer onClick={righter ? righter.clickFunc : undefined}>
                {righter ?
                    righter.icon ? (
                        <img src={righter ? righter.icon : undefined} alt="RightIcon" />
                    ) : righter.text ? (
                        <span>{righter ? righter.text : undefined}</span>
                    ) : null
                    : undefined}

            </ImageContainer>
        </NavContainer>
    );
};

export default TopNav;

const NavContainer = styled.nav`
display: flex;
justify-content: space-around;
align-items: center;
z-index: 1000;

height: 71px;
border: none;
background: #FFF;

user-select: none; /* 텍스트 선택 방지 */
-webkit-user-select: none; /* Safari에서 드래그 방지 */
-moz-user-select: none; /* Firefox에서 드래그 방지 */
`;

const CenterContent = styled.div`
    display: flex;
    justify-content: center;
    text-align: center; /* 중앙 정렬 */

    width: 210px;

color: #14191E;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 120% */
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px; /* 이미지 크기 조정 */
    height: 40px; /* 이미지 크기 조정 */

    img {
        max-width: 20px;
        max-height: 20px;
    }
`;