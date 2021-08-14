import styled from "styled-components";
import { useContext } from "react";

import { getSize } from "@helpers/responsiveFacilities";
import { ThemeContext } from '@contexts/ThemeContext';
import CloseOnOuterClick from "@components/CloseOnOuterClick";

const StyledForm = styled.form`
    width: 70%;
    margin: 0 auto;
    margin-bottom: 20px;
`

const Button = styled.button`
    width: 50%;
    background-color: #3f51b5;
    color: #fafafa;
    padding-block: 10px;
    aspect-ratio: 20/3;
    border: none;
    outline: none;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: calc(0.9 * ${getSize()});
    box-shadow: ${({ theme }) => theme.shadow}
`

const Form = ({ children, handleSubmit, setShowForm }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <CloseOnOuterClick setSomething={setShowForm}>
            <StyledForm onSubmit={e => handleSubmit(e)} >
                {children}
                <Button className='clickable' theme={theme}>Confirm</Button>
                <div className="res error hide"></div>
            </StyledForm>
        </CloseOnOuterClick>
    );
}

export default Form;