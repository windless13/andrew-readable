import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { InputLabel, ErrorsMessage } from './InputStyles.js';

const Container = styled.div`

`;

const CategorySelect = styled.select`
    height: 50px;


`;

export const Select = ({
    label,
    value,
    onChange,
    categories,
    errors,
    updateErrors,
}) => {
    let hasError = errors && errors.category;

    return (
        <Container>
            <InputLabel>{label}</InputLabel>
            <CategorySelect
                value={value}
                onChange={(event) => {
                    if (event.target.value) {
                        updateErrors('category', false);
                    }
                    onChange(event);
                }}
            >
                {/* List of options in dropdown */}
                <option disabled hidden value=''></option>

                {_.map(categories, category =>
                    <option key={category} value={category}>{category}</option>
                )}
            </CategorySelect>

            { hasError &&
                <ErrorsMessage>Please choose a category.</ErrorsMessage>
            }
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
