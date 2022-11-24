import React from 'react';
import { Button } from 'react-bootstrap';

export default function PrimaryButton(props) {
    return (
        <Button variant={props.variant} size="lg" type={props.type} onClick={props.onClick} >{props.label}</Button>
    )
}