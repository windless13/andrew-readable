import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { InputLabel, ErrorsMessage } from './InputStyles.js';

const Container = styled.div`

`;

const Input = styled.input`

`;

export const TextInput = ({
    label,
    value,
    onChange,
    errors,
    updateErrors,
}) => {
    let hasError = errors && (errors.title && label === 'Title'
        || errors.author && label === 'Author');

    const handleOnFocus = () => {
        console.log('focus');
        console.log(this);
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
