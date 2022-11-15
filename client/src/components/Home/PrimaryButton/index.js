import React from 'react';
import { Button } from 'react-bootstrap';

export default function PrimaryButton(props) {
    return (
        <Button variant="outline-info" size="lg">{props.label}</Button>
    )
}