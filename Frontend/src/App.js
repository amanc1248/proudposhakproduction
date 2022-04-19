import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Screens/Customer/HomePage";
import Header from "./components/Header";
import CategoryScreen from "./Screens/Customer/CategoryScreen";
import UniqueProductScreen from "./Screens/Customer/UniqueProductScreen";
import CustomerAccount from "./Screens/CustomerAccount/CustomerAccount";
import ProductScreen from "./Screens/ProductScreen/ProductScreen";
import Testscreen from "./Screens/test/testscreen";
import CheckOut from "./Screens/CheckOut/CheckOut";
import Message from "./components/Message";
import Footer from "./Screens/Footer/Footer";
import Loader from "./components/Loader";
import OrderDetailsScreen from "./Screens/OrderDetails/OrderDetailsScreen";
import Chat from "./components/chat";
import ScrollToTop from "./components/ScrollToTop";
import FooterFAQs from "./Screens/Footer/FooterFAQs/FooterFAQs";
import AboutDasa from "./Screens/Footer/TheCompany/TheCompany";
function App() {
  return (
    <Router>
      <div className="App">
        <Chat></Chat>
        <ScrollToTop>
          <Routes>
            {/* <Route
            path="/admin"
            element={<AddProductType></AddProductType>}
          ></Route>
          <Route
            path="/adminedit"
            element={<EditProductType></EditProductType>}
          ></Route> */}
            <Route
              path="/category/:categoryName/:categoryId"
              element={
                <>
                  <Header></Header>
                  <CategoryScreen></CategoryScreen>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/collections/:subCategoryName/:subCategoryId"
              element={
                <>
                  <Header></Header>
                  <UniqueProductScreen></UniqueProductScreen>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/chat"
              element={
                <>
                  <Chat></Chat>
                </>
              }
            ></Route>
            <Route
              path="/account"
              element={
                <>
                  <Header></Header>
                  <CustomerAccount></CustomerAccount>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/message"
              element={
                <>
                  <Message></Message>
                </>
              }
            ></Route>
            <Route
              path="/loader"
              element={
                <>
                  <Loader></Loader>
                </>
              }
            ></Route>
            <Route
              path="/test"
              element={
                <>
                  <Testscreen></Testscreen>
                </>
              }
            ></Route>
            <Route
              path="/products/:productName/:productId"
              element={
                <>
                  <Header></Header>
                  <ProductScreen></ProductScreen>

                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/checkout"
              element={
                <>
                  <Header></Header>
                  <CheckOut></CheckOut>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/orders/:orderId"
              element={
                <>
                  <Header></Header>
                  <OrderDetailsScreen></OrderDetailsScreen>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/faqs"
              element={
                <>
                  <Header></Header>
                  <FooterFAQs></FooterFAQs>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/aboutUs"
              element={
                <>
                  <Header></Header>
                  <AboutDasa></AboutDasa>
                  <Footer></Footer>
                </>
              }
            ></Route>{" "}
            <Route
              path="/"
              element={
                <>
                  <Header></Header>
                  <HomePage></HomePage>
                  <Footer></Footer>
                </>
              }
            ></Route>
          </Routes>
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
