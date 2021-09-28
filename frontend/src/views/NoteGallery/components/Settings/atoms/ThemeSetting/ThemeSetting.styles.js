import styled from 'styled-components'

export const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
`

export const Switch = styled.label`
    border-radius: 100px;
    height: 25px;
    aspect-ratio: 2/1;
    box-sizing: content-box;
    cursor: pointer;
    border: 3px solid var(--bg);
    background-color: var(--bg);
    box-shadow: var(--shadow);

    & > input:checked + label {
        transform: translateX(100%);
    }

    label {
        content: '';
        width: 25px;
        aspect-ratio: 1/1;
        cursor: pointer;
        border-radius: 50%;
        transition: 0.2s;
        display: inline-block;
        background-color: var(--font);
    }
`
