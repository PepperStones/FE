
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'

import BackIcon from "../assets/images/left_arrow.png";
import ProfileImg from '../assets/images/reward/star_skin_1.png'

import Lock from '../assets/images/reward/reward_lock.png'

import StarSkin0 from '../assets/images/reward/star_skin_1.png'
import StarSkin1 from '../assets/images/reward/star_skin_2.png'
import StarSkin2 from '../assets/images/reward/star_skin_3.png'
import StarSkin3 from '../assets/images/reward/star_skin_4.png'
import StarSkin4 from '../assets/images/reward/star_skin_5.png'
import StarSkin5 from '../assets/images/reward/star_skin_6.png'

import StarDeco0 from '../assets/images/reward/star_deco_1.png'
import StarDeco1 from '../assets/images/reward/star_deco_2.png'
import StarDeco2 from '../assets/images/reward/star_deco_3.png'
import StarDeco3 from '../assets/images/reward/star_deco_4.png'
import StarDeco4 from '../assets/images/reward/star_deco_5.png'
import StarDeco5 from '../assets/images/reward/star_deco_6.png'

import StarEffect0 from '../assets/images/reward/star_effect_1.png'
import StarEffect1 from '../assets/images/reward/star_effect_2.png'
import StarEffect2 from '../assets/images/reward/star_effect_3.png'
import StarEffect3 from '../assets/images/reward/star_effect_4.png'
import StarEffect4 from '../assets/images/reward/star_effect_5.png'
import StarEffect5 from '../assets/images/reward/star_effect_6.png'

import { fetchStarCustomization, StarCustomizationResponse, updateStarCustomization } from "../api/user/MypageApi.ts";
import { starSkinMap, starDecoMap, starEffectMap, profileImgMap, generateProfileImgKey } from '../utils/ProfileImageUtil.ts';

