import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import ItemComponent from "./ItemComponent";
import Detail from "./Detail";
import { useSelector, useDispatch } from "react-redux";
import { changeLike } from "../store/Data";

export default function Collection() {
  const state = useSelector((state) => state);
  let dispatch = useDispatch();

  const likeHandler = (i) => {
    dispatch(changeLike(i));
  };

  //? [완료] 데이터에서 like가 true로 바뀐 것의 갯수 세기
  // const len = Object.keys(state).length;
  const len = state.data.length;
  let [cnt, setCnt] = useState(0);
  //? 왜 const 는 안되고, let 은 되는거죠 ????????????
  for (let i = 0; i < len; i++) {
    if (state.data[i].like) {
      // let copy = [...state.data];
      cnt = cnt + 1;
    }
  }
  // setCnt(cnt);

  return (
    <>
      <Container>
        <Title>
          <H1>My collection</H1>

          <Span>{cnt} palette</Span>
          {/* <Span>{Object.keys(state.data.like).length} palette</Span> */}
        </Title>
        <Line></Line>
        <Content>
          {state.data.map((v, i) => (
            <ItemWrapper>
              {state.data[i].like && (
                <React.Fragment>
                  {/* <>로는 안됨 !!! */}
                  <ItemComponent
                    color={state.data[i].color}
                    w="220px"
                    h="220px"
                    style={{ margin: "0 10px" }}
                  />
                  <Like
                    onClick={() => {
                      likeHandler(i);
                    }}
                  >
                    {state.data[i].like ? (
                      <BsSuitHeartFill size="20" />
                    ) : (
                      <BsSuitHeart size="20" />
                    )}
                    <div>Like</div>
                  </Like>
                </React.Fragment>
              )}
            </ItemWrapper>
          ))}
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 730px;
  margin: 0 auto;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  width: 100%;
`;

const H1 = styled.h1`
  font-size: 18px;
`;

const Span = styled.span`
  color: gray;
  font-size: 13px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  opacity: 0.1;
`;

const Content = styled.div`
  /* display: grid; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  height: 100%;
  margin: 20px auto;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Like = styled.div`
  border-radius: 10px;
  background-color: #eee;
  width: 80px;
  height: 40px;
  margin: 10px 0;
  margin: 10px 0;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
