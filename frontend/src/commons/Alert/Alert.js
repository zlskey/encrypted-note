import { useTransition, animated } from 'react-spring'
import React from 'react'
import { IconInfoCircle, IconAlertCircle, IconCircleCheck } from '@tabler/icons'

import CloseOnOuterClick from '@commons/CloseOnOuterClick/CloseOnOuterClick'
import Loader from '@commons/Loader/Loader'

import { Alert as AlertDiv } from './Alert.styles'

const Alert = ({ type, content, color, showAlert, setShowAlert }) => {
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
                            <AlertDiv background={color}>
                                {type === 'error' && <IconAlertCircle />}
                                {type === 'info' && <IconInfoCircle />}
                                {type === 'success' && <IconCircleCheck />}
                                {type === 'loading' && <Loader />}

                                {content && content.replace('Error: ', '')}
                            </AlertDiv>
                        </animated.div>
                    )
            )}
        </CloseOnOuterClick>
    )
}

export default Alert
