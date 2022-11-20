import { useContext, useState } from 'react'

import { AlertContext } from 'src/contexts/AlertContext'
import HttpService from 'src/services/http.service'
import NoteService from 'src/services/note.service'
import UserService from 'src/services/user.service'
import { useDispatch } from 'react-redux'

const useApi = () => {
    const [isLoading, setisLoading] = useState(false)

    const setAlert = useContext(AlertContext)
    const dispatch = useDispatch()

    const http = new HttpService(setAlert, (value: boolean) => {
        setisLoading(value)
    })

    const user = new UserService(dispatch, http)
    const note = new NoteService(dispatch, http)

    return {
        user,
        note,
        isLoading,
    }
}

export default useApi
