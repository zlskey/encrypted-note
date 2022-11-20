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
import TextField from '../ui/TextField'
import constants from 'src/constants'
import useApi from 'src/hooks/useApi'
import { useForm } from 'react-hook-form'

interface FormValues {
    current: string
    password: string
    confirm: string
}

interface DialogProps {
    isOpen: boolean
    handleClose: () => void
}

const ChangePasswordDialog = ({ handleClose, isOpen }: DialogProps) => {
    const setAlert = useContext(AlertContext)
    const api = useApi()
    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            current: '',
            password: '',
            confirm: '',
        },
        reValidateMode: 'onChange',
    })

    const onSubmit = (data: FormValues) => {
        if (data.password !== data.confirm) {
            setError('confirm', { message: constants.error.confirm })
            return
        }

        api.user
            .changePassword(data.current, data.password)
            .then(() => {
                setAlert(constants.info.changed_password, 'info')
                handleClose()
            })
            .catch(() => {
                //
            })
    }

    return (
        <Dialog handleClose={handleClose} isOpen={isOpen}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Change Password
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
                    <TextField
                        label='Current password'
                        name='current'
                        type='password'
                        control={control}
                        required={true}
                    />

                    <TextField
                        label='password'
                        name='password'
                        type='password'
                        control={control}
                        required={true}
                    />

                    <TextField
                        label='Confirm password'
                        name='confirm'
                        control={control}
                        type='password'
                        required={true}
                    />
                </DialogContent>

                <DialogActions>
                    <Button type='submit'>Save changes</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ChangePasswordDialog
