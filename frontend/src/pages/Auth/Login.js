import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory, Link } from 'react-router-dom'

import fetchApi from "@helpers/fetchApi"
import { UserContext } from "@contexts/UserContext"
import InputField from "@components/InputField"
import RadioField from "@components/RadioField"
import Button from "@components/Button"
import SlideAnimation from "@components/SlideAnimation"
import { setError, isFormUnfilled } from "@helpers/InputErrorHandler"
import { ThemeContext } from "@contexts/ThemeContext"

const Login = ({ action }) => {
    const { setUser, user } = useContext(UserContext)
    const { theme } = useContext(ThemeContext)
    const history = useHistory()

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [dontLogout, setDontLogout] = useState(false)

    useEffect(() => user && history.push("/"), [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isFormUnfilled({ login, password })) return

        const data = { login, password, dontLogout }
        const res = await fetchApi("/auth/login", data)
        if (res.ok) setUser(res.content)
        else setError("res", res.error)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <SlideAnimation
                start={{ x: -300 }}
                end={{ x: 0 }}
                isVisible={action === "login"}
            >
                <div className="error res hide"></div>
                <InputField
                    name="login"
                    text="Login"
                    content={login}
                    setContent={setLogin}
                />
                <InputField
                    name="password"
                    text="Password"
                    type="password"
                    content={password}
                    setContent={setPassword}
                />

                <LoginBar>
                    <RadioField
                        name="expiring"
                        text="Don't logout"
                        isChecked={dontLogout}
                        setIsChecked={setDontLogout}
                    />

                    <Separator theme={theme} />

                    <Link style={{ textDecoration: 'none', color: theme.fontColor, fontWeight: 300, fontSize: '19px' }} to="/password-recovery">
                        Reset password
                    </Link>
                </LoginBar>

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

const LoginBar = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    gap: 10px;
    margin-block: 10px;
`

const Separator = styled.div`
    height: 20px;
    width: 1px;
    background-color: ${(props) => props.theme.fontColor};
`

export default Login