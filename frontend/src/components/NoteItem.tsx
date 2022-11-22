import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Skeleton,
    Tooltip,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import INote from 'src/types/INote'
import ShareIcon from '@mui/icons-material/Share'
import getLastUpdated from 'src/utils/getLastUpdated'
import { selectUser } from 'src/reducers/user.reducer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NoteItem = ({ note }: { note: INote }) => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    const handleEdit = () => {
        const params = new URLSearchParams({ id: note._id })

        navigate(`/note?${params.toString()}`)
    }

    return (
        <Card onClick={() => handleEdit()} elevation={2}>
            <CardActionArea>
                <CardHeader
                    action={
                        user._id.toString() !== note.authorId.toString() && (
                            <Tooltip title='Shared note'>
                                <ShareIcon color='disabled' />
                            </Tooltip>
                        )
                    }
                    title={note.title}
                    subheader={`Last updated: ${getLastUpdated(
                        note.updatedAt
                    )}`}
                />

                <CardContent>
                    <Typography maxHeight={150} noWrap whiteSpace='normal'>
                        {note.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export const NoteItemSkeleton = () => {
    const [height, setHeight] = useState(getHeight())

    useEffect(() => {
        const interval = setInterval(handleSetHeight, 1500)

        return () => clearInterval(interval)
    }, [])

    const handleSetHeight = () => setHeight(getHeight())

    return <Skeleton height={height} variant='rounded' />
}

const getHeight = () => Math.random() * (250 - 100) + 100

export default NoteItem
