import { Link } from "react-router-dom";
import { MdClose, MdMenu, MdSearch } from "react-icons/md";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { useContext } from "react";
import { CloseBtn, Container, StyledAside, StyledHeader } from "./styles";
import { useToggle } from "../../hooks/useToggle";
import { instance } from "../../api/api";
import AuthContext from "../../context/ContextProvider";

const Aside = ({ isToggle, toggle }) => {
  return (
    <StyledAside isToggle={isToggle}>
      <div className="backdrop" />
      <nav className={isToggle ? "mobile-menu slide" : "mobile-menu close"}>
        <CloseBtn isToggle={isToggle} onClick={toggle}>
          <MdClose
            style={{
              color: "white",
              fontSize: "1.5rem",
            }}
          />
        </CloseBtn>

        <div
          className="menu-user"
          style={{
            color: "white",
          }}
        >
          <div className="user-wrapper">
            <div>
              <p className="user">관리자</p>
              <p className="user-email">lorem@lorem.com</p>
            </div>

            <button type="button">
              <IoEllipsisVerticalOutline
                style={{
                  color: "white",
                }}
              />
            </button>
          </div>
        </div>

        <ul
          className="dropdown"
          style={{
            color: "white",
          }}
        >
          <li>
            <Link to="/shop">
              SHOP
              <button type="button">
                <BsChevronDown />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              LOREM
              <button type="button">
                <BsChevronDown />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/shop">
              ABOUT
              <button type="button">
                <BsChevronDown />
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </StyledAside>
  );
};

const Header = () => {
  const [isToggle, toggle] = useToggle();
  // const [token, setToken] = useState(localStorage.getItem("token"));

  const { token, setToken } = useContext(AuthContext);

  const logout = async (token) => {
    try {
      const res = await instance.request("/auth/logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setToken(localStorage.removeItem("token"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledHeader>
      <Container>
        <nav className="mobile-nav">
          <button type="button" onClick={toggle}>
            <MdMenu />
          </button>
          <h1>
            <Link to="/">Vin-co &copy;</Link>
          </h1>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
        </nav>
        <nav className="nav">
          <div className="left-wrapper">
            <h1>
              <Link to="/">Vin-co</Link>
            </h1>
            {/* LEFT NAV */}
            <ul>
              <li>
                <Link to="/shop">SHOP</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
            </ul>
          </div>

          {/* RIGHT NAV */}
          <ul>
            <li>
              <button className="search-btn" type="button">
                <MdSearch />
              </button>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              {token ? (
                <button
                  className="logout-btn"
                  type="button"
                  onClick={() => logout(token)}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </Container>
      <Aside isToggle={isToggle} toggle={toggle} />
    </StyledHeader>
  );
};
export default Header;
