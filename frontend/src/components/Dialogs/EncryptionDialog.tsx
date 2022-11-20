import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material'
import React, { useContext } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '../ui/Dialog'
import { PassphraseContext } from 'src/contexts/PassphraseContext'
import TextField from '../ui/TextField'
import constants from 'src/constants'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

interface FormValues {
    passphrase: string
    confirm: string
}

interface DialogProps {
    isOpen: boolean
    handleClose: () => void
}

const EncryptionDialog = ({ handleClose, isOpen }: DialogProps) => {
    const user = useSelector(selectUser)
    const setAlert = useContext(AlertContext)
    const { passphrase } = useContext(PassphraseContext)
    const api = useApi()

    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            current: '',
            passphrase: '',
            confirm: '',
        },
        reValidateMode: 'onChange',
    })

    const onSubmit = async (data: FormValues) => {
        const { passphrase: newPassphrase, confirm } = data

        if (newPassphrase !== confirm) {
            setError('confirm', { message: constants.error.confirm })
            return
        }

        if (user.encryption) {
            await api.user.changePassphrase(passphrase, newPassphrase)

            setAlert(constants.info.changed_passphrase, 'info')
        } else {
            await api.user.startEncryption(passphrase)

            setAlert(constants.info.start_encryption, 'info')
        }

        handleClose()
    }

    return (
        <Dialog handleClose={handleClose} isOpen={isOpen}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Set passphrase
                <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    {user.encryption && (
                        <TextField
                            control={control}
                            label='Current passphrase'
                            name='current'
                            required={true}
                            type='password'
                        />
                    )}
                    <TextField
                        control={control}
                        label={`${
                            user.encryption ? 'Change' : 'Set'
                        } encryption passphrase`}
                        name='passphrase'
                        required={true}
                        type='password'
                    />
                    <TextField
                        control={control}
                        label='Confirm passphrase'
                        name='confirm'
                        required={true}
                        type='password'
                    />
                </DialogContent>

                <DialogActions>
                    <Button type='submit'>Save changes</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EncryptionDialog
