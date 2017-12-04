import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-fa'

import styled from 'styled-components';
import { COLORS } from '../constants.js';
import PropTypes from 'prop-types';
import FaBeer from 'react-icons/lib/fa/beer';

var FontAwesome = require('react-fontawesome');
const Container = styled.div`
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



