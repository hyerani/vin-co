import { Routes, Route } from "react-router-dom";
import Footer from "./componets/footer/Footer";
import Header from "./componets/header/Header";
import Main from "./componets/main/Main";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
