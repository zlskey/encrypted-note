import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { UserContext } from "@contexts/UserContext"
import InputField from "@components/InputField"
import Button from "@components/Button"
import SlideAnimation from "@components/SlideAnimation"
import { setError, isFormUnfilled, setValid } from "@helpers/InputErrorHandler"
import fetchApi from "@helpers/fetchApi"

const SignUp = ({ action }) => {
    const { setUser, user } = useContext(UserContext)
    const history = useHistory()

    const [username, setUsername] = useState("")
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    useEffect(() => user && history.push("/"), [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isFormUnfilled({ username, password, repeatPassword })) return

        if (password !== repeatPassword) {
            setError(
                "password",
                "Password and second password must be the same"
            )
            setError(
                "repeatPassword",
                "Password and second password must be the same"
            )
            return
        } else {
            setValid("password")
            setValid("repeatPassword")
        }

        const user = { username, password, mail }
        const res = await fetchApi("/auth/signup", user)
        if (res.ok) setUser(res.content)
        else setError("res", res.error)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <SlideAnimation
                start={{ x: 300 }}
                end={{ x: 0 }}
                isVisible={action === "signup"}
            >
                <div className="error res hide"></div>

                <InputField
                    name="username"
                    text="Username*"
                    content={username}
                    setContent={setUsername}
                />
                <InputField
                    name="mail"
                    text="Mail"
                    content={mail}
                    setContent={setMail}
                />
                <InputField
                    name="password"
                    text="Password*"
                    type="password"
                    content={password}
                    setContent={setPassword}
                />
                <InputField
                    name="repeatPassword"
                    text="Repeat password*"
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

export default SignUp