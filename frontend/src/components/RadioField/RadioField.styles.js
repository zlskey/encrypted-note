import styled from 'styled-components'

export const InputField = styled.div`
    margin-top: 10px;

    * {
        cursor: pointer;
    }
`

export const Input = styled.input`
    display: none;
`

export const Label = styled.label`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const Checkbox = styled.div`
    display: grid;
    position: relative;
    place-items: center;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    background-color: var(--bg);
    box-shadow: var(--shadow);
`

export const Content = styled.p`
    display: inline-block;
`
