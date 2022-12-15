import { useEffect, useState } from "react";
import { instance } from "../../api/api";
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

const Items = ({ props }) => {
  return (
    <Item>
      <Thum src={props.thumbnail} alt="상품이미지" />
      <Info>
        <Name>{props.title}</Name>
        <Price>{props.price.toLocaleString()}</Price>
      </Info>
    </Item>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.request("/products", {
          method: "get",
          headers: {
            masterKey: true,
          },
        });
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
        {data.map((api) => (
          <Items key={api.id} props={api} />
        ))}
      </List>
    </Container>
  );
};
export default Home;
