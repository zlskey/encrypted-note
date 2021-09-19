import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';

import { ThemeContext } from '@contexts/ThemeContext';
import { getSize } from '@helpers/responsiveFacilities';

const NoteDiv = styled.div`
    border-radius: 10px;
    padding-block: calc(0.1 * ${getSize()});
    padding-inline: calc(0.5 * ${getSize()});
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

    .date {
        font-size: calc(0.8 * ${getSize});
        margin: 0;
        height: 10px;
    } 

    .content {
        font-size: calc(0.9* ${getSize()});
        margin-top: ${getSize()};
    }
`

const DateSkeleton = styled.div`
    height: calc(0.8 *  ${getSize()});
    width: 70px;
    display: inline-block;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    background-color: ${({ theme }) => theme.bgColor};
`

const ContentSkeleton = styled.div`
    height: calc(4 *  ${getSize()});
    width: 100%;
    border-radius: 10px;
    margin-top: 5px;
    position: relative;
    overflow: hidden;
    background-color: ${({ theme }) => theme.bgColor};
`

const LoadingContent = styled.div`
    position: absolute;
    height: 10%;
    left: -10%;
    top: 0;
    width: 100%;
    opacity: 0.5;
    filter: blur(30px);
    transform: rotate(-10deg);
    animation: loadAnimation 1s linear infinite;
    background-color: ${({ theme }) => theme.fontColor};

    @keyframes loadAnimation {
        from {
            top: -100%;
        }
        to {
           top: 200%;
        }
    }
`

const Note = ({ setNoteToFocus, data }) => {
    const { theme } = useContext(ThemeContext)
    const { updatedAt, content } = data
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data !== 'loading') setIsLoading(false)
    }, [data])

    const date = new Date(updatedAt).toLocaleDateString()


    return (
        <NoteDiv
            theme={theme}
            className={isLoading ? '' : 'clickable'}
            onClick={() => !isLoading && setNoteToFocus(data)}
        >

            {isLoading
                ? <>
                    <DateSkeleton theme={theme} ><LoadingContent theme={theme} /></DateSkeleton>
                    <ContentSkeleton theme={theme}><LoadingContent theme={theme} /></ContentSkeleton>
                </>
                : <>
                    <div className="date">{date}</div>
                    <div className="content">{content}</div>
                </>
            }

        </NoteDiv>
    );
}

export default Note