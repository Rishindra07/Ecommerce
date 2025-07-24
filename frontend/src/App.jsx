import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import MensWearPage from "./components/Shop/Products.jsx";
import Hero from "./components/HeroSection/Hero.jsx";
import Collections from "./components/Collections/collections.jsx";
import About from "./components/About/about.jsx";
import Contact from "./components/Contact/contact.jsx";
import Cart from "./components/Cart/cart.jsx";
import Orders from "./components/Cart/orders.jsx";
import CartProvider from "./components/Cart/CartContext.jsx";
import OrderProvider from "./components/Cart/OrderContext.jsx";
import Login from "./components/UserAuth/Login.jsx";
import Signup from "./components/UserAuth/Signup.jsx";
import Account from "./components/Account/Account.jsx";
import Wishlist from "./components/Cart/wish.jsx"; 
import { WishlistProvider } from "./components/Cart/wishlistContext.jsx"; 
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userEmailOrMobile, setUserEmailOrMobile] = useState(""); // Track logged-in user

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "collections":
        return <Collections />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "mens":
      case "womens":
      case "newArrivals":
        return <MensWearPage category={activeCategory} />;
      case "orders":
        return isLoggedIn ? <Orders /> : <LoginRedirect />;
      case "cart":
        return isLoggedIn ? <Cart emailOrMobile={userEmailOrMobile} /> : <LoginRedirect />;
      case "wishlist": // Added Wishlist case
        return isLoggedIn ? <Wishlist /> : <LoginRedirect />;
      case "Login":
        return (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setUserName={setUserEmailOrMobile}
            setActiveCategory={setActiveCategory}
          />
        );
      case "account":
        return <Account />;
      case "Signup":
        return <Signup setActiveCategory={setActiveCategory} />;
      case "home":
      default:
        return <Hero />;
    }
  };

  const LoginRedirect = () => (
    <div className="text-center mt-5">
      <h4>You must be logged in to access this page.</h4>
      <button
        className="btn btn-primary mt-3"
        onClick={() => setActiveCategory("Login")}
      >
        Login
      </button>
    </div>
  );

  return (
    <WishlistProvider> {/* Wrap the app with WishlistProvider */}
      <OrderProvider>
        <CartProvider>
          <div className="App">
            <Navbar
              setActiveCategory={handleCategorySelect}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userName={userEmailOrMobile}
            />
            {renderContent()}
          </div>
        </CartProvider>
      </OrderProvider>
    </WishlistProvider> 
  );
}

export default App;
