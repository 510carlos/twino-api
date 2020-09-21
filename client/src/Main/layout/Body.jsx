import React from "react";
import styled from 'styled-components';

var StyledDiv = styled.div`
    background-color: #eee;
    margin: 0 auto;
    box-shadow: 0 1px 6px #ccc;
    border: solid 1px #fff;
    margin-right: 1%;
    margin-left: 1%;
    display: grid;
    place-items: center;
`;

const Body = (props) => (
    <StyledDiv>
        {props.children}
    </StyledDiv>
);
  
export default Body;