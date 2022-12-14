import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Container, UserForm } from "./styles";
import { instance } from "../../../api/api";

const EditAccount = ({ setModalOpen, userData }) => {
  // 리렌더링 계속 되는 버그 있음
  // 아마 userData가 계속 fetch 되어서 발생하는 버그 같음..

  console.log(userData);
  const modalRef = useRef(HTMLDivElement);
  const [displayName, setDisplayName] = useState(userData.displayName);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const editAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await instance.request("/auth/user", {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          displayName,
          newPassword,
          oldPassword,
        },
      });

      if (res.status === 200) {
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayNameHandler = (event) => {
    setDisplayName(event.target.value);
  };

  const newPasswordHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const oldPasswordHandler = (event) => {
    setOldPassword(event.target.value);
  };

  return (
    <Container>
      <div className="test" />
      <div ref={modalRef} className="modal">
        <div className="modal-top">
          <div className="modal-title">정보 수정</div>
          <button className="close" type="button" onClick={closeModal}>
            <AiOutlineClose />
          </button>
        </div>
        <label className="modal-profile">
          <div className="profile">
            <img src={userData.profileImg} alt="profile-img" />
          </div>
          <span className="camera">
            <MdOutlineCameraAlt />
          </span>
          <input type="file" />
        </label>
        <UserForm>
          <input type="text" placeholder={userData.email} disabled />
          <input
            className="user-password"
            type="password"
            placeholder="기존 비밀번호를 입력하세요"
            value={oldPassword}
            onChange={oldPasswordHandler}
          />
          <input
            type="password"
            placeholder="비밀번호를 변경 하는 경우 입력하세요"
            value={newPassword}
            onChange={newPasswordHandler}
          />
          <input type="password" placeholder="비밀번호 확인" />
          <div className="user-name">
            <span>이름</span>
            <input
              type="text"
              placeholder="이름을(를) 입력하세요"
              value={displayName}
              onChange={displayNameHandler}
            />
          </div>
          <button type="button" onClick={editAccount}>
            확인
          </button>
        </UserForm>
      </div>
    </Container>
  );
};

export default EditAccount;
