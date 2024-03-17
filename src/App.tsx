import "./App.scss";
// import AboutUs from './Pages/AboutUs';
// import ProductList from './Pages/ProductList';
import Header from "./components/Header";
import Cart from "./Pages/Cart";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Cart />
        {/* <AboutUs/> */}
        {/* <ProductList/> */}
      </div>
    </>
  );
}

export default App;
