import * as Yup from 'yup'

import {
    Avatar,
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Link,
    Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import React, { useContext } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import { LoadingButton } from '@mui/lab'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link as ReactRouterLink } from 'react-router-dom'
import TextField from 'src/components/ui/TextField'
import constants from 'src/constants'
import useApi from 'src/hooks/useApi'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = Yup.object().shape({
    username: Yup.string().required(constants.error.required),
    password: Yup.string()
        .required(constants.error.required)
        .min(8, constants.error.password_length_min)
        .max(50, constants.error.password_length_max),
    confirm: Yup.string().required(constants.error.required),
})

interface IFormInputs {
    username: string
    password: string
    confirm: string
    remember: boolean
}

export default function SignUp() {
    const setAlert = useContext(AlertContext)
    const api = useApi()
    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            username: '',
            password: '',
            confirm: '',
            remember: false,
        },
        reValidateMode: 'onChange',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (data: IFormInputs) => {
        if (data.confirm !== data.password) {
            setError('confirm', { message: constants.error.confirm })
            return
        }

        await api.user.signUp(data)

        setAlert('Welcome ❤️', 'success')
    }

    return (
        <Container
            sx={{
                display: 'grid',
                placeItems: 'center',
                height: '100vh',
            }}
        >
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{ maxWidth: '30rem' }}
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                </Box>

                <TextField
                    autoComplete='username'
                    control={control}
                    label='Username'
                    name='username'
                />

                <TextField
                    autoComplete='current-password'
                    control={control}
                    label='Password'
                    name='password'
                    type='password'
                />

                <TextField
                    control={control}
                    label='Confirm password'
                    name='confirm'
                    type='password'
                />

                <Controller
                    name='remember'
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox color='primary' {...field} />}
                            label='Remember me'
                        />
                    )}
                />

                <LoadingButton
                    loading={api.isLoading}
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Confirm
                </LoadingButton>

                <Link to='/login' component={ReactRouterLink} variant='body2'>
                    Already have account? Login
                </Link>
            </Box>
        </Container>
    )
}
