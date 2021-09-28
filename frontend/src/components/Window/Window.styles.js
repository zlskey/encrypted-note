import styled from 'styled-components'

export const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    backdrop-filter: blur(5px);
    top: 0;
    z-index: 9;
`

export const Content = styled.div`
    z-index: 10;
    border-radius: 10px;
    margin-inline: auto;
    background-color: var(--ui);
    box-shadow: var(--shadow);
    color: var(--font);
    transition: 0.1s;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: MIN(95vw, 800px);
    transition: 0.1s;
    ${props => props.customStyles}
`
