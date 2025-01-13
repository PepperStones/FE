
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../../components/nav/TopNav.tsx';
import LargeBtn from '../../components/button/LargeBtn.tsx';
import SmallBtn from '../../components/button/SmallBtn.tsx';
import DefaultModal from '../../components/modal/DefaultModal.tsx';
import DefaultErrorModal from '../../components/modal/DefaultErrorModal.tsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

import { fetchMemberDetail, updateMemberDetail, deleteMemberDetail, MemberDetailResponse } from '../../api/admin/MemberApi.ts';

function MemberDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [member, setMember] = useState<MemberDetailResponse["data"] | null>(null);

    // 구성원 정보 가져오기
    useEffect(() => {
        const loadMemberDetail = async () => {
            try {
                console.log("user_id: ", id);
                if (!id) throw new Error("유효하지 않은 사용자 ID입니다.");
                const response = await fetchMemberDetail(Number(id));
                setMember(response.data);
                console.log(response.data);

                // 필드 초기값 설정
                setEin(response.data.companyNum || "");
                setName(response.data.name || "");
                setJoinDate(new Date(response.data.joinDate) || null);
                setDepartment(response.data.centerGroup || "default");
                setGroup(response.data.jobGroup || "default");
                setLevel(response.data.level || "default");
                setUserID(response.data.userId || "");
                setInitPWD(response.data.initPassword || "");
                setUserPWD(response.data.password || "");
            } catch (error: any) {
                console.error("Error fetching member detail:", error);
                console.log(error.message || "구성원 정보를 불러오는 데 실패했습니다.");
            }
        };

        loadMemberDetail();
    }, [id]);

    const [ein, setEin] = useState<string>(""); // 사번
    const [name, setName] = useState<string>(""); // 이름
    const [joinDate, setJoinDate] = useState<Date | null>(null); // 입사일 (Date 타입)
    const [department, setDepartment] = useState<string>("default"); // 소속
    const [group, setGroup] = useState<string>("default"); // 직무 그룹
    const [level, setLevel] = useState<string>("default"); // 레벨
    const [userID, setUserID] = useState<string>(""); // 아이디
    const [initPWD, setInitPWD] = useState<string>(""); // 초기 비밀번호
    const [userPWD, setUserPWD] = useState<string>(""); // 변경 비밀번호

    const [isModifyAvailable, setIsModifyAvailable] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isWrongEinErrorModalOpen, setIsWrongEinErrorModalOpen] = useState(false);

    // 뒤로가기 클릭 함수
    const handleBackIconClick = () => navigate('/member');

    // 수정 버튼 클릭 시 수정 가능 상태로 전환
    const handleEditClick = () => setIsEditable(true);

    // 삭제 처리
    const handleDeleteClick = async () => {
        try {
            if (!id) throw new Error("유효하지 않은 사용자 ID입니다.");

            const isDeleted = await deleteMemberDetail(Number(id)); // API 호출

            if (isDeleted) {
                navigate("/member"); // 목록 페이지로 이동
            }

        } catch (error: any) {
            console.error("Error deleting member detail:", error);
        }
    };

    // 수정 처리
    const handleModifyClick = async () => {
        try {
            if (!id) throw new Error("유효하지 않은 사용자 ID입니다.");

            // 수정 데이터 준비
            const updatedData = {
                companyNum: ein,
                name: name,
                joinDate: joinDate,
                centerGroup: department,
                jobGroup: group,
                level: level,
            };

            // 사번 검증 로직
            if (!/^\d{10}$/.test(ein)) {
                openWrongEinErrorModal(); // 에러 모달 표시
                return;
            }

            const isUpdated = await updateMemberDetail(Number(id), updatedData);

            if (isUpdated) {
                setIsEditable(false);
            }
        } catch (error: any) {
            console.error("Error modifying member detail:", error);
            console.log(error.message || "구성원 정보 수정 중 오류가 발생했습니다.");
        }
    };

    // Nav item
    const Center = {
        icon: BackIcon,
        iconWidth: 9,
        iconHeight: 16,
        text: "구성원 정보",
        clickFunc: handleBackIconClick
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => setInput(event.target.value);
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => setInput(event.target.value);
    const handleDateChange = (date) => setJoinDate(date);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const openWrongEinErrorModal = () => setIsWrongEinErrorModalOpen(true);
    const closeWrongEinErrorModal = () => setIsWrongEinErrorModalOpen(false);

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
                        <DatePickerWrapper>
                            <DatePicker
                                selected={joinDate}
                                onChange={handleDateChange}
                                dateFormat="YYYY-MM-DD"
                                placeholderText="입사일을 선택해주세요"
                                className='text-sm-200'
                                disabled={!isEditable}
                            >
                            </DatePicker>
                        </DatePickerWrapper>
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
                            <option value="F1-I">F1-I</option>
                            <option value="F1-II">F1-II</option>
                            <option value="F2-I">F2-I</option>
                            <option value="F2-II">F2-II</option>
                            <option value="F2-III">F2-III</option>
                            <option value="F3-I">F3-I</option>
                            <option value="F3-II">F3-II</option>
                            <option value="F3-III">F3-III</option>
                            <option value="F4-I">F4-I</option>
                            <option value="F4-II">F4-II</option>
                            <option value="F4-III">F4-III</option>
                            <option value="F5">F5</option>
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

            <DefaultErrorModal
                showDefaultErrorModal={isWrongEinErrorModalOpen}
                errorMessage='사번을 잘못 입력하셨습니다.'
                onAcceptFunc={closeWrongEinErrorModal}
            />


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
gap: 100px;
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

const DatePickerWrapper = styled.div`
.react-datepicker {
    font-family: "Pretendard";
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;
    background-color: white;
}

input {
    background-color: var(--sub-20); /* 인풋 배경색 */
    color: var(--gray-60); /* 텍스트 색상 */
    border: none;

    text-align: right;
    
    &:focus {
      border-color: white; /* 포커스 시 테두리 색상 */
      outline: none;
    }
}
`;