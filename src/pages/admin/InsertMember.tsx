
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import TopNav from '../../components/nav/TopNav.tsx';
import LargeBtn from '../../components/button/LargeBtn.tsx';
import DefaultErrorModal from '../../components/modal/DefaultErrorModal.tsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import BackIcon from '../../assets/images/left_arrow.png'
import EinImg from '../../assets/images/admin/orange_ein.png'
import NameImg from '../../assets/images/admin/orange_person.png'
import JoinDateImg from '../../assets/images/admin/orange_calendar.png'
import DepartmentImg from '../../assets/images/admin/orange_house.png'
import GroupImg from '../../assets/images/admin/orange_group.png'
import LevelImg from '../../assets/images/admin/orange_diamond_star.png'
import IdImg from '../../assets/images/admin/orange_id.png'
import PwdImg from '../../assets/images/admin/orange_lock.png'

import { addMember, AddMemberRequest } from '../../api/admin/MemberApi.ts';

function InsertMember() {
    const navigate = useNavigate();
    const [ein, setEin] = useState('');
    const [name, setName] = useState('');
    const [joinDate, setJoinDate] = useState<Date | null>(null);;
    const [department, setDepartment] = useState('');
    const [group, setGroup] = useState('');
    const [level, setLevel] = useState('');
    const [userID, setUserID] = useState('');
    const [userPWD, setUserPWD] = useState('');

    const [isInsertAvailable, setIsInsertAvailable] = useState(false);
    const [isWrongEinErrorModalOpen, setIsWrongEinErrorModalOpen] = useState(false);
    const [isDuplicateUserIdErrorModalOpen, setIsDuplicateUserIdErrorModalOpen] = useState(false);

    // 뒤로가기 클릭 함수
    const handleBackIconClick = () => navigate('/member');

    // 구성원 추가 처리
    const handleInsertMember = async () => {
        try {
            if (!isInsertAvailable) return;

            // 요청 데이터 준비
            const requestData: AddMemberRequest = {
                companyNum: ein,
                name: name,
                joinDate: joinDate ? joinDate.toISOString().split('T')[0] : "",
                centerGroup: department,
                jobGroup: group,
                level: level,
                userId: userID,
                initPassword: userPWD,
            };

            // 사번 검증 로직
            if (!/^\d{10}$/.test(ein)) {
                openWrongEinErrorModal(); // 에러 모달 표시
                return;
            }

            // API 호출
            const isAdded = await addMember(requestData);

            if (isAdded) {
                alert("구성원이 성공적으로 추가되었습니다.");
                navigate('/member'); // 목록 페이지로 이동
            }
        } catch (error: any) {
            openDuplicateUserIdErrorModal()
        }
    };

    const Center = {
        icon: BackIcon,
        iconWidth: 9,
        iconHeight: 16,
        text: "구성원 추가",
        clickFunc: handleBackIconClick
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => setInput(event.target.value);
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, setInput: React.Dispatch<React.SetStateAction<string>>) => setInput(event.target.value);
    const handleDateChange = (date) => setJoinDate(date);

    const openWrongEinErrorModal = () => setIsWrongEinErrorModalOpen(true);
    const closeWrongEinErrorModal = () => setIsWrongEinErrorModalOpen(false);
    const openDuplicateUserIdErrorModal = () => setIsDuplicateUserIdErrorModalOpen(true);
    const closeDuplicateUserIdErrorModal = () => setIsDuplicateUserIdErrorModalOpen(false);

    useEffect(() => {
        setIsInsertAvailable(ein !== '' && name !== '' && joinDate !== null && department !== 'default'
            && group !== 'default' && level !== 'default' && userID !== '' && userPWD !== '');
    }, [ein, name, joinDate, department, group, level, userID, userPWD]);

    return (
        <MypageContainer>
            <TopNav lefter={Center} center={Center} righter={null} isAdmin={true} />

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
                            >
                            </DatePicker>
                        </DatePickerWrapper>
                    </DetailContent>

                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={DepartmentImg} />
                            <IconDescription className="text-md-200">소속</IconDescription>
                        </DetailLeft>
                        <DetailSelect
                            value={department}
                            onChange={(e) => {
                                handleSelectChange(e, setDepartment);
                                const selectedDepartment = e.target.value;
                                if (["사업기획팀", "그로스팀", "CX팀"].includes(selectedDepartment)) {
                                    setGroup("1"); // Set group to "그룹 1"
                                } else {
                                    setGroup("default"); // Reset group to default for other departments
                                }
                            }}
                            className="text-sm-200"
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
                            <MypageIcon src={GroupImg} />
                            <IconDescription className="text-md-200">직무그룹</IconDescription>
                        </DetailLeft>
                        <DetailSelect
                            value={group}
                            onChange={(e) => handleSelectChange(e, setGroup)}
                            className="text-sm-200"
                            disabled={
                                department === "default" || // Disable if no department is selected
                                ["사업기획팀", "그로스팀", "CX팀"].includes(department) // Disable for specific departments
                            }
                        >
                            <option value="default">직무그룹을 선택해주세요</option>
                            <option value="1">그룹 1</option>
                            <option value="2">그룹 2</option>
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
                            <option value="B1">B1</option>
                            <option value="B2">B2</option>
                            <option value="B3">B3</option>
                            <option value="B4">B4</option>
                            <option value="B5">B5</option>
                            <option value="B6">B6</option>
                            <option value="G1">G1</option>
                            <option value="G2">G2</option>
                            <option value="G3">G3</option>
                            <option value="G4">G4</option>
                            <option value="G5">G5</option>
                            <option value="G6">G6</option>
                        </DetailSelect>
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={IdImg} /><IconDescription className='text-md-200'>아이디</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="아이디를 입력해주세요."
                            value={userID}
                            onChange={(e) => handleInputChange(e, setUserID)}
                        />
                    </DetailContent>
                    <DetailContent>
                        <DetailLeft>
                            <MypageIcon src={PwdImg} /><IconDescription className='text-md-200'>비밀번호</IconDescription>
                        </DetailLeft>
                        <DetailInput
                            type="text"
                            className='text-sm-200'
                            placeholder="비밀번호를 입력해주세요."
                            value={userPWD}
                            onChange={(e) => handleInputChange(e, setUserPWD)}
                        />
                    </DetailContent>
                </ProfileDetailContainer>

                <LargeBtn
                    content="추가"
                    onClick={handleInsertMember}
                    isAvailable={isInsertAvailable}
                />
            </ProfileInfoContainer>

            <DefaultErrorModal
                showDefaultErrorModal={isWrongEinErrorModalOpen}
                errorMessage='사번을 잘못 입력하셨습니다.'
                onAcceptFunc={closeWrongEinErrorModal}
            />

            <DefaultErrorModal
                showDefaultErrorModal={isDuplicateUserIdErrorModalOpen}
                errorMessage='이미 사용 중인 아이디입니다.'
                onAcceptFunc={closeDuplicateUserIdErrorModal}
            />

        </MypageContainer>

    );
}

