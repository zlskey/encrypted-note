import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import fetchApi from "@helpers/fetchApi"
import { UserContext } from "@contexts/UserContext"
import { AlertContext } from '@contexts/AlertContext'
import InputField from "@components/InputField"
import Button from "@components/Button"
import SlideAnimation from "@components/SlideAnimation"
import { setError } from "@helpers/InputErrorHandler"

const TryForm = ({ action }) => {
    const { setUser, user } = useContext(UserContext)
    const { setAlert } = useContext(AlertContext)
    const history = useHistory()

    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    useEffect(() => user && history.push("/"), [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetchApi("/auth/signup", { password })

        if (res.ok)
            if (res.ok) {
                setUser(res.content)
                setAlert('success', `Welcome ${res.content.username}`)
            }
            else setError("res", res.error)
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <SlideAnimation
                start={{ x: 300 }}
                end={{ x: 0 }}
                isVisible={action === "try"}
            >
                <p>Use app without entering any personal data.</p>
                <div className="error res hide" />

                <InputField
                    name="password"
                    text="Password"
                    type="password"
                    content={password}
                    setContent={setPassword}
                />
                <InputField
                    name="repeatPassword"
                    text="Repeat password"
                    type="password"
                    content={repeatPassword}
                    setContent={setRepeatPassword}
                />

                <Button content='Confirm' />
            </SlideAnimation>
        </Form>
    )
}

const Form = styled.form`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: 0 30px;
`

export default TryForm