import { useTransition, animated } from 'react-spring'
import React, { useContext } from 'react'
import { IconInfoCircle, IconAlertCircle, IconCircleCheck } from '@tabler/icons'

import CloseOnOuterClick from '@components/CloseOnOuterClick/CloseOnOuterClick'
import { ThemeContext } from '@contexts/ThemeContext'
import { Alert as AlertDiv } from './Alert.styles'

const Alert = ({ type, content, color, showAlert, setShowAlert }) => {
    const { theme } = useContext(ThemeContext)

    const transition = useTransition(showAlert, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return (
        <CloseOnOuterClick setSomething={setShowAlert}>
            {transition(
                (style, item) =>
                    item && (
                        <animated.div style={style}>
                            <AlertDiv background={color} theme={theme}>
                                {type === 'error' && <IconAlertCircle />}
                                {type === 'info' && <IconInfoCircle />}
                                {type === 'success' && <IconCircleCheck />}

                                {content && content.replace('Error: ', '')}
                            </AlertDiv>
                        </animated.div>
                    ),
            )}
        </CloseOnOuterClick>
    )
}

export default Alert
