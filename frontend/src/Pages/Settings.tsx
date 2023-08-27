import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CardActionArea,
    Container,
    IconButton,
    Paper,
    Switch,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Settings = () => {
    const api = useApi()
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const toggleDarkTheme = () => api.user.toggleLightMode()
    const toggleTimeouts = () => api.user.toggleTimeout()

    return (
        <Container>
            <Box>
                <Toolbar>
                    <Tooltip title='Go back' sx={{ mr: 2 }}>
                        <IconButton onClick={() => navigate('/')}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography variant='h5' flexGrow={1} textAlign='center'>
                        Settings
                    </Typography>
                </Toolbar>
            </Box>

            <Accordion disableGutters={true} elevation={2}>
                <AccordionSummary>
                    <SettingsHeader
                        title='Account'
                        subtitle='Manage your account details'
                        icon={<AccountCircleIcon fontSize='large' />}
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <SettingsItem
                        title='Username'
                        subtitle='Change your username'
                        icon={<PermContactCalendarIcon fontSize='large' />}
                        onClick={() => navigate('/settings/username')}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters={true} sx={{ mt: 2 }}>
                <AccordionSummary>
                    <SettingsHeader
                        title='Security'
                        subtitle='Change your password or passphrase'
                        icon={<HealthAndSafetyIcon fontSize='large' />}
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <SettingsItem
                        title='Password'
                        subtitle='Change password to your account'
                        icon={<VpnKeyIcon fontSize='large' />}
                        onClick={() => navigate('/settings/password')}
                    />

                    <SettingsItem
                        title='Passphrase'
                        subtitle='Change your encryption passphrase'
                        icon={<EnhancedEncryptionIcon fontSize='large' />}
                        onClick={() => navigate('/settings/passphrase')}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters={true} sx={{ mt: 2 }}>
                <AccordionSummary>
                    <SettingsHeader
                        title='Design'
                        subtitle='Change theme and loading timeout'
                        icon={<FormatPaintIcon fontSize='large' />}
                    />
                </AccordionSummary>

                <AccordionDetails>
                    <SettingsItem
                        title='Dark theme'
                        subtitle='Toggle dark theme (change on your own risk)'
                        icon={<DarkModeIcon fontSize='large' />}
                        customSwitch={<Switch checked={!user.lightMode} />}
                        onClick={toggleDarkTheme}
                    />

                    <SettingsItem
                        title='Timeout'
                        subtitle='Get additional 500ms timeout to appreciate those cool loading screens'
                        icon={<AvTimerIcon fontSize='large' />}
                        customSwitch={<Switch checked={user.timeout} />}
                        onClick={toggleTimeouts}
                    />
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}

interface SettingsHeaderProps {
    title: string
    subtitle: string
    icon: React.ReactNode
}
const SettingsHeader = ({ title, subtitle, icon }: SettingsHeaderProps) => {
    return (
        <Box display='flex' gap={2} alignItems='center'>
            {icon}

            <Box>
                <Typography variant='h6'>{title}</Typography>
                <Typography>{subtitle}</Typography>
            </Box>
        </Box>
    )
}

interface SettingsItemProps {
    title: string
    subtitle: string
    icon: React.ReactNode
    customSwitch?: React.ReactNode
    onClick?: () => void
}
const SettingsItem = ({
    title,
    subtitle,
    icon,
    customSwitch,
    onClick,
}: SettingsItemProps) => {
    return (
        <Paper elevation={5}>
            <CardActionArea onClick={onClick} sx={{ p: 1, pl: 2, mb: 2 }}>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Box display='flex' gap={2} alignItems='center'>
                        {icon}

                        <Box>
                            <Typography variant='subtitle1'>{title}</Typography>

                            <Typography variant='subtitle2'>
                                {subtitle}
                            </Typography>
                        </Box>
                    </Box>

                    {customSwitch}
                </Box>
            </CardActionArea>
        </Paper>
    )
}

export default Settings
