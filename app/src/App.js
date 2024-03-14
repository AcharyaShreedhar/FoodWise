import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { UserProvider, useUser } from "./containers/LoginContainer/UserContext";
import store from "./containers/ProductsContainer/store";
import Header from "./components/Core/Header/Header";
import Footer from "./components/Core/Footer/Footer";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import SignUpContainer from "./containers/SignUpContainer/SignUpContainer";
import BlogContainer from "./containers/AwarenessContainer/AwarenessContainer";
import ResetContainer from "./containers/ResetContainer/ResetContainer";
import SetPasswordContainer from "./containers/SetPasswordContainer/SetPasswordContainer";
import ProductsContainer from "./containers/ProductsContainer/ProductsContainer";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import AboutUsContainer from "./containers/AboutUsContainer/AboutUsContainer";
import ContactUsContainer from "./containers/ContactUsContainer/ContactUsContainer";

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<SignUpContainer />} />
            <Route path="/signup" element={<SignUpContainer />} />
            <Route path="/dashboard" element={<PrivateRoute />} />
            <Route path="/blog" element={<BlogContainer />} />
            <Route path="/aboutus" element={<AboutUsContainer />} />
            <Route path="/contactus" element={<ContactUsContainer />} />
            <Route path="/reset" element={<ResetContainer />} />
            <Route path="/set" element={<SetPasswordContainer />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/products/*" element={<PrivateRouteProducts />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </Provider>
  );
};

// Define a separate LoginComponent component to encapsulate the logic for rendering LoginContainer based on user state
const LoginComponent = () => {
  const { user } = useUser();
  return user ? <Navigate to="/" /> : <LoginContainer />;
};

// Define a PrivateRoute component to conditionally render components based on user state
const PrivateRoute = () => {
  const { user } = useUser();
  console.log("user", user);

  // Check if the user is an admin or not
  const isAdmin = user && user.userType === "Admin";

  return (
    <>
      {/* Conditionally render HomeContainer or redirect to login */}
      {isAdmin ? <HomeContainer /> : <Navigate to="/login" />}
    </>
  );
};

// Define a PrivateRouteProducts component to conditionally render ProductsContainer based on user state
const PrivateRouteProducts = () => {
  const { user } = useUser();

  // Check if the user is an admin or not
  const isAdmin = user && user.userType === "Admin";

  return isAdmin ? <ProductsContainer /> : <Navigate to="/login" />;
};

export default App;
