import {
    Box,
    Container,
    Skeleton,
    useMediaQuery,
    useTheme,
} from '@mui/material'

import React from 'react'

const NoteSkeleton = () => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <Container sx={{ mt: 2 }}>
            <Box display='flex' flexDirection='column' gap={2}>
                <Box display='flex' justifyContent='space-between'>
                    <Box display='flex'>
                        <Skeleton variant='circular' width={42} height={42} />
                    </Box>

                    <Box display='flex' gap={1}>
                        <Skeleton variant='circular' width={42} height={42} />
                        <Skeleton variant='circular' width={42} height={42} />
                        <Skeleton variant='circular' width={42} height={42} />
                    </Box>
                </Box>

                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems={matches ? 'flex-end' : ''}
                    flexDirection={matches ? 'row' : 'column'}
                    gap={1}
                >
                    <Box display='flex'>
                        <Skeleton variant='rounded' width={300} height={42} />
                    </Box>

                    <Box display='flex'>
                        <Skeleton variant='rounded' width={200} height={20} />
                    </Box>
                </Box>

                <Skeleton variant='rounded' height={420} />
            </Box>
        </Container>
    )
}

export default NoteSkeleton
