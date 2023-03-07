import React from "react";
import styled from "styled-components";
import ItemComponent from "./ItemComponent";
import { Routes, Route, useParams } from "react-router-dom";

export default function Detail({ color }) {
  return (
    <Container>
      <Content>
        <>
          {" "}
          <ItemWrapper>
            <ItemComponent color={color} w="440px" h="440px" />
            <Title>{color}</Title>
          </ItemWrapper>
        </>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 730px;
  margin: 0 auto;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin: 40px auto;
  font-size: 20px;
`;

const Content = styled.div`
  /* display: grid; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  margin: 30px auto;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
`;
