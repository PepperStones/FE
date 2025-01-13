import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../../components/nav/TopNav.tsx";
import FooterNav from "../../components/nav/FooterNav.tsx";
import SearchFilter from "../../components/filter/SearchFilter.tsx";
import Member from "../../components/button/MemberListItem.tsx";

import AddPersonIcon from "../../assets/images/admin/white_user_add.png";

import { fetchMemberList, MemberListResponse } from '../../api/admin/MemberApi.ts';

function MemberManage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [department, setDepartment] = useState<string>("default");
  const [group, setGroup] = useState<string>("default");

  const [members, setMembers] = useState<MemberListResponse["data"]>([]); // 멤버 리스트 상태

  // 멤버 데이터 가져오기
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetchMemberList(); // API 호출
        setMembers(response.data); // 멤버 리스트 설정
        console.log("members: ", response.data);
      } catch (error: any) {
        console.error("Error fetching member list:", error);
        console.log(error.message || "멤버 데이터를 불러오는 데 실패했습니다.");
      } 
    };

    loadMembers();
  }, []);

  const handleMemberClick = (member: MemberListResponse["data"][0]) => {
    navigate(`/member/${member.id}`); // URL에 member.id만 포함
  };

  // 필터링된 멤버 리스트 계산
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.companyNum.toString().includes(search);
    const matchesDepartment =
      department === "default" || member.centerGroup === department;
    const matchesGroup =
      group === "default" || member.jobGroup === group;

    return matchesSearch && matchesDepartment && matchesGroup;
  });

  const handleAddMerberClick = () => {
    navigate("/addMember");
  };

  const NavItem = {
    icon: AddPersonIcon,
    iconWidth: 22,
    iconHeight: 19,
    text: "구성원 목록",
    clickFunc: handleAddMerberClick,
  };

  return (
    <MemberManageContainer>
      <TopNav lefter={null} center={NavItem} righter={NavItem} />

      <SearchFilter
        title="이름, 사번으로 검색 가능합니다."
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

        <div style={{ height: "60px" }}></div>
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
