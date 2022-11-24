import React from 'react';
import { Form, Col } from 'react-bootstrap';

export default function Input(props) {
    return (
        <>
            <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    type={props.type}
                    {...props.hookForm}
                    isInvalid={!!props.error}
                />
                <Form.Control.Feedback type="invalid">
                    {!!props.error ? props.error.message : ''}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    )
}