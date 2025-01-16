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

import S0DxEx from '../assets/images/customItem/S0DxEx.png'
import S0DxE0 from '../assets/images/customItem/S0DxE0.png'
import S0D0Ex from '../assets/images/customItem/S0D0Ex.png'
import S0D0E0 from '../assets/images/customItem/S0D0E0.png'

import S1DxEx from '../assets/images/customItem/S1DxEx.png'
import S1DxE0 from '../assets/images/customItem/S1DxE0.png'
import S1D0Ex from '../assets/images/customItem/S1D0Ex.png'
import S1D0E0 from '../assets/images/customItem/S1D0E0.png'

import S2DxEx from '../assets/images/customItem/S2DxEx.png'
import S2DxE0 from '../assets/images/customItem/S2DxE0.png'
import S2D0Ex from '../assets/images/customItem/S2D0Ex.png'
import S2D0E0 from '../assets/images/customItem/S2D0E0.png'

import S3DxEx from '../assets/images/customItem/S3DxEx.png'
import S3DxE0 from '../assets/images/customItem/S3DxE0.png'
import S3D0Ex from '../assets/images/customItem/S3D0Ex.png'
import S3D0E0 from '../assets/images/customItem/S3D0E0.png'

import S4DxEx from '../assets/images/customItem/S4DxEx.png'
import S4DxE0 from '../assets/images/customItem/S4DxE0.png'
import S4D0Ex from '../assets/images/customItem/S4D0Ex.png'
import S4D0E0 from '../assets/images/customItem/S4D0E0.png'

import S5DxEx from '../assets/images/customItem/S5DxEx.png'
import S5DxE0 from '../assets/images/customItem/S5DxE0.png'
import S5D0Ex from '../assets/images/customItem/S5D0Ex.png'
import S5D0E0 from '../assets/images/customItem/S5D0E0.png'

export const profileImgMap = {
    "S0DxEx": S0DxEx,
    "S0DxE0": S0DxE0,
    "S0D0Ex": S0D0Ex,
    "S0D0E0": S0D0E0,

    "S1DxEx": S1DxEx,
    "S1DxE0": S1DxE0,
    "S1D0Ex": S1D0Ex,
    "S1D0E0": S1D0E0,

    "S2DxEx": S2DxEx,
    "S2DxE0": S2DxE0,
    "S2D0Ex": S2D0Ex,
    "S2D0E0": S2D0E0,

    "S3DxEx": S3DxEx,
    "S3DxE0": S3DxE0,
    "S3D0Ex": S3D0Ex,
    "S3D0E0": S3D0E0,

    "S4DxEx": S4DxEx,
    "S4DxE0": S4DxE0,
    "S4D0Ex": S4D0Ex,
    "S4D0E0": S4D0E0,

    "S5DxEx": S5DxEx,
    "S5DxE0": S5DxE0,
    "S5D0Ex": S5D0Ex,
    "S5D0E0": S5D0E0,
};

export const starSkinMap: Record<string, string> = {
    S0: StarSkin0,
    S1: StarSkin1,
    S2: StarSkin2,
    S3: StarSkin3,
    S4: StarSkin4,
    S5: StarSkin5,
};

export const starDecoMap: Record<string, string> = {
    D0: StarDeco0,
    D1: StarDeco1,
    D2: StarDeco2,
    D3: StarDeco3,
    D4: StarDeco4,
    D5: StarDeco5,
};

export const starEffectMap: Record<string, string> = {
    E0: StarEffect0,
    E1: StarEffect1,
    E2: StarEffect2,
    E3: StarEffect3,
    E4: StarEffect4,
    E5: StarEffect5,
};

// 프로필 이미지 키 생성 함수
export const generateProfileImgKey = (skin: string | null, deco: string | null, effect: string | null) => {
    if (!skin || !deco || !effect) return null;
    return `${skin}${deco}${effect}`; // 예: "S2D3E5"
};

