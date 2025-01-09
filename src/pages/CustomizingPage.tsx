
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'

import BackIcon from "../assets/images/left_arrow.png";
import ProfileImg from '../assets/images/reward/star_skin_1.png'

import Lock from '../assets/images/reward/reward_lock.png'

import StarSkin1 from '../assets/images/reward/star_skin_1.png'
import StarSkin2 from '../assets/images/reward/star_skin_2.png'
import StarSkin3 from '../assets/images/reward/star_skin_3.png'
import StarSkin4 from '../assets/images/reward/star_skin_4.png'
import StarSkin5 from '../assets/images/reward/star_skin_5.png'
import StarSkin6 from '../assets/images/reward/star_skin_6.png'

import StarDeco1 from '../assets/images/reward/star_deco_1.png'

import StarEffect1 from '../assets/images/reward/star_effect_1.png'

// 탭별 데이터
const tabData = {
    '별 스킨': [
        { id: 1, image: StarSkin1, locked: false },
        { id: 2, image: StarSkin2, locked: false },
        { id: 3, image: StarSkin3, locked: false },
        { id: 4, image: StarSkin4, locked: true },
        { id: 5, image: StarSkin5, locked: true },
        { id: 6, image: StarSkin6, locked: true },
    ],
    '별 장식': [
        { id: 1, image: StarDeco1, locked: false },
        { id: 2, image: StarDeco1, locked: true },
        { id: 3, image: StarDeco1, locked: true },
        { id: 4, image: StarDeco1, locked: true },
        { id: 5, image: StarDeco1, locked: true },
        { id: 6, image: StarDeco1, locked: true },
    ],
    '별 효과': [
        { id: 1, image: StarEffect1, locked: false },
        { id: 2, image: StarEffect1, locked: true },
        { id: 3, image: StarEffect1, locked: true },
        { id: 4, image: StarEffect1, locked: true },
        { id: 5, image: StarEffect1, locked: true },
        { id: 6, image: StarEffect1, locked: true },
    ],
};

function CustomizingPage() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('별 스킨');

    const handleBackIconClick = () => {
        navigate('/mypage');
    };

    const NavItem = {
        icon: BackIcon,
        iconWidth: Number(11),
        iconHeight: Number(16),
        text: "나의 별 꾸미기",
        clickFunc: handleBackIconClick,
    };

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName); // 클릭된 탭을 활성화
    };

    return (

        <CustomizingPageContainer>
            <TopNav lefter={NavItem} center={NavItem} righter={null} />

            <StarCustomizingContainer>
                <MainStar src={ProfileImg} alt="메인 별 스킨" />
                <TabMenu>
                    <TabItem active={activeTab === '별 스킨'} onClick={() => handleTabClick('별 스킨')}>
                        별 스킨
                    </TabItem>
                    <TabItem active={activeTab === '별 장식'} onClick={() => handleTabClick('별 장식')}>
                        별 장식
                    </TabItem>
                    <TabItem active={activeTab === '별 효과'} onClick={() => handleTabClick('별 효과')}>
                        별 효과
                    </TabItem>
                </TabMenu>

                {/* 현재 활성화된 탭의 콘텐츠를 렌더링 */}
                <StarSkinsContainer>
                    {tabData[activeTab].map((item) => (
                        <StarSkin key={item.id} locked={item.locked}>
                            {item.locked && (
                                <>
                                    <LockOverlay />
                                    <LockIcon src={Lock} alt="잠금 아이콘" />
                                </>
                            )}
                            <StarSkinImage src={item.image} alt={`아이템 ${item.id}`} />
                        </StarSkin>
                    ))}
                </StarSkinsContainer>
            </StarCustomizingContainer>

            <FooterNav />
        </CustomizingPageContainer>
    );
}

export default CustomizingPage;

const CustomizingPageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StarCustomizingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 52px;
`;

const MainStar = styled.img`
    width: 150px;
    height: 150px;
`;

const TabMenu = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    border-bottom: 1px solid var(--gray-40);

    gap: 25px;
    margin-top: 53px;
`;

const TabItem = styled.div<{ active?: boolean }>`
    padding: 10px 20px;
    font-size: 1rem;
    color: ${({ active }) => (active ? 'var(--primary-70)' : 'var(--gray-40)')};
    border-bottom: ${({ active }) => (active ? '1px solid var(--primary-70)' : 'none')};
`;

const StarSkinsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3개씩 한 행에 배치 */

    gap: 10px;
    margin-top: 20px;
`;

const SkinDivider = styled.div`
    display: flex;
    flex-direction: row;

    gap: 12px;
`;

const StarSkin = styled.div<{ locked?: boolean }>`
    position: relative;

    width: 96px;
    height: 96px;
    border-radius: 15px;
    border: 1px solid var(--sub-40);
    background: var(--sub-20);

    padding: 7px;

    ${({ locked }) =>
        locked &&
        `
        pointer-events: none; /* 클릭 방지 */
    `}
`;

const StarSkinImage = styled.img`
    width: 100%;
    height: 100%;
`;

const LockOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.5); /* 어두운 오버레이 */
    backdrop-filter: blur(4px); /* 블러 효과 */
    border-radius: 15px; /* 부모와 동일한 border-radius */
`;

const LockIcon = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    width: 58px; /* 자물쇠 크기 조정 */
    height: 58px; /* 비율 유지 */
`;