import React, { useEffect, useRef } from "react";
import UseOutSideClick from "./UseOutSideClick";

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };
  UseOutSideClick(modalRef, handleClose);
  return (
    <div>
      <div ref={modalRef}>
        <div>조건부 무료배송</div>
        <div>
          기본 배송비 2,500원 <br />
          50,000원 이상 구매 시 무료배송
        </div>
      </div>
    </div>
  );
};
export default Modal;
