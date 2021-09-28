import { useState } from 'react'
import { useDispatch } from 'react-redux'

import InputField from '@components/InputField/InputField'
import Button from '@components/Button/Button'
import Window from '@components/Window/Window'

import { UPDATE_USER_NOTES, UPDATE_SHARED_NOTES } from '@redux/types'
import { setError } from '@helpers/InputErrorHandler'
import useApi from '@hooks/useApi'

import { customStyles } from './PinForm.styles'

const PinForm = ({ setShowPinForm, showPinForm }) => {
    const [pin, setPin] = useState('')
    const dispatch = useDispatch()

    const [doFetch, status] = useApi('/user/notes', 'POST')

    const getNotes = async e => {
        e.preventDefault()

        doFetch(
            (content, ok) => {
                if (ok) {
                    dispatch({
                        type: UPDATE_USER_NOTES,
                        notes: content.userNotes,
                    })
                    dispatch({
                        type: UPDATE_SHARED_NOTES,
                        notes: content.sharedNotes,
                    })
                    setShowPinForm(false)
                } else {
                    setPin('')
                    setError('pin', content)
                }
            },
            { pin }
        )
    }

    return (
        <Window
            setShowWindow={setShowPinForm}
            showWindow={showPinForm}
            customStyles={customStyles}
        >
            <h2>Enter your PIN</h2>
            <form onSubmit={e => getNotes(e)}>
                <InputField
                    name='pin'
                    type='password'
                    content={pin}
                    setContent={setPin}
                    autoFocus={true}
                />

                <Button
                    loading={status === 'fetching'}
                    content='Decrypt data'
                />
            </form>
        </Window>
    )
}

export default PinForm
