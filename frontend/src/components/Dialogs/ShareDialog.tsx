import {
    Box,
    Chip,
    DialogContent,
    DialogTitle,
    IconButton,
    InputBase,
    Paper,
    Skeleton,
    Tooltip,
    Typography,
} from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '../ui/Dialog'
import INote from 'src/types/INote'
import { selectNote } from 'src/reducers/note.reducer'
import useApi from 'src/hooks/useApi'
import { useSelector } from 'react-redux'

interface DialogProps {
    isOpen: boolean
    handleClose: () => void
    noteId: INote['_id']
}

const ShareDialog = ({ isOpen, handleClose, noteId }: DialogProps) => {
    const [recipients, setRecipients] = useState<string[] | null>(null)
    const [username, setUsername] = useState('')

    const setAlert = useContext(AlertContext)
    const note = useSelector(selectNote(noteId))
    const api = useApi()

    const fetchRecipients = useCallback(async () => {
        if (recipients) {
            return
        }

        const updatedRecipients = await api.note.getRecipients(note)

        setRecipients(updatedRecipients)
    }, [api.note, recipients, note])

    const handleUnshare = async (username: string) => {
        await api.note.unshare(note, username)

        setRecipients(null)
        setAlert(
            `User ${username} will no longer have access to this note`,
            'success'
        )
    }

    const handleShare = async (
        event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const button = event.code
        const username = event.currentTarget.value

        if (button !== 'Enter' || !username) {
            return
        }

        await api.note.share(note, username)

        setRecipients(null)
        setUsername('')
        setAlert(
            `User ${username} successfuly granted access to this note`,
            'success'
        )
    }

    useEffect(() => {
        fetchRecipients()
    }, [fetchRecipients, note.recipients])

    return (
        <Dialog isOpen={isOpen} handleClose={handleClose}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Share note
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

            <DialogContent sx={{ overflowX: 'hidden' }}>
                <Paper sx={{ p: 1, my: 1, whiteSpace: 'nowrap' }} elevation={2}>
                    Add user:{' '}
                    <InputBase
                        onChange={e => setUsername(e.target.value)}
                        onKeyUp={handleShare}
                        value={username}
                        placeholder='username'
                        fullWidth
                        rows={1}
                    />
                </Paper>

                <Paper
                    hidden={!note.recipients.length}
                    sx={{ p: 1, my: 1 }}
                    elevation={2}
                >
                    <Typography sx={{ mb: 1 }}>Users with access:</Typography>

                    <Box display='flex' gap={1}>
                        {recipients
                            ? recipients.map(username => (
                                  <Tooltip
                                      key={username}
                                      title='Click to remove access'
                                  >
                                      <Chip
                                          label={username}
                                          onClick={() =>
                                              handleUnshare(username)
                                          }
                                      />
                                  </Tooltip>
                              ))
                            : note.recipients.map((el, index) => (
                                  <Skeleton
                                      width={100}
                                      key={index}
                                      variant='rounded'
                                  >
                                      <Chip />
                                  </Skeleton>
                              ))}
                    </Box>
                </Paper>
            </DialogContent>
        </Dialog>
    )
}

export default ShareDialog
