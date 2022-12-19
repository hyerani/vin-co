import { useEffect, useState } from "react";
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

  // console.log(checkItems);

  // const deleteHandler = (name) => {
  //   setItems(items.filter((item) => item.name !== name));
  // };

  // useEffect(() => {
  //   localStorage.setItem("item", JSON.stringify(items));
  // }, [items]);

  const checkDelete = (checkItems) => {
    setItems(items.filter((item) => !checkItems.includes(item.id)));
    handleAllCheck();
    // setItems(checkItems.map((num) => items.filter((item) => item.id !== num)));
  };

  const noItem = () => {
    alert("품절된 상품이 없습니다.");
  };

  return (
    <Container>
      <div>
        <div>
          <div>
            장바구니{" "}
            <span>{items.length > 0 && <div>{items.length}</div>}</span>
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
                <button type="button">바로구매</button>
              </div>
            </div>
          ))}
        {sumItems > 50000 ? <FreeDelivery /> : <Delivery />}
        {items.length === 0 && <div>장바구니가 비어있습니다.</div>}
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
              <div></div>
              <div>상품금액</div>
            </div>
            <div>+</div>
            <div>
              <div></div>
              <div>배송비</div>
            </div>
            <div>=</div>
            <div>
              <div></div>
              <div>총 주문금액</div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
export default Cart;
