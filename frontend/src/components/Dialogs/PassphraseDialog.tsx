import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import React, { useContext } from 'react'

import Dialog from 'src/components/ui/Dialog'
import { PassphraseContext } from 'src/contexts/PassphraseContext'
import TextField from 'src/components/ui/TextField'
import constants from 'src/constants'
import useApi from 'src/hooks/useApi'
import { useForm } from 'react-hook-form'

interface DialogProps {
    showDialog: boolean
}
const PassphraseDialog = ({ showDialog }: DialogProps) => {
    const { handleSetPassphrase } = useContext(PassphraseContext)
    const api = useApi()

    const { control, handleSubmit, setError } = useForm({
        defaultValues: { passphrase: '' },
    })

    const onSubmit = async (data: { passphrase: string }) => {
        const isValid = await api.user.validatePassphrase(data.passphrase)

        if (!isValid) {
            setError('passphrase', {
                message: constants.error.invalid_passphrase,
            })
            return
        }

        handleSetPassphrase(data.passphrase)
    }

    return (
        <Dialog isOpen={showDialog} handleClose={() => {}}>
            <DialogTitle sx={{ m: 0, p: 2 }}>Set passphrase</DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        name='passphrase'
                        label='Decryption passphrase'
                        control={control}
                        type='password'
                        required={true}
                    />
                </DialogContent>

                <DialogActions>
                    <Button type='submit'>Confirm</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default PassphraseDialog
