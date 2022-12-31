import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { instance } from "../../api/api";
import AddressModal from "./AddressModal";
import ModalPayment from "./ModalPayment";
import banks from "./Banks";

const Payment = () => {
  const [userData, setUserData] = useState({});
  const [checkSame, setCheckSame] = useState(true);
  const [userDelivery, setUserDelivery] = useState({});
  const [visible, setVisible] = useState(false);
  const [writeInfo, setWriteInfo] = useState({});
  const [order, setOrder] = useState(false);
  const [modalPaymentId, setModalPaymentId] = useState("");
  const [account, setAccount] = useState({});
  const [accountLink, setAccountLink] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [buyIt, setBuyIt] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (accountLink === false && loading === true) {
      const removeData = async () => {
        const token = localStorage.getItem("token");

        try {
          const res = await instance.request("/account", {
            method: "delete",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              accountId: account.id,
              signature: true,
            },
          });
          if (res.status === 200) {
            console.log(res.data);
            setAccount("");
          }
        } catch (error) {
          console.log(error);
        }
      };
      removeData();
    }
  }, [accountLink]);

  const items2 = location.state.items;
  const delivery = items2.reduce(
    (acc, item) => acc + item.price * item.number,
    0,
  );

  const onChangeName = (event) => {
    setUserData((prev) => {
      return {
        ...prev,
        displayName: event.target.value.replace(/[^ㄱ-ㅎ가-힣$]/g, ""),
      };
    });
  };

  const onChangeEmail = (event) => {
    setUserData((prev) => {
      return { ...prev, email: event.target.value };
    });
  };

  const onChangeTel = (event) => {
    const value = event.target.value.replace(/[^0-9$]/g, "");
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
    setUserDelivery({
      displayName: event.target.value.replace(/[^ㄱ-ㅎ가-힣$]/g, ""),
    });
  };

  const deliveryTel = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
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

  const openModalPayment = (id) => {
    setModalPaymentId(id);
  };

  const closeModalPayment = () => {
    setModalPaymentId("");
  };

  const setClose = async () => {
    if (
      /^[가-힣]{2,4}$/.test(userData.displayName) &&
      /^[0-9]{11}$/.test(userData.tel) &&
      /^[a-z0-9.\-_]+@([a-z0-9-]+\.)+[a-z]{2,6}$/.test(userData.email) &&
      /^[가-힣]{2,4}$/.test(userDelivery.displayName) &&
      /^[0-9]{11}$/.test(userDelivery.tel) &&
      writeInfo.code !== undefined &&
      writeInfo.address !== undefined &&
      buyIt === true
    ) {
      return (
        await setAccountLink(false), setLoading(false)
        // window.location.replace("/")
      );
    }
    return alert("주문서 양식을 올바르게 입력해 주세요.");
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
            {delivery < 50000 ? (
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
              <div>
                <input
                  type="text"
                  placeholder="이름"
                  value={userData.displayName || ""}
                  onChange={onChangeName}
                  id="txtName"
                  pattern="/^[가-힣]{2,4}$/"
                />
                <div>이름을 입력해주세요</div>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="연락처"
                  value={userData.tel || ""}
                  onChange={onChangeTel}
                  id="txtTel"
                  maxLength="11"
                />
                <div>
                  전화번호를 올바르게 입력해주세요(&quot;-&quot;는 입력하지
                  않습니다.)
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="이메일"
                  value={userData.email || ""}
                  onChange={onChangeEmail}
                  pattern="	
                /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/"
                />
                <div>이메일 주소를 올바르게 입력해주세요.</div>
              </div>
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
              <div>
                <input
                  type="text"
                  placeholder="수령인"
                  onChange={deliveryName}
                  value={userDelivery.displayName || ""}
                  pattern="/^[가-힣]{2,4}$/"
                />
                <div>수령인의 성함을 올바르게 입력해주세요.</div>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="연락처"
                  onChange={deliveryTel}
                  value={userDelivery.tel || ""}
                  maxLength="11"
                />
                <div>
                  수령인의 전화번호를 올바르게 입력해주세요(&quot;-&quot;는
                  입력하지 않습니다.)
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="우편번호"
                  value={writeInfo.code}
                  onClick={() => setVisible(true)}
                />
                <div>배달주소를 올바르게 입력해주세요.</div>
              </div>
              <button type="button" onClick={() => setVisible(true)}>
                주소찾기
              </button>
              <div>
                <input
                  type="text"
                  placeholder="주소"
                  value={writeInfo.address}
                  onClick={() => setVisible(true)}
                />
                <div>배달주소를 올바르게 입력해주세요.</div>
              </div>
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
      <div>
        <div>
          <div>주문요약</div>
          <div>
            <div>
              <div>
                <div>상품가격</div>
                <div>{delivery}</div>
              </div>
              <div>
                <div>배송비</div>
                {delivery < 50000 ? <div>2,500</div> : <div>무료</div>}
              </div>
            </div>
            <div>
              <div>총 주문금액</div>
              <div>{delivery < 50000 ? delivery + 2500 : delivery}</div>
            </div>
          </div>
          <div>
            <div>결제수단</div>
            {banks.map((bank) => (
              <div key={bank.code}>
                <button
                  type="button"
                  onClick={() => openModalPayment(bank.code)}
                >
                  <img src={bank.src} alt={bank.name} />
                  <div>{bank.name}</div>
                </button>
                {modalPaymentId === bank.code && (
                  <ModalPayment
                    bank={bank}
                    items={items2}
                    closeModalPayment={closeModalPayment}
                    loading={loading}
                    setLoading={setLoading}
                    accountInfo={accountInfo}
                    setAccountInfo={setAccountInfo}
                    accountLink={accountLink}
                    setAccountLink={setAccountLink}
                    account={account}
                    setAccount={setAccount}
                  />
                )}
              </div>
            ))}
          </div>
          <div>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="ok"
                  onChange={(event) => {
                    setBuyIt(event.target.checked);
                  }}
                  value={buyIt}
                />
                <label htmlFor="ok">구매조건 확인 및 결제진행에 동의</label>
              </div>
              <button type="button" onClick={setClose}>
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
