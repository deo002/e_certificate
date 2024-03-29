import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../Input';
import FormComponent from '../FormComponent';
import Heading from '../Heading';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../PrimaryButton';
import { Alert } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './Schema';

export default function SignIn() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const { signin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onSubmit = async (data) => {
    try {
      setErr('');
      setLoading(true);
      const { 
        email,
        password 
      } = data;
      await signin(email, password);
      navigate('/');
    } catch (e) {
      console.error(e);
      setLoading(false);
      setErr(e.message);
    }
  };

  return (
    <div  className="text-center">
      <FormComponent onSubmit={handleSubmit(onSubmit)}>
          <Col>
            <Heading>Sign In</Heading>
            <Alert variant="danger" show={!!err}>{err}</Alert>
            <Input
              label="Email"
              type="text"
              error={errors.email}
              hookForm={register('email')}
            />
            <Input
              label="Password"
              type="password"
              error={errors.password}
              hookForm={register('password')}
            />  
            <PrimaryButton state={loading} label="Submit" type="submit" variant="success" />
          </Col>
      </FormComponent>
    </div>
  );
}