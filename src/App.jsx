import { Routes, Route } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Layout from "./componets/Layout";
import NotFound from "./pages/404/NotFound";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Account from "./pages/account/Account";
import { AuthContextProvider } from "./context/ContextProvider";
import PublicRoute from "./componets/router/PublicRoute";
import PrivateRoute from "./componets/router/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
};

export default App;
