import React from 'react';
import '../../../App.css';
import './index.css';
import PrimaryButton from '../PrimaryButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "../../Navbar";
import '../../../App.css'

function HeroSection() {
  return (
    <>
    <Navbar />
    <div className='hero-container'>
      <div className='image-container'>
        <img src='/images/iiitn_3d_logo.png' alt='IIITN' />
      </div>
      <h1>Indian Institute of Information Technology, Nagpur</h1>
      <Row>
            <Col><PrimaryButton label="Institution" /></Col>
            <Col><PrimaryButton label="Graduates" /></Col>
            <Col><PrimaryButton label="Companies" /></Col>
      </Row>
    </div>
    </>
  );
}

export default HeroSection;