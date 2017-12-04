import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputLabel, ErrorsMessage } from './InputStyles.js';

const Container = styled.div`

`;

const Input = styled.textarea`

`;

export const TextAreaInput = ({
    label,
    value,
    onChange,
    errors,
    updateErrors,
}) => {
    let hasError = errors && errors.body;

    const handleOnFocus = () => {
        updateErrors('body', false);
    }

    return (
        <Container>
            <InputLabel>{label}</InputLabel>
            <Input
                onFocus={handleOnFocus}
                onChange={onChange}
                value={value}
            />
            { hasError &&
                <ErrorsMessage>Please include your post!</ErrorsMessage>
            }
        </Container>
    );
};

TextAreaInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.shape(),
}
