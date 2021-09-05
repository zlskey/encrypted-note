import { useContext, useState } from 'react'
import styled from "styled-components";
import { IconGridDots } from '@tabler/icons';

import CloseOnOuterClick from "@components/CloseOnOuterClick";
import SlideAnimation from "@components/SlideAnimation";
import { ThemeContext } from "@contexts/ThemeContext";
import { UserContext } from '@contexts/UserContext'
import { getSize } from "@helpers/responsiveFacilities";
import fetchApi from "@helpers/fetchApi";
import ThemeSwitch from "./ThemeSwitch";
import EncryptionSettings from "./EncryptionSettings";
import PasswordSettings from './PasswordSettings'

const MenuWrapper = styled.div`
    position: fixed;
    left: 20px;
    bottom:  20px;
`

const MenuButton = styled.button`
    background-color: ${({ theme }) => theme.uiColor};
    box-shadow: ${({ theme }) => theme.shadow};
    border: none;
    outline: none;
    border-radius: 50%;
    width: 50px;
    aspect-ratio: 1/1;
    margin-top: 15px;
`

const MenuDiv = styled.div`
    width: 300px;
    border-radius: 20px;
    font-weight: 300;
    text-align: center;
    overflow: hidden;

    @media screen and (max-width: 450px) {
        width: 90vw;
    }

    h3 {
        font-size: calc(1.4 * ${getSize()})
    }

    p {
        font-size: ${getSize()};
        font-weight: 500;
    }

    background-color: ${({ theme }) => theme.uiColor};
    color: ${({ theme }) => theme.fontColor};
    box-shadow: ${({ theme }) => theme.shadow};
`

const Button = styled.button`
    width: 100%;
    aspect-ratio: 20/3;
    font-size: ${getSize()};
    outline: none;
    border: none;
    color: #fafafa;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-block: 15px;
    font-weight: 500;

    background-color: ${({ color }) => color};
    box-shadow: ${({ theme }) => theme.shadow};
`

const User = styled.div`
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadow};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 8px;

    p {
        font-size: 23px !important;
        font-weight: 300;
    }
`

const Menu = () => {
    const { theme } = useContext(ThemeContext)
    const { setUser, user } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        const res = await fetchApi('/user/logout')

        if (res.ok) setUser(null)
        else console.error(res.error)
    }

    return (
        <MenuWrapper>

            <SlideAnimation isVisible={showMenu} start={{ y: 200 }} end={{ y: 0 }}>
                <CloseOnOuterClick setSomething={setShowMenu}>
                    <MenuDiv theme={theme}>

                        <User theme={theme}>
                            <p>{user.username}</p>
                        </User>

                        <div style={{ padding: '10px 20px' }}>


                            <ThemeSwitch />

                            <PasswordSettings />
                            <EncryptionSettings />

                            <Button onClick={() => logout()} color='#f44336' theme={theme} className='clickable'>
                                Logout
                            </Button>
                        </div>

                    </MenuDiv>
                </CloseOnOuterClick>
            </SlideAnimation>

            <MenuButton theme={theme} onClick={() => setShowMenu(!showMenu)} className='clickable'>
                <IconGridDots color={theme.fontColor} size='30px' />
            </MenuButton>

        </MenuWrapper>
    );
}

export default Menu;