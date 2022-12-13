import { Link } from "react-router-dom";
import { MdMenu, MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { Container, StyledHeader } from "./styles";
import { useToggle } from "../../hooks/useToggle";
import { instance } from "../../api/api";

const Header = () => {
  const [isToggle, toggle] = useToggle();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // const authValidate = async () => {
    //   const token = localStorage.getItem("token");
    //   try {
    //     const res = await instance.request("/auth/me", {
    //       method: "post",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const { data } = res;
    //     if (res.status === 200) {
    //       setIsLogin(true);
    //       console.log(isLogin);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // authValidate();
  }, [isLogin]);

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await instance.request("/auth/logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const { data } = res;
      if (res.status === 200) {
        setIsLogin(false);
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
              <button className="logout-btn" type="button" onClick={logout}>
                Logout
              </button>
              <br />
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </StyledHeader>
  );
};
export default Header;
