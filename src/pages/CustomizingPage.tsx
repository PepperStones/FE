
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

import { fetchStarCustomization, StarCustomizationResponse, updateStarCustomization } from "../api/user/MypageApi.ts";

const slideFwdBottom = keyframes`
  0% {
    transform: scale(0.6) translateZ(0) translateY(-100px);
  }
  100% {
    transform: scale(1) translateZ(160px) translateY(0px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const tabOffsets = [0, 120, 240]; // 슬라이드 양

// 탭별 데이터
const tabData = {
    '별 스킨': [
        { id: 0, image: StarSkin1, locked: false },
        { id: 1, image: StarSkin2, locked: false },
        { id: 2, image: StarSkin3, locked: false },
        { id: 3, image: StarSkin4, locked: true },
        { id: 4, image: StarSkin5, locked: true },
        { id: 5, image: StarSkin6, locked: true },
    ],
    '별 장식': [
        { id: 0, image: StarDeco1, locked: false },
        { id: 1, image: StarDeco1, locked: true },
        { id: 2, image: StarDeco1, locked: true },
        { id: 3, image: StarDeco1, locked: true },
        { id: 4, image: StarDeco1, locked: true },
        { id: 5, image: StarDeco1, locked: true },
    ],
    '별 효과': [
        { id: 0, image: StarEffect1, locked: false },
        { id: 1, image: StarEffect1, locked: true },
        { id: 2, image: StarEffect1, locked: true },
        { id: 3, image: StarEffect1, locked: true },
        { id: 4, image: StarEffect1, locked: true },
        { id: 5, image: StarEffect1, locked: true },
    ],
};

function CustomizingPage() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('별 스킨');
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [starData, setStarData] = useState<StarCustomizationResponse['data'] | null>(null);

    const [profileImg, setProfileImg] = useState(ProfileImg); // 프로필 이미지 URL
    const [selectedSkin, setSelectedSkin] = useState<number | null>(null); // 선택된 스킨 ID
    const [selectedDeco, setSelectedDeco] = useState<number | null>(null); // 선택된 장식 ID
    const [selectedEffect, setSelectedEffect] = useState<number | null>(null); // 선택된 효과 ID

    useEffect(() => {
        const loadStarData = async () => {
            try {
                const response = await fetchStarCustomization();
                setStarData(response.data);

                // Map the fetched data to selected IDs
                const skinMapping: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5, S6: 6 };
                const decoMapping: Record<string, number> = { D0: 0, D1: 1, D2: 2, D3: 3, D4: 4, D5: 5, D6: 6 };
                const effectMapping: Record<string, number> = { E0: 0, E1: 1, E2: 2, E3: 3, E4: 4, E5: 5, E6: 6 };

                setSelectedSkin(skinMapping[response.data.skin]);
                setSelectedDeco(decoMapping[response.data.decoration]);
                setSelectedEffect(effectMapping[response.data.effect]);

            } catch (error: any) {
                console.error('Error loading star customization:', error);
            }
        };

        loadStarData();
    }, []);

    useEffect(() => {
        // 샘플 데이터를 상태에 설정
        setSelectedSkin(selectedSkin);
        setSelectedDeco(selectedDeco);
        setSelectedEffect(selectedEffect);
    }, []);

    const handleBackIconClick = () => {
        navigate('/mypage', { state: { fromCustomize: true } });
    };

    const NavItem = {
        icon: BackIcon,
        iconWidth: Number(11),
        iconHeight: Number(16),
        text: "나의 별 꾸미기",
        clickFunc: handleBackIconClick,
    };

    const handleTabClick = (tabName: string, index: number) => {
        setActiveTab(tabName); // 클릭된 탭
        setActiveTabIndex(index); // 활성화된 탭의 인덱스
    };

    // 아이템 클릭 이벤트 처리 함수
    const handleItemClick = async (id: number) => {
        try {
            if (activeTab === '별 스킨') {
                const updatedSkin = `S${id}`;
                setSelectedSkin(id); // Update selected skin ID

                const response = await updateStarCustomization(updatedSkin, `D${selectedDeco}`, `E${selectedEffect}`);
                setProfileImg(response.data);
            }
            if (activeTab === '별 장식') {
                const updatedDeco = `D${id}`;
                setSelectedDeco(id); // Update selected skin ID

                const response = await updateStarCustomization(`S${selectedSkin}`, updatedDeco, `E${selectedEffect}`);
                setProfileImg(response.data);
            }
            if (activeTab === '별 효과') {
                const updatedEffect = `E${id}`;
                setSelectedEffect(id); // Update selected skin ID

                const response = await updateStarCustomization(`S${selectedSkin}`, `D${selectedDeco}`, updatedEffect);
                setProfileImg(response.data);
            }
        } catch (error) {
            console.error('Error updating star customization:', error);
            alert(error.message || '별 커스터마이징 업데이트에 실패했습니다.');
        }
    };

    return (

        <CustomizingPageContainer>
            <TopNav lefter={NavItem} center={NavItem} righter={null} />

            <StarCustomizingContainer>
                <MainStar src={ProfileImg} alt="메인 별 스킨" />

                <TabMenu activeIndex={activeTabIndex}>
                    <TabItem active={activeTab === '별 스킨'} onClick={() => handleTabClick('별 스킨', 0)}>
                        별 스킨
                    </TabItem>
                    <TabItem active={activeTab === '별 장식'} onClick={() => handleTabClick('별 장식', 1)}>
                        별 장식
                    </TabItem>
                    <TabItem active={activeTab === '별 효과'} onClick={() => handleTabClick('별 효과', 2)}>
                        별 효과
                    </TabItem>
                </TabMenu>

                <StarSkinsContainer>
                    {tabData[activeTab].map((item) => (
                        <StarSkin
                            key={item.id}
                            selected={
                                (activeTab === '별 스킨' && selectedSkin === item.id) ||
                                (activeTab === '별 장식' && selectedDeco === item.id) ||
                                (activeTab === '별 효과' && selectedEffect === item.id)
                            }
                            onClick={() => handleItemClick(item.id)}
                            locked={item.locked}>
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

    animation: ${slideFwdBottom} 0.75s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const TabMenu = styled.div<{ activeIndex: number }>`
    display: flex;
    justify-content: center;
    position: relative;

    width: 100%;
    border-bottom: 1px solid var(--gray-40);

    gap: 35px;
    margin-top: 53px;

    /* 슬라이드 애니메이션 */
    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 20px;
        height: 2px;
        width: 110px; /* 각 탭의 너비 */
        background-color: var(--primary-70);
        transform: translateX(${({ activeIndex }) => `${tabOffsets[activeIndex]}px`});
        transition: transform 0.2s ease-in-out;
    }
`;

const TabItem = styled.div<{ active?: boolean }>`
    padding: 10px 20px;
    font-size: 1rem;
    color: ${({ active }) => (active ? 'var(--primary-70)' : 'var(--gray-40)')};
`;

const StarSkinsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3개씩 한 행에 배치 */

    gap: 12px;
    margin-top: 20px;

    animation: ${fadeIn} 0.5s ease-in-out;
`;

const StarSkin = styled.div<{ locked?: boolean, selected?: boolean }>`
    position: relative;

    width: 110px;
    height: 110px;
    border-radius: 15px;
    border: ${({ selected }) => (selected ? '1px solid var(--gray-100)' : '1px solid var(--sub-40)')};
    background: var(--sub-20);

    padding: 7px;

    ${({ locked }) => locked && `pointer-events: none; /* 클릭 방지 */ `}
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