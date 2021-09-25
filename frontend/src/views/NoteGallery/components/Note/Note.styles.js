import styled, { keyframes, css } from 'styled-components'

export const NoteDiv = styled.div`
    border-radius: 10px;
    padding-block: 0.1rem;
    padding-inline: 0.5rem;
    max-height: 150px;
    white-space: pre;
    line-height: 1.7rem;
    max-height: 8rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    display: inline-block;
    overflow: hidden !important;
    text-overflow: ellipsis;
    font-weight: 300;
    color: inherit;

    border: 5px solid ${({ theme }) => theme.uiColor};
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.type === 'light' && theme.shadow};
`

const loadAnimation = keyframes`
	0% {
		opacity: 1;
	}
    50% {
		opacity: 0.8;
    }
	100% {
		opacity: 1;
	}
`

export const NoteDate = styled.div`
    font-size: 0.8rem;
    margin: 0;

    ${props =>
        props.isLoading &&
        css`
            height: 0.8rem;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            animation: ${loadAnimation} 2s linear infinite;
            background-color: ${({ theme }) => theme.bgColor};
            color: ${({ theme }) => theme.bgColor};
        `}
`
export const Content = styled.div`
    font-size: 0.9rem;
    margin-top: 0rem;

    ${props =>
        props.isLoading &&
        css`
            margin-top: 0.5rem;
            height: calc(0.9rem * 5);
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            animation: ${loadAnimation} 2s linear infinite;
            background-color: ${({ theme }) => theme.bgColor};
        `}
`
