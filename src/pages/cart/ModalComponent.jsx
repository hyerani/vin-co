import { useState } from "react";
import styled from "styled-components";

const ModalComponent = ({
  item,
  id,
  modalVisbleId,
  setModalVisibleId,
  getNumEqual,
}) => {
  const onCloseHandler = () => {
    setModalVisibleId("");
  };

  const [itemNumber, setItemNumber] = useState(item.number);
  const onIncrease = () => {
    setItemNumber((prevItemNumber) => prevItemNumber + 1);
  };
  const onDecrease = () => {
    if (itemNumber > 1) {
      setItemNumber((prevItemNumber) => prevItemNumber - 1);
    } else {
      setItemNumber((prevItemNumber) => prevItemNumber);
    }
  };
  const itemEqual = () => {
    getNumEqual(item.id, itemNumber);
    onCloseHandler();
  };
  return (
    <Overlay className={modalVisbleId === id ? "d_block" : "d_none"}>
      <ModalWrap>
        <div>
          <div>옵션 변경</div>
          <CloseButton onClick={onCloseHandler}>x</CloseButton>
        </div>
        <div>
          <img src={item.photo} alt="상품 이미지" />
          <div>{item.name}</div>
          <div>{item.price}</div>
        </div>
        <div>
          <div>수량</div>
          <div>
            <button type="button" onClick={onIncrease}>
              +
            </button>
            <div>{itemNumber}</div>
            <button type="button" onClick={onDecrease}>
              -
            </button>
          </div>
          <div>
            <div>
              총 수량<span>{itemNumber}</span>
            </div>
            <div>{itemNumber * item.price}</div>
          </div>
          <div>
            <button type="button" onClick={onCloseHandler}>
              취소
            </button>
            <button type="button" onClick={itemEqual}>
              변경
            </button>
          </div>
        </div>
      </ModalWrap>
    </Overlay>
  );
};

const Overlay = styled.div`
  postion: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  buttom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;
const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
`;
export default ModalComponent;
