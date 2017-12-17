import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants.js';

export const InputLabel = styled.div`
    text-align: left;
    padding: 10px 0;
`;

export const ErrorsMessage = styled.div`
    color: red;
    font-size: 10px;
`;

const FormButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubmitButton = styled.button`
    border-radius: 8px;
    background-color: ${COLORS.darkBlue1};
    width: 80px;
    height: 40px;
    flex-grow: 1;
    margin: 8px 12px;

    &:hover {
        background-color: ${COLORS.darkBlue2};
    }
`;

const Clear = styled.div`

    &:hover {
        cursor: pointer;
        color: red;
    }
`;

export const FormButtons = ({ handleClearForm, handleSubmitForm, edit }) => {
    return (
        <FormButtonWrapper>
            <Clear
                onClick={handleClearForm}
            >
                Clear form
            </Clear>
            <SubmitButton onClick={handleSubmitForm}>
                { edit ? 'Save' : 'Submit' }
            </SubmitButton>
        </FormButtonWrapper>
    );
}