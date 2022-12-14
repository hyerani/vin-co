import {
  Container,
  Banner,
  Intro,
  List,
  Logo,
  Item,
  Thum,
  Info,
  Name,
  Price,
} from "./styles";
import { instance } from "../../api/api";

const Items = () => {
  const name = "상품명";
  const price = "상품 가격";
  const source =
    "https://w7.pngwing.com/pngs/441/722/png-transparent-pikachu-thumbnail.png";
  return (
    <Item>
      <Thum src={source} alt="상품이미지" />
      <Info>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Info>
    </Item>
  );
};

const Home = () => {
  const arr = ["A", "B", "C", "D"];
  return (
    <Container>
      <Banner>
        <Logo>Vin-co</Logo>
      </Banner>
      <div>
        <Intro>Vin-co를 방문해주셔서 감사합니다.</Intro>
        <Intro>당신이 찾는 골동품 모두 여기에!</Intro>
      </div>
      <List>
        {arr.map((abc) => (
          <Items key={abc} />
        ))}
      </List>
    </Container>
  );
};

export default Home;
