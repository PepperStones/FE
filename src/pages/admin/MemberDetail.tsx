
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../../components/nav/TopNav.tsx';
import FooterNav from '../../components/nav/FooterNav.tsx'
import LargeBtn from '../../components/button/LargeBtn.tsx';
import SmallBtn from '../../components/button/SmallBtn.tsx';
import DefaultModal from '../../components/modal/DefaultModal.tsx';

import BackIcon from '../../assets/images/left_arrow.png'
import EinImg from '../../assets/images/admin/yellow_ein.png'
import NameImg from '../../assets/images/admin/yellow_person.png'
import JoinDateImg from '../../assets/images/admin/yellow_calendar.png'
import DepartmentImg from '../../assets/images/admin/yellow_house.png'
import GroupImg from '../../assets/images/admin/yellow_group.png'
import LevelImg from '../../assets/images/admin/yellow_diamond_star.png'
import IdImg from '../../assets/images/admin/yellow_id.png'
import DeactIdImg from '../../assets/images/admin/gray_id.png'
import PwdImg from '../../assets/images/admin/yellow_lock.png'
import DeactPwdImg from '../../assets/images/admin/gray_lock.png'

function MemberDetail() {
    const navigate = useNavigate();
    const location = useLocation(); // URL에서 전달된 state 데이터 가져오기
    const member = location.state; // 전달된 quest 데이터

    const [ein, setEin] = useState(member.ein);
    const [name, setName] = useState(member.name);
    const [joinDate, setJoinDate] = useState(member.joinDate);
    const [department, setDepartment] = useState(ein.department);
    const [group, setGroup] = useState(member.group);
    const [level, setLevel] = useState(member.level);
    const [userID, setUserID] = useState(member.userID);
    const [initPWD, setInitPWD] = useState(member.initPWD);
    const [userPWD, setUserPWD] = useState(member.userPWD);

    const [isModifyAvailable, setIsModifyAvailable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 뒤로가기 클릭 함수
    const handleBackIconClick = () => {
        navigate('/member');
    };

    // 수정 버튼 클릭 시 수정 가능 상태로 전환
    const handleEditClick = () => {
        setIsEditable(true);
    };

    // 삭제 처리 함수
    const handleDeleteClick = () => {

        navigate('/member'); // 삭제 후 목록 페이지로 이동
    };

    // 수정 처리 함수
    const handleModifyClick = () => {

        navigate('/member'); // 수정 후 목록 페이지로 이동
    };

    const Center = {
        icon: BackIcon,
        iconWidth: 9,
        iconHeight: 16,
        text: "구성원 정보",
        clickFunc: handleBackIconClick
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
        setInput(event.target.value);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
        setInput(event.target.value);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        setIsModifyAvailable(ein !== '' && name !== '' && joinDate !== 'default' && department !== 'default'
            && group !== 'default' && level !== 'default' && userID !== '' && userPWD !== '');
    }, [ein, name, joinDate, department, group, level, userID, userPWD]);

    return (
        <MypageContainer>
            <TopNav lefter={Center} center={Center} righter={null} />

            <ProfileInfoContainer>

                <ProfileDetailContainer>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={EinImg} /><IconDescription className='text-md-200'>사번</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="사번을 입력해주세요."
                            value={ein}
                            onChange={(e) => handleInputChange(e, setEin)}
                            disabled={!isEditable}
                        />
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={NameImg} /><IconDescription className='text-md-200'>이름</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="이름을 입력해주세요."
                            value={name}
                            onChange={(e) => handleInputChange(e, setName)}
                            disabled={!isEditable}
                        />
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={JoinDateImg} /><IconDescription className='text-md-200'>입사일</IconDescription>
                        </DetailLeft>
                        <DetailSelect
                            value={joinDate}
                            onChange={(e) => handleSelectChange(e, setJoinDate)}
                            className='text-sm-200'
                            disabled={!isEditable}
                        >
                            <option value="default">입사일을 선택해주세요</option>
                            <option value="2022-01-15">입사일1</option>
                            <option value="2">입사일2</option>
                            <option value="3">입사일3</option>
                            <option value="4">입사일4</option>
                            <option value="5">입사일5</option>
                            <option value="6">입사일6</option>
                        </DetailSelect>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={DepartmentImg} /><IconDescription className='text-md-200'>소속</IconDescription>
                        </DetailLeft>
                        <DetailSelect
                            value={department}
                            onChange={(e) => handleSelectChange(e, setDepartment)}
                            className='text-sm-200'
                            disabled={!isEditable}
                        >
                            <option value="default">소속을 선택해주세요</option>
                            <option value="음성 1센터">음성 1센터</option>
                            <option value="음성 2센터">음성 2센터</option>
                            <option value="용인백암센터">용인백암센터</option>
                            <option value="남양주센터">남양주센터</option>
                            <option value="파주센터">파주센터</option>
                            <option value="사업기획팀">사업기획팀</option>
                            <option value="그로스팀">그로스팀</option>
                            <option value="CX팀">CX팀</option>
                        </DetailSelect>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={GroupImg} /><IconDescription className='text-md-200'>직무그룹</IconDescription>
                        </DetailLeft>
                        <DetailSelect
                            value={group}
                            onChange={(e) => handleSelectChange(e, setGroup)}
                            className='text-sm-200'
                            disabled={!isEditable}
                        >
                            <option value="default">직무그룹을 선택해주세요</option>
                            <option value="1">그룹 1</option>
                            <option value="2">그룹 2</option>
                            <option value="3">그룹 3</option>
                            <option value="4">그룹 4</option>
                            <option value="5">그룹 5</option>
                            <option value="6">그룹 6</option>
                        </DetailSelect>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={LevelImg} /><IconDescription className='text-md-200'>레벨</IconDescription>
                        </DetailLeft>
                        <DetailSelect
                            value={level}
                            onChange={(e) => handleSelectChange(e, setLevel)}
                            className='text-sm-200'
                            disabled={!isEditable}
                        >
                            <option value="default">레벨 직군을 선택해주세요</option>
                            <option value="1">F1-I</option>
                            <option value="2">F1-II</option>
                            <option value="3">F2-I</option>
                            <option value="4">F2-II</option>
                            <option value="5">F2-III</option>
                            <option value="6">F3-I</option>
                            <option value="7">F3-II</option>
                            <option value="8">F3-III</option>
                            <option value="9">F4-I</option>
                            <option value="10">F4-II</option>
                            <option value="11">F4-II</option>
                            <option value="12">F5</option>
                        </DetailSelect>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={isEditable ? DeactIdImg : IdImg} />
                            <IconDescription className='text-md-200' isEditable={isEditable}>아이디</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="아이디를 입력해주세요."
                            value={userID}
                            onChange={(e) => handleInputChange(e, setUserID)}
                            disabled={true}
                            isEditable={isEditable}
                        />
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={isEditable ? DeactPwdImg : PwdImg} />
                            <IconDescription className='text-md-200' isEditable={isEditable}>기본 비밀번호</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="비밀번호를 입력해주세요."
                            value={initPWD}
                            onChange={(e) => handleInputChange(e, setInitPWD)}
                            disabled={true}
                            isEditable={isEditable}
                        />
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={isEditable ? DeactPwdImg : PwdImg} />
                            <IconDescription className='text-md-200' isEditable={isEditable}>변경 비밀번호</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="비밀번호를 입력해주세요."
                            value={userPWD}
                            onChange={(e) => handleInputChange(e, setUserPWD)}
                            disabled={true}
                            isEditable={isEditable}
                        />
                    </DetailContent>
                </ProfileDetailContainer>

                <ButtonContainer>
                    {isEditable ?
                        <LargeBtn
                            content="완료"
                            onClick={handleModifyClick}
                            isAvailable={isModifyAvailable}
                        />
                        :
                        <>
                            <SmallBtn
                                content="삭제"
                                onClick={openDeleteModal}
                                isAvailable={true}
                                isDarkblue={true}
                            />
                            <SmallBtn
                                content="수정"
                                onClick={handleEditClick}
                                isAvailable={true}
                                isDarkblue={false}
                            />
                        </>
                    }

                </ButtonContainer>
            </ProfileInfoContainer>

            <DefaultModal
                showDefaultModal={isDeleteModalOpen}
                title='구성원 정보를 정말 삭제하시겠습니까?'
                description='삭제한 정보는 다시 복구 불가합니다.'
                onAcceptFunc={handleDeleteClick} // 삭제 함수 연결
                onUnacceptFunc={closeDeleteModal}
            />

            <FooterNav isAdmin={true}/>
        </MypageContainer>

    );
}

