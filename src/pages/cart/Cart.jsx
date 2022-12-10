import "./Cart.css";

const moveMain = () => {
  document.location.href = "/";
};

const Cart = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <h2 className="Carth2">
        장바구니<span className="itemSize">0</span>
      </h2>

      <div className="table">
        <div className="th">
          <div className="itemName">상품 이름</div>
          <div className="th-itemSize">수량</div>
          <div className="itemMoney">주문금액</div>
          <div className="postInfo">배송정보</div>
        </div>
        <div className="emptyTD">
          <span className="material-symbols-outlined">shopping_cart</span>
          <div>장바구니가 비어있습니다.</div>
        </div>
      </div>

      <button className="home" type="button" onClick={moveMain}>
        계속 쇼핑하기
      </button>
    </div>
  );
};
export default Cart;
