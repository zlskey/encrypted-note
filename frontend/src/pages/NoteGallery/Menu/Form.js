import styled from "styled-components";
import { useContext } from "react";

import { ThemeContext } from '@contexts/ThemeContext';
import CloseOnOuterClick from "@components/CloseOnOuterClick";
import Button from "@components/Button";


const StyledForm = styled.form`
    width: 70%;
    margin: 0 auto;
    margin-bottom: 20px;
`

const Form = ({ children, handleSubmit, setShowForm }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <CloseOnOuterClick setSomething={setShowForm}>
            <StyledForm onSubmit={e => handleSubmit(e)} >
                {children}
                <Button content='Confirm' />
                <div className="res error hide"></div>
            </StyledForm>
        </CloseOnOuterClick>
    );
}

export default Form;