
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../../components/nav/TopNav.tsx';
import FooterNav from '../../components/nav/FooterNav.tsx';
import SearchFilter from '../../components/filter/SearchFilter.tsx';
import Member from '../../components/button/MemberListItem.tsx'

import AddPersonIcon from '../../assets/images/admin/white_user_add.png'

interface Member {
    id: number;
    name: string;
    ein: number;
    group: number;
    department: string;
    joinDate: string;
    level: string;
    userID: string;
    initPWD: string;
    userPWD: string;
}

const memberItem: Member[] = [
    {
        id: 1,
        name: "서준",
        ein: 4824,
        group: 1,
        department: "음성 1센터",
        joinDate: "2022-01-15",
        level: "F1-I",
        userID: "seojoon01",
        initPWD: "1234",
        userPWD: "password123"
    },
    {
        id: 2,
        name: "홍승리",
        ein: 5864,
        group: 1,
        department: "음성 1센터",
        joinDate: "2022-01-15",
        level: "F1-I",
        userID: "hongseung02",
        initPWD: "1234",
        userPWD: "secure456"
    },
    {
        id: 3,
        name: "최지훈",
        ein: 5392,
        group: 2,
        department: "음성 2센터",
        joinDate: "2022-01-15",
        level: "F1-I",
        userID: "choijihoon03",
        initPWD: "1234",
        userPWD: "mypassword789"
    },
    {
        id: 4,
        name: "김정윤",
        ein: 4046,
        group: 4,
        department: "남양주센터",
        joinDate: "2022-01-15",
        level: "F1-I",
        userID: "kimjungyoon04",
        initPWD: "1234",
        userPWD: "pass1234"
    },
    {
        id: 5,
        name: "조은향",
        ein: 9807,
        group: 5,
        department: "남양주센터",
        joinDate: "2022-01-15",
        level: "F1-I",
        userID: "joeunhyang05",
        initPWD: "1234",
        userPWD: "admin5678"
    },
    {
        id: 6,
        name: "박준석",
        ein: 9807,
        group: 5,
        department: "CX팀",
        joinDate: "2022-01-15",
        level: "F1-I",
        userID: "parkjunseok06",
        initPWD: "1234",
        userPWD: "intern123"
    }
];

function MemberManage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState<string>('');
    const [department, setDepartment] = useState<string>('default');
    const [group, setGroup] = useState<string>('default');

    const handleMemberClick = (member: Member) => {
        navigate(`/member/${member.id}`, { state: member }); // quest 데이터를 state로 전달
    };

    // 필터링된 멤버 리스트 계산
    const filteredMembers = memberItem.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.ein.toString().includes(search);
        const matchesDepartment =
            department === 'default' || member.department === department;
        const matchesGroup =
            group === 'default' || member.group === parseInt(group);

        return matchesSearch && matchesDepartment && matchesGroup;
    });

    const handleAddMerberClick = () => {
        navigate('/addMember');
    };

    const NavItem = {
        icon: AddPersonIcon,
        iconWidth: 22,
        iconHeight: 19,
        text: "구성원 목록",
        clickFunc: handleAddMerberClick
    };

    return (
        <MemberManageContainer>
            <TopNav lefter={null} center={NavItem} righter={NavItem} />

            <SearchFilter
                search={search}
                setSearch={setSearch}
                department={department}
                setDepartment={setDepartment}
                group={group}
                setGroup={setGroup}
            />

            <ResultContainer>
                {filteredMembers.map((member) => (
                    <Member
                        key={member.id}
                        data={member}
                        onClick={() => handleMemberClick(member)}
                    />
                ))}
                <div style={{ height: '60px' }}></div>
            </ResultContainer>

            <FooterNav isAdmin={true} />
        </MemberManageContainer>
    );
}

export default MemberManage;

const MemberManageContainer = styled.div`
display: flex;
flex-direction: column;
`;

const ResultContainer = styled.div`
display: flex;
flex-direction: column;
list-style-type: none;

gap: 15px;
padding: 20px;
margin: 0; 
`;