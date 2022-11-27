import React from 'react';
import { Form } from 'react-bootstrap';

export default function FormComponent({ children, ...props }) {
    return (
        <Form noValidate {...props}>{children}</Form>
    )
}