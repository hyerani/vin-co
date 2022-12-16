import styled from "styled-components";

const ModalComponent = ({ item, id, modalVisbleId, setModalVisibleId }) => {
  const onCloseHandler = () => {
    setModalVisibleId("");
  };

  return (
    <Overlay className={modalVisbleId === id ? "d_block" : "d_none"}>
      <ModalWrap>
        <CloseButton onClick={onCloseHandler}>x</CloseButton>
        <div>
          <img src={item.photo} alt="상품 이미지" />
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
