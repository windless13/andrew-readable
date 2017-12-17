import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../constants.js';
import FaBeer from 'react-icons/lib/fa/beer';
import { Icon } from 'react-fa'

var FontAwesome = require('react-fontawesome');
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default function Vote({ score, onIncrement, onDecrement }) {
    return (
        <Container>
            <Icon
                name="UpIcon"
                size='2x'
                style={{ color: 'green' }}
                className="fa fa-caret-up"
                onClick={onIncrement}
            />
            {score}
            <Icon
                name="DownIcon"
                size='2x'
                style={{ color: 'red' }}
                className="fa fa-caret-down"
                onClick={onDecrement}
            />
        </Container>
    );
}

Vote.propTypes = {
    score: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
}
