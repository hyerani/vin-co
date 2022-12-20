import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import styled from "styled-components";
import localStorage from "./LocalStorage";
import ModalComponent from "./ModalComponent";
import Modal from "./Modal";

const Container = styled.div`
  max-width: 1024px;
  margin-inline: auto;
`;

const list = JSON.parse(localStorage.getItem("item"));
const checkItems1 = Array.from({ length: list.length }, (num, item) => item);

const FreeDelivery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div>
        무료
        <span>
          <button type="button" onClick={onClickButton}>
            ?
          </button>
          {isOpen && (
            <Modal
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
        </span>
      </div>
      <div>택배</div>
    </div>
  );
};

const Delivery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickButton = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div>
        2500원
        <span>
          <button type="button" onClick={onClickButton}>
            ?
          </button>
          {isOpen && (
            <Modal
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
            />
          )}
        </span>
      </div>
      <div>택배</div>
    </div>
  );
};

const Cart = () => {
  const [items, setItems] = useState(list);
  const [checkItems, setCheckItems] = useState(checkItems1);
  const [modalVisibleId, setModalVisibleId] = useState("");

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

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prevCheckItems) => [...prevCheckItems, id]);
    } else {
      setCheckItems(checkItems.filter((checkItem) => checkItem !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      items.forEach((item) => idArray.push(item.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const onModalHandler = (id) => {
    setModalVisibleId(id);
  };

  const getNumEqual = (id, numItem) => {
    setItems(
      items.map((item) => ({
        ...item,
        number: item.id === id ? numItem : item.number,
      })),
    );
  };

  const checkDelete = (checkItems) => {
    setItems(items.filter((item) => !checkItems.includes(item.id)));
    handleAllCheck();
  };

  const noItem = () => {
    alert("품절된 상품이 없습니다.");
  };

  const checkSumItems = (checkItems) => {
    return items
      .filter((item) => checkItems.includes(item.id))
      .reduce((acc, item) => acc + item.price * item.number, 0);
  };

  const checkSum = checkSumItems(checkItems);

  return (
    <Container>
      <div>
        <div>
          <div>
            장바구니
            <span className="item">
              {items.length > 0 && <div>{items.length}</div>}
            </span>
          </div>
          <div>
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
          </div>
        </div>
        <div className="item">
          {items.length > 0 &&
            items.map((item) => (
              <div key={item.name}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      name={`select-${item.id}`}
                      onChange={(e) =>
                        handleSingleCheck(e.target.checked, item.id)
                      }
                      checked={!!checkItems.includes(item.id)}
                      style={{
                        margin: `0 10px`,
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <img
                      src={item.photo}
                      alt="상품 사진"
                      style={{
                        width: "80px",
                        height: "80px",
                        border: "1px solid gray",
                        marginRight: "10px",
                      }}
                    />
                    <div>{item.name}</div>
                  </div>
                  <button
                    onClick={() => deleteHandler(item.name)}
                    type="button"
                  >
                    <ImCancelCircle />
                  </button>
                </div>
                <div>
                  <div>{item.number}</div>
                  <button type="button" onClick={() => onModalHandler(item.id)}>
                    옵션/수량 변경
                  </button>
                  {modalVisibleId === item.id && (
                    <ModalComponent
                      item={item}
                      id={item.id}
                      modalVisibleId={modalVisibleId}
                      setModalVisibleId={setModalVisibleId}
                      open={modalVisibleId}
                      onClose={() => {
                        setModalVisibleId("");
                      }}
                      getNumEqual={getNumEqual}
                    />
                  )}
                </div>
                <div>
                  <div>{item.price * item.number}</div>
                  <button type="button">
                    {!localStorage.token && <Link to="/login">바로구매</Link>}
                    {!!localStorage.token && (
                      <Link to="/payment">바로구매</Link>
                    )}
                  </button>
                </div>
              </div>
            ))}
          {sumItems > 50000 ? <FreeDelivery /> : <Delivery />}
          {items.length === 0 && <div>장바구니가 비어있습니다.</div>}
        </div>
      </div>
      {items.length > 0 && (
        <div>
          <button type="button" onClick={() => checkDelete(checkItems)}>
            선택상품 삭제
          </button>
          <button type="button" onClick={noItem}>
            품절상품 삭제
          </button>
        </div>
      )}
      {items.length > 0 && (
        <div>
          <div>총 주문 상품 {checkItems.length}</div>
          <div>
            <div>
              <div>{checkSum}</div>
              <div>상품금액</div>
            </div>
            <div>+</div>
            <div>
              <div>
                {(checkSum >= 50000 || checkSum === 0) && 0}
                {checkSum < 50000 && checkSum > 0 && 2500}
              </div>
              <div>배송비</div>
            </div>
            <div>=</div>
            <div>
              <div>
                {(checkSum >= 50000 || checkSum === 0) && checkSum}
                {checkSum < 50000 && checkSum > 0 && checkSum + 2500}
              </div>
              <div>총 주문금액</div>
            </div>
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div>
          <button type="button">
            {!localStorage.token && <Link to="/login">주문하기</Link>}
            {!!localStorage.token && <Link to="/payment">주문하기</Link>}
          </button>
        </div>
      )}
      <div>
        <button type="button">
          <Link to="/">계속 쇼핑하기</Link>
        </button>
      </div>
      {!!localStorage.token && (
        <div>
          <div>
            <div>위시리스트</div>
            <button type="button">
              <Link to="/account">더보기</Link>
            </button>
          </div>
          <div>위시리스트가 없습니다.</div>
        </div>
      )}
    </Container>
  );
};
export default Cart;
