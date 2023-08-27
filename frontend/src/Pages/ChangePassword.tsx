import * as Yup from 'yup'

import { Box, Button, Container, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import { LoadingButton } from '@mui/lab'
import TextField from 'src/components/ui/TextField'
import constants from 'src/constants'
import useApi from 'src/hooks/useApi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = Yup.object().shape({
    current: Yup.string().required(constants.error.required),
    password: Yup.string()
        .required(constants.error.required)
        .min(8, constants.error.password_length_min)
        .max(50, constants.error.password_length_max),
    confirm: Yup.string().required(constants.error.required),
})

const ChangePassword = () => {
    const api = useApi()
    const setAlert = useContext(AlertContext)
    const navigate = useNavigate()
    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            current: '',
            password: '',
            confirm: '',
        },
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (data: {
        current: string
        password: string
        confirm: string
    }) => {
        if (data.confirm !== data.password) {
            setError('confirm', { message: constants.error.confirm })
            return
        }

        api.user
            .changePassword(data.current, data.password)
            .then(() => {
                setAlert(constants.info.changed_password, 'info')
                navigate('/settings')
            })
            .catch(() => {
                //
            })
    }

    return (
        <Container>
            <Typography variant='h5' sx={{ p: 2 }} textAlign='center'>
                Change password
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
                    label='Current password'
                    type='password'
                />

                <TextField
                    control={control}
                    name='password'
                    label='New password'
                    type='password'
                />

                <TextField
                    control={control}
                    name='confirm'
                    label='Confirm password'
                    type='password'
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

export default ChangePassword
