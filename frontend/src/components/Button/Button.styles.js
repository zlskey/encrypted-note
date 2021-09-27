import styled, { css } from 'styled-components'

export const StyledButton = styled.button`
    background-color: ${props => props.color};
    color: #fafafa;
    margin-top: 15px;
    outline: none;
    border: none;
    padding: 10px 30px;
    font-size: 1rem;
    border-radius: 5px;
    white-space: nowrap;
    ${props =>
        props.size &&
        css`
            width: ${props.size.width}px !important;
            heigth: ${props.size.heigth}px !important;
        `}
`