const slideFwdBottom = keyframes`
  0% {
    transform: scale(0.4) translateZ(0) translateY(-300px);
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

function CustomizingPage() {
    const location = useLocation();
    const isFromCustomize = location.state?.fromCustomize || false;

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('별 스킨');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const [profileImg, setProfileImg] = useState(ProfileImg); // 프로필 이미지
    const [selectedSkin, setSelectedSkin] = useState<string | null>(null); // 선택된 스킨 
    const [selectedDeco, setSelectedDeco] = useState<string | null>(null); // 선택된 장식 
    const [selectedEffect, setSelectedEffect] = useState<string | null>(null); // 선택된 효과 
    const [tabData, setTabData] = useState({ '별 스킨': [], '별 장식': [], '별 효과': [], });
    const [animate, setAnimate] = useState(false);

    const handleBackIconClick = () => navigate('/mypage', { state: { fromCustomize: true } });

    const NavItem = {
        icon: BackIcon,
        iconWidth: Number(11),
        iconHeight: Number(16),
        text: "나의 별 꾸미기",
        clickFunc: handleBackIconClick,
    };

    // 커스터마이징 데이터 로드
    useEffect(() => {
        const loadStarData = async () => {
            try {
                const response = await fetchStarCustomization();
                const data = response.data;

                // Set currently equipped items as strings
                setSelectedSkin(data.nowSkin);
                setSelectedDeco(data.nowDecoration);
                setSelectedEffect(data.nowEffect);

                // Map initial profile image
                if (response.data.nowSkin && response.data.nowDecoration && response.data.nowEffect) {
                    const initialKey = generateProfileImgKey(
                        response.data.nowSkin,
                        response.data.nowDecoration,
                        response.data.nowEffect
                    );
                    if (initialKey && profileImgMap[initialKey]) {
                        setProfileImg(profileImgMap[initialKey]);
                    }
                }

                // Map API response to tabData structure
                const skins = [
                    { id: 0, image: StarSkin0, locked: !data.skins.includes('S0') },
                    { id: 1, image: StarSkin1, locked: !data.skins.includes('S1') },
                    { id: 2, image: StarSkin2, locked: !data.skins.includes('S2') },
                    { id: 3, image: StarSkin3, locked: !data.skins.includes('S3') },
                    { id: 4, image: StarSkin4, locked: !data.skins.includes('S4') },
                    { id: 5, image: StarSkin5, locked: !data.skins.includes('S5') },
                ];

                const decorations = [
                    { id: 0, image: StarDeco0, locked: !data.decorations.includes('D0') },
                    { id: 1, image: StarDeco1, locked: !data.decorations.includes('D1') },
                    { id: 2, image: StarDeco2, locked: !data.decorations.includes('D2') },
                    { id: 3, image: StarDeco3, locked: !data.decorations.includes('D3') },
                    { id: 4, image: StarDeco4, locked: !data.decorations.includes('D4') },
                    { id: 5, image: StarDeco5, locked: !data.decorations.includes('D5') },
                ];

                const effects = [
                    { id: 0, image: StarEffect0, locked: !data.effects.includes('E0') },
                    { id: 1, image: StarEffect1, locked: !data.effects.includes('E1') },
                    { id: 2, image: StarEffect2, locked: !data.effects.includes('E2') },
                    { id: 3, image: StarEffect3, locked: !data.effects.includes('E3') },
                    { id: 4, image: StarEffect4, locked: !data.effects.includes('E4') },
                    { id: 5, image: StarEffect5, locked: !data.effects.includes('E5') },
                ];

                // Update tabData
                setTabData({
                    '별 스킨': skins,
                    '별 장식': decorations,
                    '별 효과': effects,
                });

            } catch (error: any) {
                console.error('Error loading star customization:', error);
            }
        };
        loadStarData();
    }, []);

    // Tab Click 이벤트 처리
    const handleTabClick = (tabName: string, index: number) => {
        if (activeTab === tabName) return;

        setAnimate(false); // Reset animation
        setTimeout(() => {
            setActiveTab(tabName);
            setActiveTabIndex(index);
            setAnimate(true); // Trigger fadeIn animation
        }, 10); // Small delay to ensure state updates
    };

    // Tab Item Click 이벤트 처리
    const handleItemClick = async (id: number) => {
        try {
            let updatedSkin = selectedSkin;
            let updatedDeco = selectedDeco;
            let updatedEffect = selectedEffect;

            if (activeTab === '별 스킨') {
                const selectedSkinItem = `S${id}`;

                // 이미 착용 중인 아이템인지 확인
                if (selectedSkinItem === selectedSkin) {
                    console.log(`선택된 장식 ${selectedSkinItem}은 이미 착용 중입니다.`);

                }
                else {
                    updatedSkin = selectedSkinItem;
                    setSelectedSkin(updatedSkin);
                    setSelectedDeco(selectedDeco);
                    setSelectedEffect(selectedEffect);

                    // 프로필 이미지 업데이트
                    const newProfileImg = starSkinMap[updatedSkin];
                    if (newProfileImg) {
                        setProfileImg(newProfileImg);
                    }
                }
            } if (activeTab === '별 장식') {
                const selectedDecoration = `D${id}`;

                // 이미 착용 중인 아이템인지 확인
                if (selectedDecoration === selectedDeco) {
                    console.log(`선택된 장식 ${selectedDecoration}은 이미 착용 중입니다.`);
                    updatedDeco = 'Dx'; // Dx로 설정
                    setSelectedDeco(updatedDeco);
                } else {
                    updatedDeco = selectedDecoration;

                    setSelectedSkin(selectedSkin);
                    setSelectedDeco(updatedDeco);
                    setSelectedEffect(selectedEffect);
                }

                // 프로필 이미지 업데이트
                const newProfileImg = starDecoMap[updatedDeco];
                if (newProfileImg) {
                    setProfileImg(newProfileImg);
                }
            } else if (activeTab === '별 효과') {
                const selectedEffectItem = `E${id}`;

                // 이미 착용 중인 아이템인지 확인
                if (selectedEffectItem === selectedEffect) {
                    console.log(`선택된 효과 ${selectedEffectItem}은 이미 착용 중입니다.`);
                    updatedEffect = 'Ex'; // Ex로 설정
                    setSelectedEffect(updatedEffect);
                } else {
                    updatedEffect = selectedEffectItem;

                    setSelectedEffect(selectedSkin);
                    setSelectedSkin(selectedSkin);
                    setSelectedEffect(updatedEffect);
                }

                // 프로필 이미지 업데이트
                const newProfileImg = starEffectMap[updatedEffect];
                if (newProfileImg) {
                    setProfileImg(newProfileImg);
                }
            }

            console.log("updatedSkin, updatedDeco, updatedEffect: ", updatedSkin, updatedDeco, updatedEffect);

            // Make PATCH request to update customization
            const response = await updateStarCustomization(updatedSkin, updatedDeco, updatedEffect);

            if (response.data.code === 200) {
                console.log('Customization updated successfully:', response.data.data);
            } else {
                console.error('Failed to update customization:', response.data);
                alert('별 커스터마이징 업데이트에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error updating star customization:', error);
            alert(error.message || '별 커스터마이징 업데이트에 실패했습니다.');
        }
    };

    // 업데이트된 현재 스킨 정보 렌더링
    useEffect(() => {
        // 선택된 스킨/장식/효과가 변경될 때 프로필 이미지 업데이트
        if (selectedSkin && selectedDeco && selectedEffect) {
            const newKey = generateProfileImgKey(selectedSkin, selectedDeco, selectedEffect);
            if (newKey && profileImgMap[newKey]) {
                setProfileImg(profileImgMap[newKey]);
            } else {
                console.error(`No image found for key: ${newKey}`);
            }
        }
    }, [selectedSkin, selectedDeco, selectedEffect]);

    return (

        <CustomizingPageContainer>
            <TopNav lefter={NavItem} center={NavItem} righter={null} />

            <StarCustomizingContainer>
                <MainStar isD0={profileImg?.includes('D0')}
                    isE0={profileImg?.includes('E0')}
                    isFromCustomize={isFromCustomize}
                    key={profileImg}
                    src={profileImg} alt="메인 별 스킨" />

                <TabMenu activeIndex={activeTabIndex} isD0={profileImg?.includes('Dx')}>
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

                <StarSkinsContainer animate={animate}>
                    {tabData[activeTab].map((item) => (
                        <StarSkin
                            key={item.id}
                            selected={
                                (activeTab === '별 스킨' && selectedSkin === `S${item.id}`) ||
                                (activeTab === '별 장식' && selectedDeco === `D${item.id}`) ||
                                (activeTab === '별 효과' && selectedEffect === `E${item.id}`)
                            }
                            onClick={() => handleItemClick(item.id)}
                            locked={item.locked}
                        >
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
    margin-top: 30px;
`;

