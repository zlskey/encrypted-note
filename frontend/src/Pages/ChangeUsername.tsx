import * as Yup from 'yup'

import { Box, Button, Container, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import { LoadingButton } from '@mui/lab'
import TextField from 'src/components/ui/TextField'
import constants from 'src/constants'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = Yup.object().shape({
    username: Yup.string().required(constants.error.required),
})

const ChangeUsername = () => {
    const user = useSelector(selectUser)
    const api = useApi()
    const navigate = useNavigate()
    const setAlert = useContext(AlertContext)
    const { control, handleSubmit } = useForm({
        defaultValues: { username: user.username },
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (data: { username: string }) => {
        api.user
            .changeUsername(data.username)
            .then(() => {
                setAlert(constants.info.changed_username, 'info')
                navigate('/settings')
            })
            .catch(() => {})
    }

    return (
        <Container>
            <Typography variant='h5' sx={{ p: 2 }} textAlign='center'>
                Change username
            </Typography>

            <Box
                maxWidth='25rem'
                component='form'
                sx={{ mt: 1, marginInline: 'auto' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    control={control}
                    name='username'
                    label='New username'
                />

                <LoadingButton
                    type='submit'
                    loading={api.isLoading}
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

export default ChangeUsername
