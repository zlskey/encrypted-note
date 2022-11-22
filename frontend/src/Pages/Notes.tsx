import {
    Box,
    Button,
    Container,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import NoteItem, { NoteItemSkeleton } from 'src/components/NoteItem'
import React, { useCallback, useContext, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import { Masonry } from '@mui/lab'
import { PassphraseContext } from 'src/contexts/PassphraseContext'
import SettingsIcon from '@mui/icons-material/Settings'
import { selectNotes } from 'src/reducers/note.reducer'
import useApi from 'src/hooks/useApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const noteSkeletonsRange = new Array(10).fill(true)

const Notes = () => {
    const { isEncrypted, passphrase } = useContext(PassphraseContext)
    const notes = useSelector(selectNotes)

    const api = useApi()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
    const navigate = useNavigate()

    const handleLogout = () => api.user.logout()

    const fetchNotes = useCallback(async () => {
        if (isEncrypted) {
            return
        }

        await api.note.getAll(passphrase)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEncrypted, passphrase])

    useEffect(() => {
        fetchNotes()
    }, [fetchNotes])

    return (
        <>
            <Container>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    sx={{ p: 1, gap: 1 }}
                >
                    <Box>
                        <Tooltip title='Create note'>
                            <IconButton
                                onClick={() => navigate('/note')}
                                size={matches ? 'medium' : 'large'}
                            >
                                <AddIcon color='secondary' />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title='Settings'>
                            <IconButton
                                onClick={() => navigate('/settings')}
                                size={matches ? 'medium' : 'large'}
                            >
                                <SettingsIcon color='secondary' />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Button
                        onClick={handleLogout}
                        endIcon={<LogoutIcon />}
                        variant='contained'
                        color='error'
                    >
                        Logout
                    </Button>
                </Box>

                <Masonry sx={{ m: 0 }} columns={matches ? 3 : 1} spacing={2}>
                    {api.isLoading || isEncrypted
                        ? noteSkeletonsRange.map((el, i) => (
                              <NoteItemSkeleton key={i} />
                          ))
                        : notes.map(note => (
                              <NoteItem note={note} key={note._id} />
                          ))}
                </Masonry>
            </Container>
        </>
    )
}

export default Notes
