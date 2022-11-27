import React from 'react';
import '../../../App.css';
import './index.css';
import PrimaryButton from '../../PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function HeroSection() {

  const navigate = useNavigate();

  return (
    <>
    <div className='hero-container'>
      <div className='image-container'>
        <img src='/images/iiitn_3d_logo.png' alt='IIITN' />
      </div>
      <h1>Indian Institute of Information Technology, Nagpur</h1>
      <Row>
            <Col><PrimaryButton label="Institution" variant="outline-info" onClick={() => {navigate("/form");}} /></Col>
            <Col><PrimaryButton label="Graduates" variant="outline-info" onClick={() => {navigate("/");}} /></Col>
            <Col><PrimaryButton label="Companies" variant="outline-info" onClick={() => {navigate("/");}} /></Col>
      </Row>
    </div>
    </>
  );
}

export default HeroSection;