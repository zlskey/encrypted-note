import styled, { css } from 'styled-components'

export const settingsWindowStyles = css`
    padding-inline: 2rem;
    padding-bottom: 1rem;
    padding-top: 0.4rem;
    width: min(500px, 90vw);
`

export const LogoutButton = styled.div`
    margin: 0 auto;
    text-align: center;
`

export const Header = styled.h1`
    text-align: center;
    padding-block: 0.5rem;
`

export const SettingsButton = styled.button`
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
    border: none;
    outline: none;
    border-radius: 50%;
    width: 50px;
    aspect-ratio: 1/1;
    margin-top: 15px;
    position: absolute;
    left: 1rem;
    bottom: 1rem;
`
