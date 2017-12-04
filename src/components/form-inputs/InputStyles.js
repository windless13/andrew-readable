import React from 'react';
import styled from 'styled-components';

export const InputLabel = styled.div`
    padding: 10px 0;
`;

export const ErrorsMessage = styled.div`
    color: red;
    font-size: 10px;
`;

const FormButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SubmitButton = styled.button`
`;

const ClearButton = styled.button`
`;

export const FormButtons = ({ handleClearForm, handleSubmitForm, edit }) => {
    return (
        <FormButtonWrapper>
            <SubmitButton onClick={handleSubmitForm}>
                { edit ? 'Save' : 'Submit' }
            </SubmitButton>
            <ClearButton
                onClick={handleClearForm}
            >
                Clear form
            </ClearButton>
        </FormButtonWrapper>
    );
}