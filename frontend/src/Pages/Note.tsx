import {
    Box,
    Card,
    Container,
    IconButton,
    InputBase,
    Paper,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AlertContext } from 'src/contexts/AlertContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import INote from 'src/types/INote'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import NoteSkeleton from 'src/components/NoteSkeleton'
import { PassphraseContext } from 'src/contexts/PassphraseContext'
import SaveIcon from '@mui/icons-material/Save'
import ShareDialog from 'src/components/Dialogs/ShareDialog'
import ShareIcon from '@mui/icons-material/Share'
import constants from 'src/constants'
import getLastUpdated from 'src/utils/getLastUpdated'
import { selectUser } from 'src/reducers/user.reducer'
import useApi from 'src/hooks/useApi'
import { useSelector } from 'react-redux'

const NoteEditor = () => {
    const user = useSelector(selectUser)

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    const [showShareDialog, setShowShareDialog] = useState(false)
    const [note, setNote] = useState<INote | null>(null)
    const [isUpdated, setIsUpdated] = useState(false)

    const [title, setTitle] = useState(
        user.encryption ? 'My safe note' : 'My note'
    )
    const [content, setContent] = useState('')

    const api = useApi()
    const setAlert = useContext(AlertContext)
    const { isEncrypted, passphrase } = useContext(PassphraseContext)

    const handleDelete = async () => {
        if (note) {
            await api.note.delete(note)
            navigate('/')
        }
    }

    const handleUnlink = async () => {
        if (note) {
            await api.note.unshare(note, user.username)
            navigate('/')
        }
    }

    const handleSave = async () => {
        const updatedNote = note
            ? await api.note.update(note._id, title, content)
            : await api.note.create(title, content)

        setNote(updatedNote)
        setAlert(constants.success.saved, 'success')
    }

    const fetchNote = useCallback(() => {
        if (note || isEncrypted) return

        const id = searchParams.get('id')

        if (!id) return

        api.note
            .getOne(id, passphrase)
            .then(data => setNote(data))
            .catch(() => navigate('/'))
    }, [api.note, navigate, searchParams, note, passphrase, isEncrypted])

    useEffect(() => {
        if (!note) return

        setSearchParams({ id: note._id })

        setTitle(() => note.title)
        setContent(() => note.content)
    }, [note, setSearchParams])

    useEffect(() => {
        if (!note) {
            setIsUpdated(Boolean(content && title))
            return
        }

        const isChanged = note.content !== content || note.title !== title

        setIsUpdated(isChanged)
    }, [content, title, note])

    useEffect(() => {
        fetchNote()
    }, [fetchNote])

    if (api.isLoading || isEncrypted) return <NoteSkeleton />

    return (
        <Container sx={{ mt: 2 }}>
            {note && (
                <ShareDialog
                    isOpen={showShareDialog}
                    handleClose={() => setShowShareDialog(false)}
                    noteId={note._id}
                />
            )}

            <Box display='flex' flexDirection='column' gap={2}>
                <Box display='flex' justifyContent='space-between'>
                    <Tooltip title='Go back'>
                        <IconButton onClick={() => navigate('/')}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>

                    <Box display='flex' gap={1}>
                        <Tooltip
                            hidden={!note || note.authorId !== user._id}
                            title='Delete note'
                        >
                            <span>
                                <IconButton onClick={handleDelete}>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip
                            hidden={!note || note.authorId !== user._id}
                            title='Share note'
                        >
                            <span>
                                <IconButton
                                    onClick={() => setShowShareDialog(true)}
                                >
                                    <ShareIcon />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip
                            hidden={!note || note.authorId === user._id}
                            title='Remove note'
                        >
                            <span>
                                <IconButton onClick={handleUnlink}>
                                    <LinkOffIcon />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title='Save changes'>
                            <span>
                                <IconButton
                                    disabled={!isUpdated}
                                    onClick={handleSave}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                </Box>

                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems={matches ? 'flex-end' : ''}
                    flexDirection={matches ? 'row' : 'column'}
                >
                    <InputBase
                        multiline={false}
                        value={title}
                        onChange={event => setTitle(event.currentTarget.value)}
                        sx={{ fontSize: theme.typography.h4 }}
                        fullWidth
                        spellCheck={false}
                    />

                    {note && (
                        <Typography whiteSpace='nowrap'>
                            Last updated: {getLastUpdated(note.updatedAt)}
                        </Typography>
                    )}
                </Box>

                <Paper elevation={4} sx={{ p: 2 }}>
                    <InputBase
                        autoFocus={!searchParams.get('id')}
                        value={content}
                        onChange={event =>
                            setContent(event.currentTarget.value)
                        }
                        multiline
                        fullWidth
                        minRows={15}
                        spellCheck={false}
                    />
                </Paper>
            </Box>
        </Container>
    )
}

export default NoteEditor
