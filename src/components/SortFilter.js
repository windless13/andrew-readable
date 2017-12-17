import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'react-fa'
import DownIcon from '../icons/icon-down.png';
import { COLORS } from '../constants.js';

const Filter = styled.select`
    height: 40px;
    border: 1px solid black;
    border-radius: 4px;
    outline: none;
    padding-right: 30px;
    text-align: center;
    appearance: none;
    background-size: contain;
    background: ${COLORS.gray1} url(${DownIcon}) no-repeat right center/20px 20px;

    padding-left: 10px;
    text-align-last: left;


    select {
        padding: 5px 8px;
        width: 130%;
        border: none;
        box-shadow: none;
        background: transparent;
        background-image: none;
        -webkit-appearance: none;
    }
`;

export default function SortFilter({
    onSelectFilter,
    value,
}) {
    return (
        <Filter
            value={value}
            onChange={onSelectFilter}
        >
            <Icon
                name="DownIcon"
                size='2x'
                style={{ color: 'red' }}
                className="fa fa-caret-down"
            />
            <option disabled hidden value=''></option>
            <option value='timestamp'>Timestamp</option>
            <option value='vote'>Vote</option>
        </Filter>
    );
}