export default InsertMember;

const MypageContainer = styled.div`
display: flex;
flex-direction: column;

`;

const ProfileInfoContainer = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 290px;
`;

const ProfileDetailContainer = styled.div`

border-radius: 15px;
background: var(--black-50);
`;

const DetailLeft = styled.div`
display: flex;
flex-direction: row;
flex: 1;

gap: 8px;
`;

const DetailInput = styled.input`
display: flex;
justify-content: center;
align-items: center;

background: var(--black-50);
border: none;

color: var(--gray-60);
text-align: right;
direction: rtl;

&::placeholder {
    color: var(--gray-20);
    text-align: right;
}
`;

const DetailSelect = styled.select`
appearance: none;

display: flex;
justify-content: center;
align-items: center;

background: var(--black-50);
border: none;

color: var(--gray-60);
text-align: right;
direction: rtl;
`;


const DetailContent = styled.div`
display: flex;
flex-direction: row;

padding: 11px 20px;
`;

const MypageIcon = styled.img`
display: flex;
justify-content: center;
align-items: center;

width: 14px;
height: 14px;
`;

const IconDescription = styled.div`
display: flex;
justify-content: center;
align-items: center;

color: var(--orange-90);
`;

const DatePickerWrapper = styled.div`
.react-datepicker {
    font-family: "Pretendard";
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px;
    background-color: white;
}

input {
    background-color: var(--black-50); /* 인풋 배경색 */
    color: var(--gray-60); /* 텍스트 색상 */
    border: none;

    text-align: right;

    &:focus {
      border-color: white; /* 포커스 시 테두리 색상 */
      outline: none;
    }
}
`;