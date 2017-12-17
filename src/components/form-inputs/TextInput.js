import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputLabel, ErrorsMessage } from './InputStyles.js';

const Container = styled.div`
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    font-size: 14px;
    border: 1px solid black;
`;

export const TextInput = ({
    label,
    value,
    onChange,
    errors,
    updateErrors,
}) => {
    let hasError = errors && ((errors.title && label === 'Title')
        || (errors.author && label === 'Author'));

    const handleOnFocus = () => {
        updateErrors((label === 'Title' && 'title') || (label === 'Author' && 'author'), false);
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
                <ErrorsMessage>{label} cannot be blank</ErrorsMessage>
            }
        </Container>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.shape(),
    updateErrors: PropTypes.func,
}
