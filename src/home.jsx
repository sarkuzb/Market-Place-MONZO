import { Products } from "./data";
import { Category } from "./category";
import shoppingCart from "./assets/shopping-cart.png";
import React, { useState, useEffect } from "react";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isShoppingCartOpen, setIsShoppingCart] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };
  const toggleSignUp = () => {
    setIsSignUpOpen(!isSignUpOpen);
  };
  const toggleShoppingCart = () => {
    setIsShoppingCart(!isShoppingCartOpen);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (isShoppingCartOpen && event.deltaY > 0) {
        // deltaY > 0 indicates scroll down
        setIsShoppingCart(false);
      }
    };

    if (isShoppingCartOpen) {
      window.addEventListener("wheel", handleWheel);
    } else {
      window.removeEventListener("wheel", handleWheel);
    }

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isShoppingCartOpen]);

  const goToLoginFromSignUp = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };
  const goToSignUpFromLogin = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const addToCart = (id) => {
    setCartItems((cartItems) => ({
      ...cartItems,
      [id]: (cartItems[id] || 0) + 1,
    }));
    setCartCount(cartCount + 1);
  };

  return (
    <>
      <div className="body mx-auto max-w-full">
        {/* this is the header */}
        <div className="sm:w-[580px] md:w-[730px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1300px]  h-20 flex items-center justify-between Header">
          <p className="sm:text-3xl Font-designer font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-700 md:text-5xl">
            Monzo
          </p>
          <div className="Input-one flex flex-grow items-center border rounded ml-11 mr-6 focus-within:shadow-lg focus-within:shadow-gray-200 transition duration-100 ease-in ">
            <input
              className="Input-two grow outline-none ml-2 sm:placeholder:text-xs md:placeholder:text-lg"
              placeholder="Search..."
            ></input>
            <button className="sm:text-xs sm:px-2 sm:p-[5px] bg-gray-200 md:p-2 md:px-4 text-black font-light md:text-sm hover:bg-gray-300 transition ease-out duration-150">
              Search
            </button>
          </div>
          <div className="flex items-center flex-row gap-2">
            <div
              onClick={toggleShoppingCart}
              className="flex bg-gray-200 sm:p-1 md:p-2 rounded hover:bg-gray-300 transition duration-150 cursor-pointer relative"
            >
              <img
                className="md:w-6 sm:w-5"
                src={shoppingCart}
                alt="shopping-cart"
              />
              {cartCount > 0 && (
                <p className="Notification absolute bg-orange-500 text-xs text-white">
                  {cartCount}
                </p>
              )}
            </div>
            {isShoppingCartOpen && (
              <div
                className="fixed bg-white border-2 rounded-xl top-20 lg:w-72 md:w-60 flex flex-col p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {Object.values(cartItems).some((quantity) => quantity > 0) ? (
                  Products.map((product) => {
                    if (cartItems[product.id] > 0) {
                      return (
                        <div
                          key={product.id}
                          className="mb-4 border-b-2 border-t-2"
                        >
                          <div className="flex py-2 items-center">
                            <img
                              src={product.image}
                              alt={product.productName}
                              className="flex items-center w-16 h-16 mr-4"
                            />
                            <div className="flex flex-col">
                              <span className="font-light">
                                {product.productName}
                              </span>
                              <span className="font-semibold md:text-xs lg:text-[14px]">
                                {product.productPrice} uzs
                              </span>
                              <p className="font-light">
                                Quantity:{" "}
                                <span className="font-semibold">
                                  {cartItems[product.id]}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p className="text-center text-gray-600">
                    Your Cart Is Empty
                  </p>
                )}
              </div>
            )}

            <p
              className="sm:p-1 sm:text-xs md:p-2 md:text-sm cursor-pointer hover:scale-110 active:scale-100 transition-transform"
              onClick={toggleLogin}
            >
              Log in
            </p>
            {isLoginOpen && (
              <div
                className="bg-gray-900/60 flex items-center justify-center fixed w-full h-full top-0 left-0 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white w-96 p-6 rounded-md shadow-lg relative">
                  {/* Close Button */}
                  <button
                    onClick={toggleLogin}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-bold text-xl"
                  >
                    &times;
                  </button>
                  {/* Login Form */}
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Login
                  </h2>
                  <form className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Username"
                      className="border rounded p-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border rounded p-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-semibold py-2 rounded hover:scale-105 transition-transform"
                    >
                      Login
                    </button>
                  </form>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span
                      onClick={goToSignUpFromLogin}
                      className="text-blue-500 hover:text-blue-800 transition duration-150 cursor-pointer"
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              </div>
            )}
            <p
              className="sm:p-[6px] sm:text-xs border-2 md:p-2 rounded md:text-sm hover:bg-gray-100 transition ease-out duration-150 cursor-pointer"
              onClick={toggleSignUp}
            >
              Sign Up
            </p>
            {isSignUpOpen && (
              <div
                className="bg-gray-900/60 flex items-center justify-center fixed w-full h-full top-0 left-0 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white w-96 p-6 rounded-md shadow-lg relative">
                  {/* Close Button */}
                  <button
                    onClick={toggleSignUp}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 font-bold text-xl"
                  >
                    &times;
                  </button>
                  {/* Sign Up Form */}
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Sign Up
                  </h2>
                  <form className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Username"
                      className="border rounded p-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border rounded p-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border rounded p-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="border rounded p-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-semibold py-2 rounded hover:scale-105 transition-transform"
                    >
                      Sign Up
                    </button>
                  </form>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span
                      onClick={goToLoginFromSignUp}
                      className="text-blue-500 hover:text-blue-800 transition duration-150 cursor-pointer"
                    >
                      Log In
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* this is the category and products section */}
        <div className="sm:w-[580px] md:w-[730px] lg:w-[800px] xl:w-[1100px] 2xl:w-[1200px] Category-and-product">
          {/* category */}
          <div className="sm:hidden md:block md:w-3/12 lg:w-3/12">
            <div className="border rounded p-4">
              <div>
                <p className="flex justify-center bg-gray-200 px-4 py-1 rounded font-semibold">
                  Category
                </p>
              </div>
              <div className="flex flex-col flex-grow py-2 border-t-2 border-b-2 mb-4 mt-4">
                {Category.map((category) => (
                  <p className="p-2 hover:bg-gray-100 transition duration-150 cursor-pointer rounded font-light">
                    {category.category}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* products */}
          <div className="md:grid-cols-3 md:w-9/12 lg:grid-cols-4 lg:w-9/12 md:ml-10 grid grid-cols-4 gap-4 Container">
            {Products.map((product) => (
              <div
                key={product.id}
                className="secondContainer flex flex-col border rounded p-4"
              >
                <div className="flex justify-center hover:scale-95 transition ease-out duration-200 cursor-pointer">
                  <img
                    className="w-60"
                    src={product.image}
                    alt={product.productName}
                  />
                </div>
                <div className="flex justify-between lg:py-2 md:py-1 border-t-2 border-b-2 mt-4 lg:h-36 xll:h-32 flex flex-col">
                  <div className="flex flex-col justify-between md:h-20 lg:h-24 xl:h-20">
                    <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-700 hover:text-gray-300 transition ease-out duration-200 cursor-pointer">
                      {product.productName}
                    </p>
                    <p className="md:text-[10px] lg:text-[11px] xl:text-sm text-gray-800 font-semibold underline mt-4">
                      {product.productPrice} uzs
                    </p>
                  </div>
                  <div className="flex mt-4 items-center">
                    <img
                      className="w-6"
                      src={product.secondImage}
                      alt="Rating"
                    />
                    <span className="Rating">{product.rating}</span>
                  </div>
                </div>

                {/* add to cart button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      addToCart(product.id);
                    }}
                    className="lg:text-[10px] lg:w-full lg:px-[0] lg:py-[4px] lg:rounded xl:text-xs xl:w-full xl:px-7 xl:py-2 xl:rounded-md text-white text-xs font-bold px-7 py-2 rounded-md mt-4 bg-gradient-to-r from-cyan-400 to-blue-700 hover:scale-105 transition ease-out duration-600 active:scale-100"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Me Chat Button */}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={toggleChat}
            className="text-sm font-light bg-gradient-to-r from-cyan-400 to-blue-700 text-white rounded-full px-2 py-3 shadow-lg hover:scale-105 transition-transform active:scale-100"
          >
            Chat
          </button>
        </div>

        {/* Chat Component */}
        {isChatOpen && (
          <div className="chat-open fixed border bottom-10 right-10 bg-white rounded p-4 w-72">
            <h3 className="font-semibold">Contact Me</h3>
            <p className="text-gray-700 font-light pb-6 pt-1 text-sm">
              Feel free to send a message!
            </p>
            <textarea
              className="w-full h-52 border rounded p-2 outline-none resize-none placeholder:font-light placeholder:text-sm"
              placeholder="Type your message here..."
            ></textarea>
            <div className="flex flex-row items-end justify-between">
              <button className="font-light bg-gradient-to-r from-cyan-400 to-blue-700 text-white rounded-md px-5 py-1 mt-2 hover:scale-105 active:scale-100 transition-transform">
                Send
              </button>
              <p>
                <a
                  href="https://t.me/sarvarkhujamov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-cyan-400 to-blue-700 transition ease-in-out duration-200"
                >
                  Sarvar Khujamov
                </a>
              </p>
            </div>
          </div>
        )}
        {/* here is bottom */}
        <div className="Bottom flex flex-col items-center justify-center p-2 mt-6 bg-gray-400">
          <p className="text-white font-semibold">
            This is the simple marketplace created by{" "}
            <a
              href="https://tmci.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-red-700"
            >
              TMCI
            </a>{" "}
            Student{" "}
            <span className="underline">
              <a
                href="https://t.me/sarvarkhujamov"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-cyan-400 to-blue-700"
              >
                Sarvar Khujamov!
              </a>
            </span>
          </p>

          <p>
            <p className="font-light text-white">© 2024 All rights reserved.</p>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
