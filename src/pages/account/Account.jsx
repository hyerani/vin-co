import { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Container } from "./styles";
import Order from "./order/Order";
import Wishlist from "./wishlist/Wishlist";
import OrderChange from "./orderchange/OrderChange";
import QnA from "./QnA/QnA";
import EditAccount from "./editAccount/EditAccount";
import DeleteAccount from "./deleteAccount/DeleteAccount";

const Account = () => {
  const [section, setSection] = useState("order");
  const changeSection = (event) => {
    setSection(event.target.className);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const [confirmModal, setConfirmModal] = useState(false);
  const showConfirmModal = () => {
    setConfirmModal(true);
  };

  return (
    <Container>
      <nav className="nav">
        <button className="order" type="button" onClick={changeSection}>
          주문 조회
        </button>
        <button className="wishlist" type="button" onClick={changeSection}>
          위시 리스트
        </button>
        <button className="order-change" type="button" onClick={changeSection}>
          취소/교환/반품
        </button>
        <button className="QnA" type="button" onClick={changeSection}>
          1:1 문의
        </button>
        <button className="edit-account" type="button" onClick={showModal}>
          정보 수정
        </button>
        <button
          className="delete-account"
          type="button"
          onClick={showConfirmModal}
        >
          회원탈퇴
        </button>
      </nav>
      <section>
        <div className="user">
          <button type="button" className="user-icon" onClick={showModal}>
            <IoPersonCircleSharp color="lightgray" />
          </button>
          <div className="user-info">
            <h2>user name 님 안녕하세요.</h2>
            <span>누적 구매금액: 0원</span>
          </div>
        </div>
        {section === "order" ? <Order /> : null}
        {section === "wishlist" ? <Wishlist /> : null}
        {section === "order-change" ? <OrderChange /> : null}
        {section === "QnA" ? <QnA /> : null}
      </section>
      {modalOpen && <EditAccount setModalOpen={setModalOpen} />}
      {confirmModal && <DeleteAccount setConfirmModal={setConfirmModal} />}
    </Container>
  );
};

export default Account;
