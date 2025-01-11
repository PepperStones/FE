
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SearchIconImg from '../../assets/images/admin/magnifier.png'

import SelectIcon from '../../assets/images/admin/lightgray_down_arrow.png'
import ActSelectIcon from '../../assets/images/admin/darkblue_down_arrow.png'

interface SearchFilterProps {
    search: string;
    setSearch: (value: string) => void;
    department: string;
    setDepartment: (value: string) => void;
    group: string;
    setGroup: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    search, setSearch,
    department, setDepartment,
    group, setGroup}) => {

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log(`Searching for: ${search}`);
    };

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        setGroup('default'); // 소속 변경 시 그룹 초기화
        console.log(`department selected: ${event.target.value}`);
    };

    const handleGroupChange = (event) => {
        setGroup(event.target.value);
        console.log(`Group selected: ${event.target.value}`);
    };

    return (
        <SearchFilterContainer>

            <SearchBar>
                <SearchInput
                    type="text"
                    className='text-sm-100'
                    placeholder="이름, 사번으로 검색 가능합니다."
                    value={search}
                    onChange={handleSearch}
                />
                <SearchButton onClick={handleSearchButtonClick}>
                    <SearchIcon src={SearchIconImg} />
                </SearchButton>
            </SearchBar>

            <FilterSelectContainer>
                <FilterSelect
                    value={department}
                    onChange={handleDepartmentChange}
                    className={department !== 'default' ? 'active' : ''}
                >
                    <option value="default">소속</option>
                    <option value="음성 1센터">음성 1센터</option>
                    <option value="음성 2센터">음성 2센터</option>
                    <option value="용인백암센터">용인백암센터</option>
                    <option value="남양주센터">남양주센터</option>
                    <option value="파주센터">파주센터</option>
                    <option value="사업기획팀">사업기획팀</option>
                    <option value="그로스팀">그로스팀</option>
                    <option value="CX팀">CX팀</option>
                    <FilterFilterIcon
                        src={department !== 'default' ? ActSelectIcon : SelectIcon}
                    />
                </FilterSelect>

                {department === 'default' ? undefined :
                    <>
                        <FilterSelect
                            value={group}
                            onChange={handleGroupChange}
                            className={group !== 'default' ? 'active' : ''}
                        >
                            <option value="default">그룹</option>
                            <option value="1">그룹 1</option>
                            <option value="2">그룹 2</option>
                            <option value="3">그룹 3</option>
                            <option value="4">그룹 4</option>
                            <option value="5">그룹 5</option>
                            <option value="6">그룹 6</option>
                            <FilterFilterIcon
                                src={group !== 'default' ? ActSelectIcon : SelectIcon}
                            />
                        </FilterSelect>
                    </>
                }


            </FilterSelectContainer>
        </SearchFilterContainer>
    );
}

export default SearchFilter;

const SearchFilterContainer = styled.div`
display: flex;
flex-direction: column;

background: var(--sub-10);
border-radius: 0 0 15px 15px;

padding: 15px;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    background-color: white;
    padding: 6px 15px;
    font-size: 15px;

    border-radius: 10px;
    background: var(--sub-80);
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    flex-grow: 1;

    background: var(--sub-80);

    padding: 11px 15px;
    padding-left: 0px;

    &::placeholder {
        color: var(--sub-60);
    }
`;

const SearchButton = styled.button`
    border: none;
    background: var(--sub-80);
`;

const SearchIcon = styled.img`
width: 15px;
height: 15px;
`;

const FilterSelectContainer = styled.div`
display: flex;
position: relative;

gap: 5px;
`;

const FilterSelect = styled.select`
    appearance: none;
    border-radius: 30px;
    border: none;
    background: var(--sub-40);

    padding: 5px 14px;

    color: ${({ value }) => value === 'default' ? 'var(--sub-80)' : 'var(--sub-60)'};

    &.active {
        background-color: var(--primary-60);
        color: var(--sub-20);
    }
`;

const FilterFilterIcon = styled.img`
width: 11px;
height: 7px;

margin-left: 5px;
`;