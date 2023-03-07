import React from "react";
import styled from "styled-components";

export default function ItemComponent({ color, w, h }) {
  return (
    <div>
      <Item color={color} w={w} h={h}></Item>
    </div>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.color};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  padding: 10px;
  /* ${({ color }) => `background-color: ${color};`} */

  border-radius: 10px;
  cursor: pointer;
`;
