import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants.js';

const StyledButton = styled.button`
    border: 1px solid black;
    background-color: ${props => props.color};
    border-radius: 8px;
    margin-right: 8px;

    &:hover {
        background-color: ${props => props.hoverColor};
        cursor: pointer;
    }
`;

export function Button({
    color,
    hoverColor,
    children,
    onClick,
}) {
    return (
        <StyledButton
            color={color}
            hoverColor={hoverColor}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
}

export function EditButton(props) {
    return (
        <Button color={COLORS.lightBlue1} hoverColor={COLORS.lightBlue2} onClick={props.onClick}>
            Edit
        </Button>
    )
}

export function DeleteButton(props) {
    return (
        <Button color={COLORS.red1} hoverColor={COLORS.red2} onClick={props.onClick}>
            Delete
        </Button>
    );
}
