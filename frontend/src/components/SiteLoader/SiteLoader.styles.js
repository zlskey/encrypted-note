import styled from 'styled-components'

export const Loader = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 20rem;
    aspect-ratio: 1/1;
    border-radius: 50%;

    * {
        border-radius: 50%;
        background-color: var(--bg);
        border: 0.5rem solid transparent;
        animation: rotate infinite linear;
        animation-duration: 8s;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .inlineBorders {
        border-inline-color: var(--font);
    }

    .blockBorders {
        border-block-color: var(--font);
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
`
