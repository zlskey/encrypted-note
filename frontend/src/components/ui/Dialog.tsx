import * as ReactDOM from 'react-dom'

import { Dialog as MuiDialog } from '@mui/material'
import React from 'react'

interface DialogProps {
    handleClose: () => void
    isOpen?: boolean
    children: React.ReactNode
}
const Dialog = ({ handleClose, isOpen = true, children }: DialogProps) => {
    return ReactDOM.createPortal(
        <MuiDialog onClose={handleClose} open={isOpen} fullWidth>
            {children}
        </MuiDialog>,
        document.getElementById('root')!
    )
}

export default Dialog