export default MemberDetail;

const MypageContainer = styled.div`
display: flex;
flex-direction: column;

`;

const ProfileInfoContainer = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 20px;
`;

const ProfileDetailContainer = styled.div`

border-radius: 15px;
background: var(--sub-20);
`;

const DetailLeft = styled.div`
display: flex;
flex-direction: row;
flex: 1;

gap: 8px;
`;

const DetailInput = styled.input<{ isEditable?: boolean }>`
display: flex;
justify-content: center;
align-items: center;

background: var(--sub-20);
border: none;

color: var(--gray-60);
text-align: right;
direction: rtl;

&::placeholder {
    color: var(--gray-20);
    text-align: right;
}

&:disabled {
    background: var(--sub-20); /* 배경색 유지 */
    color: var(--gray-60); /* 텍스트 색상 유지 */
    opacity: 1; /* 투명도 제거 */

    color: ${({ isEditable }) => (isEditable ? `var(--gray-20)` : 'var(--gray-60)')};
}

color: ${({ isEditable }) => (isEditable ? `var(--gray-20)` : 'var(--gray-60)')};
`;

const DetailSelect = styled.select`
appearance: none;

display: flex;
justify-content: center;
align-items: center;

background: var(--sub-20);
border: none;

color: var(--gray-60);
text-align: right;
direction: rtl;

&:disabled {
    background: var(--sub-20); /* 배경색 유지 */
    color: var(--gray-60); /* 텍스트 색상 유지 */
    opacity: 1; /* 투명도 제거 */
}
`;


const DetailContent = styled.div`
display: flex;
flex-direction: row;

padding: 11px 20px;
`;

const MypageIcon = styled.img`
width: 14px;
height: 14px;
`;

const IconDescription = styled.div<{ isEditable?: boolean }>`
display: flex;
justify-content: center;
align-items: center;

color: var(--primary-80);
color: ${({ isEditable }) => (isEditable ? `var(--gray-20)` : 'var(--gray-60)')};
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

gap: 10px;
`;