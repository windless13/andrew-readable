import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { InputLabel } from './InputStyles.js';

const Container = styled.div`

`;

const CategorySelect = styled.select`

`;

export const Select = ({
    label,
    value,
    onChange,
    categories,
    errors,
}) => {

    return (
        <Container>
            <InputLabel>{label}</InputLabel>
            <CategorySelect value={value} onChange={onChange}>
                <option selected disabled hidden value=''></option>
                {_.map(categories, category =>
                    <option value={category}>{category}</option>
                )}
            </CategorySelect>
        </Container>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    categories: PropTypes.arrayOf(PropTypes.string),
    errors: PropTypes.shape(),
}


