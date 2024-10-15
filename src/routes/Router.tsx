import { Route, Routes } from "react-router-dom";
import Cards from "../components/Cards";
import Home from "../components/Home";
import Card from "../components/Card";
import Register from "../components/Register";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/cards/:id" element={<Card />} />
      <Route path="/cards/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