const MainStar = styled.img <{ isD0: boolean, isE0: boolean, isFromCustomize: boolean }>`
    width: ${({ isE0 }) => (isE0 ? 254 : 212)}px;
    height: ${({ isD0 }) => (isD0 ? 263 : 212)}px;

    animation: ${slideFwdBottom} 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const TabMenu = styled.div<{ activeIndex: number, isD0: boolean }>`
    display: flex;
    justify-content: center;
    position: relative;

    width: 100%;
    border-bottom: 1px solid var(--gray-40);

    gap: 35px;
    margin-top: ${({ isD0 }) => (isD0 ? 71 : 20)}px;

    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 20px;
        height: 2px;
        width: 110px; /* 각 탭의 너비 */
        background-color: var(--orange-80);
        transform: translateX(${({ activeIndex }) => `${tabOffsets[activeIndex]}px`});
        transition: transform 0.1s ease-in-out;
    }
`;

const TabItem = styled.div<{ active?: boolean }>`
    padding: 10px 20px;
    font-size: 1rem;
    color: ${({ active }) => (active ? 'var(--orange-80)' : 'var(--gray-40)')};
`;

const StarSkinsContainer = styled.div<{ animate: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3개씩 한 행에 배치 */

    gap: 12px;
    margin-top: 10px;

    animation: ${({ animate }) => (animate ? fadeIn : 'none')} 0.5s ease-in-out;
`;

const StarSkin = styled.div<{ locked?: boolean, selected?: boolean }>`
    position: relative;

    width: 110px;
    height: 110px;
    border-radius: 15px;
    border: ${({ selected }) => (selected ? '1px solid var(--gray-100)' : 'none')};
    background: var(--gray-10);

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