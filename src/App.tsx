import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
