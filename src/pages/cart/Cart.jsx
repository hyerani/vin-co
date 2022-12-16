import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1024px;
  margin-inline: auto;
`;

localStorage.setItem(
  "item",
  JSON.stringify([
    {
      name: "Polaroid SX-70 Land Camera",
      price: 80000,
      number: 1,
      photo: "https://cdn.imweb.me/thumbnail/20220207/0bef11156dcdb.jpg",
      id: 0,
    },
    {
      name: "Le Corbusier LC2 Chair",
      price: 960000,
      number: 2,
      photo: "https://cdn.imweb.me/thumbnail/20220207/6c05fee561509.jpg",
      id: 1,
    },
    {
      name: "Vintage Mini Televison",
      price: 154000,
      number: 3,
      photo: "https://cdn.imweb.me/thumbnail/20220207/85ea9b194b0c1.jpg",
      id: 2,
    },
    {
      name: "Ocean Goblet",
      price: 45000,
      number: 1,
      photo: "https://cdn.imweb.me/thumbnail/20220301/f672ab1fb0f0c.jpg",
      id: 3,
    },
  ]),
);

const list = JSON.parse(localStorage.getItem("item"));

const FreeDelivery = () => {
  return (
    <div>
      <div>
        무료
        <span>
          <button type="button">?</button>
        </span>
      </div>
      <div>택배</div>
    </div>
  );
};

const Delivery = () => {
  return (
    <div>
      <div>
        2500원
        <span>
          <button type="button">?</button>
        </span>
      </div>
      <div>택배</div>
    </div>
  );
};

const Cart = () => {
  const [items, setItems] = useState(list);

  const deleteHandler = (name) => {
    setItems(items.filter((item) => item.name !== name));
  };

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(items));
  }, [items]);

  const sumItems = items.reduce(
    (acc, item) => acc + item.price * item.number,
    0,
  );

  const [checkItems, setCheckItems] = useState([]);
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prevCheckItems) => [...prevCheckItems, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      items.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <Container>
      <div>
        <div>
          {" "}
          장바구니 <span>{items.length > 0 && <div>{items.length}</div>}</span>
        </div>
        <div className="table1">
          <div>
            <div>
              <input
                type="checkbox"
                name="select-all"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === items.length}
              />
              상품 정보
            </div>
            <div>수량</div>
            <div>주문금액</div>
            <div>배송 정보</div>
          </div>
          <div> </div>
        </div>
      </div>
      {items.length > 0 &&
        items.map((item) => (
          <div key={item.name}>
            <div>
              <input
                type="checkbox"
                name={`select-${item.id}`}
                onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                checked={!!checkItems.includes(item.id)}
              />
              <img src={item.photo} alt="상품 사진" />
              <div>{item.name}</div>
              <button onClick={() => deleteHandler(item.name)} type="button">
                x
              </button>
            </div>
            <div>
              <div>{item.number}</div>
              <button type="button">옵션/수량 변경</button>
            </div>
            <div>
              <div>{item.price * item.number}</div>
              <button type="button">바로구매</button>
            </div>
          </div>
        ))}
      {sumItems > 50000 ? <FreeDelivery /> : <Delivery />}
      {items.length === 0 && <div>장바구니가 비어있습니다.</div>}
    </Container>
  );
};
export default Cart;
