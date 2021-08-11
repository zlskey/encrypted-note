import styled from "styled-components";
import { IconAlertCircle } from '@tabler/icons';
import { useContext, useEffect, useState } from "react";
import { useTransition, animated } from 'react-spring'

import { ThemeContext } from "../../contexts/ThemeContext";
import { getSize } from '../../scripts/responsiveFacilities'

const AlertDiv = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 300px;
    aspect-ratio: 20/4;
    background-color: #1e88e5 ;
    z-index: 100;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: #fafafa;
    box-shadow: ${({ theme }) => theme.shadow};
    gap: 5px;
    font-size: ${getSize()};
`

const Alert = ({ content, setContent }) => {
    const { theme } = useContext(ThemeContext)
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        document.addEventListener('click', () => setContent(''))
        return () => document.removeEventListener('click', () => setContent(''))
    })

    useEffect(() => setShowAlert(content ? true : false), [content])

    const transition = useTransition(showAlert, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return (
        <>
            {transition((style, item) =>
                item &&
                <animated.div style={style}>
                    <AlertDiv theme={theme}>
                        <p>{content}</p> <IconAlertCircle />
                    </AlertDiv>
                </animated.div>
            )}
        </>

    );
}

export default Alert;
