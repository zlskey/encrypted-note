import { useContext, useState } from 'react'
import styled from "styled-components";
import { IconMoonStars, IconBrightness2, } from '@tabler/icons';

import { ThemeContext } from '@contexts/ThemeContext';
import { getSize } from "@helpers/responsiveFacilities";
import fetchApi from '@helpers/fetchApi';
import Alert from '@components/Alert';

const Switch = styled.div`
    border-radius: 9999px;
    height: calc(1.5 * ${getSize()});
    aspect-ratio: 2/1;
    position: relative;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-sizing: content-box;
    cursor: pointer;    


    &::after {
        content: '';
        width: calc(1.5 * ${getSize()});
        aspect-ratio: 1/1;
        border-radius: 50%;
        transition: 0.3s;
        display: inline-block;
        
        transform: ${({ theme }) => theme.type === 'light' ? 'translateX(100%)' : ''};

        background-color: ${({ theme }) => theme.fontColor};
    }
        
    border: 3px solid ${({ theme }) => theme.bgColor};
    background-color: ${({ theme }) => theme.bgColor};
    box-shadow: ${({ theme }) => theme.shadow};
`

const ThemeDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0 20px;
    margin-block: 10px;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
`

const ThemeSwitch = () => {
    const { theme, setIsDarkTheme } = useContext(ThemeContext)
    const [alertContent, setAlertContent] = useState('');

    const handleClick = async () => {
        const res = await fetchApi('/settings/theme', {}, 'PATCH')
        if (res.ok) setIsDarkTheme(prev => !prev)
        else setAlertContent(res.error)
    }

    return (
        <>
            <Alert content={alertContent} setContent={setAlertContent} />
            <ThemeDiv>

                <p>Theme:</p>

                <span>
                    <IconMoonStars />
                    <Switch theme={theme} onClick={() => handleClick()} />
                    <IconBrightness2 />
                </span>

            </ThemeDiv>
        </>
    );
}

export default ThemeSwitch;