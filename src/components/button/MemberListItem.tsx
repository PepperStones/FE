import React from 'react'
import styled from 'styled-components'

/* lefter, center, righter 모두 인터페이스 동일
interface MemberItemProps {
    data: interface
    onClick : () => void;
}

interface data {
    id: number;     // member ID
    name: string;       // member name
    companyNum: number;        // member employee number
    jobGroup: number;      // 그룹 넘버
    centerGroup: string;     // 부서 이름
}
*/

const MemberListItem = ({ data, onClick }) => {

    return (
        <ResultContentItems key={data.id} onClick={onClick}>
            <PersonInfo>
                <NameContainer className='text-md-300'>
                    {data.name}
                    <TextDivider>|</TextDivider>
                    <EIN className='caption-sm-200 '>{data.companyNum}</EIN>
                </NameContainer>

                <Group className='caption-sm-300'>그룹 {data.jobGroup}</Group>
            </PersonInfo>

            <Divider />

            <DepartmentInfo>
                <DepartmentText className='caption-sm-300'>소속</DepartmentText>
                <Department className='caption-md-200'>{data.centerGroup}</Department>
            </DepartmentInfo>
        </ResultContentItems>
    )
}

export default MemberListItem

const ResultContentItems = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    
    width: 100%;
    
    margin-bottom: 10px;
    padding: 0px 0px;
    border: 0.5px solid var(--purple-purple-7);
    border-radius: 10px;
    border-bottom: 1px solid var(--grey-grey-3);
    background-color: var(--sub-20);
`;

const PersonInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 99%;

    padding: 10px 16px;
`;

const NameContainer = styled.div`
color: var(--primary-80);
`;

const TextDivider = styled.span`
color: var(--sub-40);
font-size: 18px;
margin: 0 9px;
`;

const EIN = styled.span`
color: var(--gray-80);
`;

const Group = styled.div`
display: flex;
justify-content: center;
align-items: center;

width: 46px;
height: 18px;
padding: 10px 3px;

color: var(--sub-80);
text-align: center;

border-radius: 30px;
background: linear-gradient(to bottom, var(--sub-40), var(--sub-20));
`;

const Divider = styled.div`
    width: 100%;
    border-bottom: 0.5px solid var(--sub-60);
`;

const DepartmentInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 100%;
    padding: 6px 20px;
    border-radius: 0px 0px 10px 10px;
    background: var(--sub-30);

    color: var(--accent-90);
`;

const DepartmentText = styled.div`
color: var(--grey-grey-6);
`;

const Department = styled.div`
    color: var(--grey-grey-7);
    text-align: right;
`;