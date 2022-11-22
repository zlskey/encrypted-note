import * as Yup from 'yup'

import { Box, Button, Container, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import { LoadingButton } from '@mui/lab'
import { PassphraseContext } from 'src/contexts/PassphraseContext'
import TextField from 'src/components/ui/TextField'
import constants from 'src/constants'
import useApi from 'src/hooks/useApi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = Yup.object().shape({
    current: Yup.string().required(constants.error.required),
    passphrase: Yup.string().required(constants.error.required),
    confirm: Yup.string().required(constants.error.required),
})

const ChangePassphrase = () => {
    const api = useApi()
    const setAlert = useContext(AlertContext)
    const { handleSetPassphrase } = useContext(PassphraseContext)
    const navigate = useNavigate()
    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            current: '',
            passphrase: '',
            confirm: '',
        },
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (data: {
        current: string
        passphrase: string
        confirm: string
    }) => {
        if (data.confirm !== data.passphrase) {
            setError('confirm', { message: constants.error.confirm })
            return
        }

        api.user
            .changePassphrase(data.current, data.passphrase)
            .then(() => {
                setAlert(constants.info.changed_passphrase, 'info')
                handleSetPassphrase(data.passphrase)
                navigate('/settings')
            })
            .catch(() => {
                //
            })
    }

    return (
        <Container>
            <Typography variant='h5' sx={{ p: 2 }} textAlign='center'>
                Change passphrase
            </Typography>

            <Box
                maxWidth='25rem'
                component='form'
                sx={{ mt: 1, marginInline: 'auto' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    control={control}
                    name='current'
                    label='Current passphrase'
                    type='passphrase'
                />

                <TextField
                    control={control}
                    name='passphrase'
                    label='New passphrase'
                    type='passphrase'
                />

                <TextField
                    control={control}
                    name='confirm'
                    label='Confirm passphrase'
                    type='passphrase'
                />

                <LoadingButton
                    loading={api.isLoading}
                    type='submit'
                    sx={{ mt: 1, mr: 1 }}
                    variant='outlined'
                >
                    Submit
                </LoadingButton>

                <Button
                    onClick={() => navigate('/settings')}
                    sx={{ mt: 1 }}
                    variant='outlined'
                    color='error'
                >
                    Cancel
                </Button>
            </Box>
        </Container>
    )
}

export default ChangePassphrase
