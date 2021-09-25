import styled from 'styled-components'

export const SharingDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

export const User = styled.p`
    background-color: ${({ theme }) => theme.fontColor};
    color: ${({ theme }) => theme.bgColor};
    padding: 3px 10px;
    border-radius: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    font-size: 15px;
`

export const Input = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    transition: 0.3s;
    color: ${({ theme }) => theme.fontColor};
`
