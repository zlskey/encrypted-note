import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0)
    }
    to {
        transform: rotate(360deg)
    }
`

export const LoaderDiv = styled.div`
    border: 2px solid transparent;
    border-top-color: #fafafa;
    border-bottom-color: #fafafa;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    margin: 0 auto;
    animation: ${rotate} 1s linear infinite;
`
