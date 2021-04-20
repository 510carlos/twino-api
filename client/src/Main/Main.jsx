import React from 'react';
import styled from 'styled-components';
import Countdown from './Countdown';
import { Body, Header } from './layout';
import './Main.css';
import logo from './layout/logo-twino.png';
import Footer from './layout/Footer';

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const imageStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '66px',
  marginBottom: '66px',
  width: '100%',
  height: 'auto',
  maxWidth: '569px',
};

const Main = () => (
  <StyledDiv>
    <Header />
    <Body>
      <img style={imageStyle} src={logo} alt="Logo" />
      <Countdown />
    </Body>
    <Footer />
  </StyledDiv>
);

export default Main;
