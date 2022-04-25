import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Board from "./pages/Board";
import Footer from "./components/Footer";

function Router() {
  return (
    <BrowserRouter>
      <div className="Router">
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/board" element={<Board />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
//<Routes> 외부에 고정시킬 컴포넌트를 작성하고
//<Routes> 내부에 유동적으로 보여줄 컴포넌트를 Route 경로와 함께 작성한다.

function App() {
  return <Router />;
}

export default App;
