import {
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React, { useState } from 'react'

import ChangePasswordDialog from './Dialogs/ChangePasswordDialog'
import EncryptionDialog from './Dialogs/EncryptionDialog'
import LockIcon from '@mui/icons-material/Lock'
import LockResetIcon from '@mui/icons-material/LockReset'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useSelector } from 'react-redux'

function MenuDropdown() {
    const [isPassDialogVisible, setIsPassDialogVisible] = useState(false)
    const [isEncryptionDialogVisible, setisEncryptionDialogVisible] =
        useState(false)
    const user = useSelector(selectUser)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const api = useApi()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    const open = Boolean(anchorEl)

    const toggleChangePasswordDialog = () => {
        setIsPassDialogVisible(value => !value)
    }

    const toggleEncryptionDialog = () => {
        setisEncryptionDialogVisible(value => !value)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    const handleLogout = () => api.user.logout()

    return (
        <>
            <ChangePasswordDialog
                isOpen={isPassDialogVisible}
                handleClose={toggleChangePasswordDialog}
            />
            <EncryptionDialog
                isOpen={isEncryptionDialogVisible}
                handleClose={toggleEncryptionDialog}
            />

            <Tooltip title='Account settings'>
                <IconButton
                    onClick={handleClick}
                    size={matches ? 'medium' : 'large'}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                >
                    <SettingsIcon color='secondary' />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={toggleEncryptionDialog}>
                    <ListItemIcon>
                        <LockIcon fontSize='small' />
                    </ListItemIcon>
                    {user.encryption ? 'Change' : 'Set'} encryption passphrase
                </MenuItem>

                <MenuItem onClick={toggleChangePasswordDialog}>
                    <ListItemIcon>
                        <LockResetIcon fontSize='small' />
                    </ListItemIcon>
                    Change Password
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default MenuDropdown
