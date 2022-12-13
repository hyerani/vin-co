import { AiOutlineClose } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useEffect, useRef } from "react";
import { Container, UserForm } from "./styles";

const EditAccount = ({ setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  const modalRef = useRef(HTMLDivElement);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Container>
      <div ref={modalRef} className="modal">
        <div className="modal-top">
          <div className="modal-title">정보 수정</div>
          <button className="close" type="button" onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </div>
        <label className="modal-profile">
          <div className="profile">
            <IoPersonCircleSharp color="lightgray" />
          </div>
          <span className="camera">
            <MdOutlineCameraAlt />
          </span>
          <input type="file" />
        </label>
        <UserForm>
          <input type="text" placeholder="email" disabled="true" />
          <input
            className="user-password"
            type="password"
            placeholder="password"
          />
          <input
            type="password"
            placeholder="비밀번호를 변경 하는 경우 입력하세요"
          />
          <input type="password" placeholder="비밀번호 확인" />
          <div className="user-name">
            <span>이름</span>
            <input type="text" placeholder="이름을(를) 입력하세요" />
          </div>
          <button type="button">확인</button>
        </UserForm>
      </div>
    </Container>
  );
};

export default EditAccount;
