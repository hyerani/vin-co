import { Routes, Route } from "react-router-dom";
import Footer from "./componets/footer/Footer";
import Header from "./componets/header/Header";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
