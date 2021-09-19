import styled from 'styled-components';
import { useState } from 'react';
import CloseOnOuterClick from '@components/CloseOnOuterClick'

const SettingComponent = ({ description, value, children, setShowSetting, showSetting }) => (
    <Content>
        <Preview>
            {description}
            <span onClick={() => setShowSetting(currentValue => !currentValue)} >
                {value}
            </span>
        </Preview>

        {showSetting && children}
    </Content>
)

const Preview = styled.p`
    span {
        color: #1b5e20;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 18px;
    margin-block: 1rem;

    form {
        margin: 0 auto;
        margin-top: -15px;
        transform: scale(0.95);
        width: 80%;
    }
`

export default SettingComponent;