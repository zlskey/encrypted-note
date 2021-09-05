import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { IconCheck } from "@tabler/icons"

const InputField = styled.div`
    margin-top: 10px;
`

const Input = styled.input`
    display: none;
`


const Label = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const Checkbox = styled.div`
    display: grid;
    position: relative;
    place-items: center;
    width: 20px;
    height: 20px;
    background-color: ${props => props.theme.bgColor};
    box-shadow: ${props => props.theme.type === 'light' && props.theme.shadow};
    border-radius: 3px;
`

const Content = styled.p`
    display: inline-block;
`

const RadioField = ({ name, text, isChecked, setIsChecked }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <InputField>
            <Input
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                type='checkbox'
                id={name}
            />

            <Label
                IconCheck={IconCheck}
                isChecked={isChecked}
                theme={theme}
                htmlFor={name}
            >

                <Checkbox theme={theme}>
                    {isChecked && <IconCheck size='100%' color={theme.fontColor} />}
                </Checkbox>

                <Content>{text}</Content>

            </Label>
        </InputField>
    );
}

export default RadioField;