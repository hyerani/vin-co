import styled from "styled-components";
import { containerStyle } from "../../styles/styleConstants";

const Container = styled.div`
  ${containerStyle}
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

// 배너
const Banner = styled.div`
  width: 900px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://cdn.imweb.me/thumbnail/20220215/834ed85d9945b.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: -850px;
`;

const Logo = styled.h1`
  font-size: 96px;
  font-weight: 900;
`;

// 소개
const Intro = styled.span`
  margin: 10px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 목록
const List = styled.div`
  /* width: 1280px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: wrap; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 990px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// 아이템
const Item = styled.div`
  width: 320px;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &:hover {
    border-radius: 10px;
    background-color: whitesmoke;
  }
`;

const Thum = styled.img`
  width: 280px;
  height: 280px;
`;

const Info = styled.div`
  font-weight: 700;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 16px;
`;

const Price = styled.span`
  font-size: 14px;
`;

export { Container, Banner, Intro, List, Logo, Item, Thum, Info, Name, Price };
