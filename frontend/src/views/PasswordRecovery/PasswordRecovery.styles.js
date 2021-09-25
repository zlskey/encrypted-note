import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: grid;
    place-items: center;
`

export const Window = styled.div`
    width: min(90vw, 400px);
    box-shadow: 0 0 10px -5px #212121;
    padding: 20px 40px;
    text-align: center;
    border-radius: 5px;
    background-color: ${props => props.theme.uiColor};
    color: ${props => props.theme.fontColor};
    position: relative;
`

export const ReturnIcon = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
`
