import "./App.css";
import styled from "styled-components";
import {
  Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import Collection from "./components/Collection";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import ItemComponent from "./components/ItemComponent";
import Detail from "./components/Detail";
import { changeLike } from "./store/Data";

function App() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const state = useSelector((state) => state);

  let { colorCode } = useParams();

  let [code, setCode] = useState("");

  const likeHandler = (i) => {
    dispatch(changeLike(i));
  };

  const clickHandler = (i) => {
    colorCode = state.data[i].color;
    navigate(`/detail/${colorCode}`);
    setCode(colorCode);
  };

  const deleteHandler = (i) => {
    dispatch(changeLike(i));

    //? 깊은 복사로 하기 보다는 변경함수 사용하기 !
    // 깊은 복사는 데이터 하나를 일시적으로 변경하는건데, REDUX 일관되게 사용하는게 좋음.
    // let copy = { ...state.data[i] };
    // copy.like = false;
    // console.log(copy);
    // console.log(copy.like);
  };

  return (
    <Container>
      <Navbar></Navbar>
      <Section>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Menu></Menu>
                <Main>
                  <ColorWrapper>
                    {state.data.map((v, i) => (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                          onClick={() => {
                            clickHandler(i);
                          }}
                        >
                          <ItemComponent
                            color={state.data[i].color}
                            w="220px"
                            h="220px"
                          ></ItemComponent>
                        </div>

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
                      </div>
                    ))}
                  </ColorWrapper>
                </Main>
              </>
            }
          />
          {state.data.map((v, i) => (
            <>
              <Route path="/collection" element={<Collection />}></Route>
              <Route
                path="/detail/*"
                element={
                  <>
                    <Detail color={code} data={state.data[i].color} />
                  </>
                }
              ></Route>
              <Route
                path="/detail/:colorCode"
                element={
                  <>
                    <Detail color={code} data={state.data[i].color} />
                  </>
                }
              />
            </>
          ))}
        </Routes>
        <List>
          <H1
            onClick={() => {
              navigate("/collection");
            }}
          >
            Collection
          </H1>
          {/* <ItemWrapper> */}
          <Item>
            <Over>
              {state.data.map((v, i) =>
                state.data[i].like ? (
                  <CloseBox
                    onClick={() => {
                      clickHandler(i);
                    }}
                  >
                    <ItemComponent
                      color={state.data[i].color}
                      w="50px"
                      h="50px"
                      className="hoverImg"
                    ></ItemComponent>
                    <IoMdCloseCircle
                      size="18"
                      className="close"
                      onMouseOver={({ target }) =>
                        (target.style.display = "block")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.visibility = "visible")
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler(i);
                      }}
                    />
                  </CloseBox>
                ) : null,
              )}
            </Over>
          </Item>
          {/* </ItemWrapper> */}
        </List>
      </Section>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Navbar = styled.div`
  width: 100%;
  height: 60px;
  background-color: gray;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Menu = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
`;

const Main = styled.div`
  width: 970px;
  height: 100%;
`;

const ColorWrapper = styled.div`
  display: flex;
  margin: 50px auto;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  height: 300px;
`;

const List = styled.div`
  /* width: 150px; */
  height: 100%;
  /* background-color: #eee; */
  padding: 0 20px;
`;

const H1 = styled.h1`
  font-size: 18px;
  cursor: pointer;
  height: 30px;
  visibility: visible;
`;

// const ItemWrapper = styled.div`
//   display: flex;
//   background-color: salmon;
// `;

const Item = styled.div`
  background-color: white;
  display: flex;
  /* flex-direction: row; */
  /* background-color: yellow; */
  height: 150px;
  width: 200px;
`;

const Over = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  visibility: visible;
`;

const CloseBox = styled.span`
  height: 20px;
  visibility: visible;
  margin-bottom: 50px;

  & > .close {
    /* visibility: hidden; */
    /* display: block; */
    position: relative;
    bottom: 65px;
    left: 45px;
    height: 20px;
  }

  &:hover {
    cursor: pointer;
    display: block;

    .close {
      visibility: visible;
      display: block;
      position: relative;
      bottom: 65px;
      left: 45px;
      height: 20px;
      padding: 0;
      margin: 0;
    }
  }
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
