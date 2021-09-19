import React, { createContext, useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { IconInfoCircle, IconAlertCircle, IconCircleCheck } from '@tabler/icons'
import { ThemeContext } from '@contexts/ThemeContext'
import CloseOnOuterClick from '@components/CloseOnOuterClick'
import { useTransition, animated } from 'react-spring'

export const AlertContext = createContext(null)

const AlertContextProvider = ({ children }) => {
    const [content, setContent] = useState(null);

    const [type, setType] = useState(null);
    const [color, setColor] = useState(null);

    const { theme } = useContext(ThemeContext)

    const transition = useTransition(type, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    useEffect(() => {

        switch (type) {
            case 'error':
                setColor('#f44336');
                break;
            case 'info':
                setColor('#2196f3')
                break;
            case 'success':
                setColor('#4caf50')
                break;
            default:
                setColor(current => current)
        }

    }, [type])

    return (
        <AlertContext.Provider value={{ setContent, setType }}>
            <CloseOnOuterClick setSomething={setType}>
                {transition((style, item) =>
                    item &&
                    <animated.div style={style}>
                        <Alert background={color} theme={theme}>
                            {type === 'error' && <IconAlertCircle />}
                            {type === 'info' && <IconInfoCircle />}
                            {type === 'success' && <IconCircleCheck />}

                            {content && content.replace('Error: ', '')}
                        </Alert>
                    </animated.div>
                )}
            </CloseOnOuterClick>

            {children}
        </AlertContext.Provider>
    );
}

const Alert = styled.div`
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.background};
    color: #fafafa;
    box-shadow: ${props => props.theme.type === 'light' && props.theme.shadow};
    font-size: 1.3rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    padding: 0.7rem 3rem;
    border-radius: 5px;
    z-index: 10;
`

export default AlertContextProvider;