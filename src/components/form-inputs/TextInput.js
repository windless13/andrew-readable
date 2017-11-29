import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { InputLabel } from './InputStyles.js';

const Container = styled.div`

`;

const Input = styled.input`

`;

export const TextInput = ({
    label,
    value,
    onChange,
    errors
}) => {

    return (
        <Container>
            <InputLabel>{label}</InputLabel>
            <Input
                onChange={onChange}
                value={value}
            />
        </Container>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.shape(),
}
