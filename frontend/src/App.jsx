import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "./animations/PageTransitionWrapper";
import ScrollToTop from "./animations/ScrollToTop";
import Banner from "./Components/Banner";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ScrollToTop />
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransitionWrapper>
                  <Home />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/collection"
              element={
                <PageTransitionWrapper>
                  <Collection />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransitionWrapper>
                  <About />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransitionWrapper>
                  <Contact />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <PageTransitionWrapper>
                  <Product />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransitionWrapper>
                  <Cart />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransitionWrapper>
                  <Login />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/place-order"
              element={
                <PageTransitionWrapper>
                  <PlaceOrder />
                </PageTransitionWrapper>
              }
            />
            <Route
              path="/orders"
              element={
                <PageTransitionWrapper>
                  <Orders />
                </PageTransitionWrapper>
              }
            />
          </Routes>
        </AnimatePresence>

      </div>
      <Banner />
      <Footer />
    </>
  );
}

export default App;
