import { Controller } from 'react-hook-form'
import { TextField as MuiTextField } from '@mui/material'
import React from 'react'

interface Props {
    autoComplete?: string
    control: any
    label: string
    name: string
    type?: string
    required?: boolean
    autoFocus?: boolean
}

const TextField = ({ label, name, control, ...props }: Props) => {
    return (
        <Controller
            control={control}
            name={name}
            render={data => (
                <MuiTextField
                    fullWidth
                    margin='normal'
                    type='text'
                    label={label}
                    helperText={data.fieldState.error?.message || ''}
                    error={!!data.fieldState.error}
                    {...props}
                    {...data.field}
                />
            )}
        />
    )
}

export default TextField
