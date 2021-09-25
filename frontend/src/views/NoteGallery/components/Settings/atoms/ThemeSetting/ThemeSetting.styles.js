import styled from 'styled-components'

export const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
`

export const Switch = styled.div`
    border-radius: 9999px;
    height: 25px;
    aspect-ratio: 2/1;
    position: relative;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: content-box;
    cursor: pointer;
    border: 3px solid ${({ theme }) => theme.bgColor};
    background-color: ${({ theme }) => theme.bgColor};
    box-shadow: ${({ theme }) => theme.shadow};

    &::after {
        content: '';
        width: 25px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        transition: 0.3s;
        display: inline-block;

        transform: ${({ theme }) =>
            theme.type === 'light' ? 'translateX(100%)' : ''};
        background-color: ${({ theme }) => theme.fontColor};
    }
`
