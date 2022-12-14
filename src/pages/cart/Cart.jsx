import styled from "styled-components";

const Container = styled.div`
  max-width: 1024px;
  margin-inline: auto;
`;

const Item3 = [
  {
    name: "Polaroid SX-70 Land Camera",
    price: 80000,
    number: 1,
    photo: "https://cdn.imweb.me/thumbnail/20220207/0bef11156dcdb.jpg",
  },
  {
    name: "Le Corbusier LC2 Chair",
    price: 960000,
    number: 2,
    photo: "https://cdn.imweb.me/thumbnail/20220207/6c05fee561509.jpg",
  },
  {
    name: "Vintage Mini Televison",
    price: 154000,
    number: 3,
    photo: "https://cdn.imweb.me/thumbnail/20220207/85ea9b194b0c1.jpg",
  },
];
localStorage.item = JSON.stringify(Item3);

const bag = (
  <div>
    장바구니 <span>{Item3.length}</span>
  </div>
);

const table1Title = (
  <div>
    <div>
      {Item3 ? <input type="checkbox" /> : <span> </span>}
      <div>상품 정보</div>
    </div>
    <div>수량</div>
    <div>주문금액</div>
    <div>배송 정보</div>
  </div>
);

const Cart = () => {
  return (
    <Container>
      {bag}
      {table1Title}
      {Item3 ? (
        Item3.map((x) => {
          return (
            <div key={Item3.indexOf(x)}>
              <div>
                <input type="checkbox" />
                <div>
                  <img src={x.photo} alt={x.name} />
                  <div>{x.name}</div>
                  <button type="button">x</button>
                </div>
              </div>
              <div>
                <div>{x.number}</div>
                <button type="button">옵션/수량 버튼</button>
              </div>
              <div>
                <div>{x.price}.toLocaleString()원</div>
                <button type="button">바로 구매</button>
              </div>
              <div>
                <div>
                  무료<span>?</span>
                </div>
                <div>택배</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>장바구니가 비어있습니다.</div>
      )}
    </Container>
  );
};
export default Cart;
