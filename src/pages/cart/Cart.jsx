import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useState } from "react";

const Container = styled.div`
  max-width: 1024px;
  margin-inline: auto;
`;

localStorage.setItem(
  "0",
  JSON.stringify({
    name: "Polaroid SX-70 Land Camera",
    price: 80000,
    number: 1,
    photo: "https://cdn.imweb.me/thumbnail/20220207/0bef11156dcdb.jpg",
  }),
);
localStorage.setItem(
  "1",
  JSON.stringify({
    name: "Le Corbusier LC2 Chair",
    price: 960000,
    number: 2,
    photo: "https://cdn.imweb.me/thumbnail/20220207/6c05fee561509.jpg",
  }),
);
localStorage.setItem(
  "2",
  JSON.stringify({
    name: "Vintage Mini Televison",
    price: 154000,
    number: 3,
    photo: "https://cdn.imweb.me/thumbnail/20220207/85ea9b194b0c1.jpg",
  }),
);
const bag = (
  // () => {
  //   const [length, setlength] = useState(localStorage.length);
  //   const Decrease = () => {
  //     setlength((prevNumber) => prevNumber - 1);
  //   };
  //   return (
  <div>
    장바구니 <span>{localStorage.length}</span>
  </div>
);
//   );
// };

const table1Title = (
  <div>
    <div>
      {localStorage ? <input type="checkbox" /> : <span> </span>}
      <div>상품 정보</div>
    </div>
    <div>수량</div>
    <div>주문금액</div>
    <div>배송 정보</div>
  </div>
);

const lo = [];
const arr = Array(localStorage.length)
  .fill()
  .map((arr, i) => {
    return i;
  });
// arr.map((x) => lo.push(JSON.parse(localStorage[x])));

const remove = (event) => {
  if (event.target.closest(".del")) {
    localStorage.removeItem(event.target.closest(".item").classList[1]);
    event.target.closest(".item").remove();
    lo.splice(`${event.target.closest(".item").classList[1]}`, 1);
  }
};

const Cart = () => {
  return (
    <Container>
      {bag}
      {table1Title}
      {localStorage ? (
        lo.map((x) => {
          return (
            <div key={lo.indexOf(x)} className={`item ${lo.indexOf(x)}`}>
              <div>
                <input type="checkbox" />
                <div>
                  <img src={x.photo} alt={x.name} />
                  <div>{x.name}</div>
                  <button type="button" className="del" onClick={remove}>
                    <ImCancelCircle />
                  </button>
                </div>
              </div>
              <div>
                <div>{x.number}</div>
                <button type="button">옵션/수량 버튼</button>
              </div>
              <div>
                <div>{x.price.toLocaleString()}원</div>
                <button type="button">바로 구매</button>
              </div>
              <div>
                <div>
                  무료
                  <span>
                    <AiOutlineQuestionCircle />
                  </span>
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
