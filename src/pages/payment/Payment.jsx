import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../api/api";
import AddressModal from "./AddressModal";

const Payment = () => {
  const [userData, setUserData] = useState({});
  const [checkSame, setCheckSame] = useState(true);
  const [userDelivery, setUserDelivery] = useState({});
  const [visible, setVisible] = useState(false);
  const [writeInfo, setWriteInfo] = useState({});
  const [order, setOrder] = useState(false);

  const location = useLocation();

  const items2 = location.state.items;
  const delivery = items2.reduce(
    (acc, item) => acc + item.price * item.number,
    0,
  );

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await instance.request("/auth/me", {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setUserData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const onChangeName = (event) => {
    setUserData((prev) => {
      return { ...prev, displayName: event.target.value };
    });
  };

  const onChangeEmail = (event) => {
    setUserData((prev) => {
      return { ...prev, email: event.target.value };
    });
  };

  const onChangeTel = (event) => {
    const value = event.target.value.replace(/[^-0-9]/g, "");
    setUserData((prev) => {
      return { ...prev, tel: value };
    });
  };

  const shipToBill = (checked) => {
    if (checked) {
      setUserDelivery({ displayName: userData.displayName, tel: userData.tel });
    }
  };
  const onSame = (checked) => {
    if (checked) {
      setCheckSame(true);
      shipToBill(checked);
    } else {
      setCheckSame(false);
      setUserDelivery({});
    }
  };

  const deliveryName = (event) => {
    setUserDelivery({ displayName: event.target.value });
  };

  const deliveryTel = (event) => {
    const value = event.target.value.replace(/[^-0-9]/g, "");
    setUserDelivery((prev) => {
      return { ...prev, tel: value };
    });
  };

  const handleComplete = (data) => {
    const fullAddress = data.roadAddress;
    const zoneCode = data.zonecode;
    setWriteInfo({ ...writeInfo, address: fullAddress, code: zoneCode });
    setVisible(false);
  };

  return (
    <div>
      <div>결제하기</div>
      <div>
        <div>
          <div>주문 상품 정보</div>
          {items2.map((item) => (
            <div key={item.id}>
              <img src={item.photo} alt={item.name} />
              <div>
                <div>{item.name}</div>
                <div>{item.number}</div>
                <div>{item.price}</div>
              </div>
            </div>
          ))}
          <div>
            {delivery < 2500 ? (
              <div>배송비: 2,500</div>
            ) : (
              <div>배송비: 무료</div>
            )}
          </div>
        </div>
        <div>
          <div>주문자 정보</div>
          <div>
            <div>
              <input
                type="text"
                placeholder="이름"
                value={userData.displayName || ""}
                onChange={onChangeName}
                id="txtName"
              />
              <input
                type="tel"
                placeholder="연락처"
                value={userData.tel || ""}
                onChange={onChangeTel}
                id="txtTel"
              />
              <input
                type="text"
                placeholder="이메일"
                value={userData.email || ""}
                onChange={onChangeEmail}
              />
            </div>
          </div>
        </div>
        <div>
          <div>배송정보</div>
          <div>
            <div>
              <input
                type="checkbox"
                id="same"
                onChange={(e) => onSame(e.target.checked)}
              />
              <label htmlFor="same">주문자 정보와 동일</label>
            </div>
            <div>
              <input
                type="text"
                placeholder="수령인"
                onChange={deliveryName}
                value={userDelivery.displayName || ""}
              />
              <input
                type="tel"
                placeholder="연락처"
                onChange={deliveryTel}
                value={userDelivery.tel || ""}
              />
              <input
                type="text"
                placeholder="우편번호"
                value={writeInfo.code}
                onClick={() => setVisible(true)}
              />
              <button type="button" onClick={() => setVisible(true)}>
                주소찾기
              </button>
              <input
                type="text"
                placeholder="주소"
                value={writeInfo.address}
                onClick={() => setVisible(true)}
              />
              {visible && (
                <AddressModal
                  setWriteInfo={setWriteInfo}
                  setVisible={setVisible}
                  handleComplete={handleComplete}
                />
              )}

              <input type="text" placeholder="상세주소" />
            </div>
            <div>
              <div>배송메모</div>
              <select
                onChange={(event) => {
                  if (event.target.value === "order") {
                    return setOrder(true);
                  }
                  return setOrder(false);
                }}
              >
                <option>배송메모를 선택해 주세요.</option>
                <option>배송 전에 미리 연락 바랍니다.</option>
                <option>부재시 경비실에 맡겨주세요.</option>
                <option>부재시 전화나 문자를 남겨주세요.</option>
                <option value="order">직접입력 </option>
              </select>
              {order && (
                <input type="text" placeholder="배송 메모를 입력해 주세요." />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
