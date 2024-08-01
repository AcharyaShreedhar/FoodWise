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
import AddProductContainer from "./containers/AddProductContainer/AddProductContainer";
import EditProductContainer from "./containers/EditProductContainer/EditProductContainer";
import CreateProfileContainer from "./containers/CreateProfileContainer/CreateProfileContainer";
import ViewProfileContainer from "./containers/ViewProfileContainer/ViewProfileContainer";
import EditProfileContainer from "./containers/EditProfileContainer/EditProfileContainer";
import DonationsContainer from "./containers/DonationsContainer/DonationContainer";
import AddDonation from "./components/AddDonation/AddDonation";
import EditDonationContainer from "./containers/EditDonationContainer/EditDonationContainer";

const App = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpContainer />} />
            <Route path="/viewprofile" element={<ViewProfileContainer />} />
            <Route path="/editprofile" element={<EditProfileContainer />} />
            <Route path="/createprofile" element={<CreateProfileContainer />} />
            <Route path="/dashboard" element={<PrivateRoute />} />
            <Route path="/blog" element={<BlogContainer />} />
            <Route path="/aboutus" element={<AboutUsContainer />} />
            <Route path="/contactus" element={<ContactUsContainer />} />
            <Route path="/reset" element={<ResetContainer />} />
            <Route path="/set" element={<SetPasswordContainer />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/donations/*" element={<DonationsContainer />} />
            <Route path="/addDonation" element={<PrivateRouteAddDonations />} />
            <Route
              path="/donations/:donationId/edit"
              element={<PrivateRouteEditDonation />}
            />
            <Route path="/products/*" element={<PrivateRouteProducts />} />

            <Route path="/addproduct" element={<PrivateRouteAddProducts />} />
            <Route
              path="/products/:productId/edit"
              element={<PrivateRouteEditProduct />}
            />
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
  return  <LoginContainer />;
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

// Define a PrivateRouteProducts component to conditionally render AddProductContainer based on user state
const PrivateRouteAddProducts = () => {
  const { user } = useUser();

  // Check if the user is an admin or not
  const isAdmin = user && user.userType === "Admin";

  return isAdmin ? <AddProductContainer /> : <Navigate to="/login" />;
};

const PrivateRouteEditProduct = () => {
  const { user } = useUser();

  // Check if the user is an admin or not
  const isAdmin = user && user.userType === "Admin";

  return isAdmin ? <EditProductContainer /> : <Navigate to="/login" />;
};

// Define a PrivateRouteProducts component to conditionally render AddProductContainer based on user state
const PrivateRouteAddDonations = () => {
  const { user } = useUser();

  // Check if the user is an admin or not
  const isAdmin = user && user.userType === "Admin";

  return isAdmin ? <AddDonation /> : <Navigate to="/login" />;
};

const PrivateRouteEditDonation = () => {
  const { user } = useUser();

  // Check if the user is an admin or not
  const isAdmin = user && user.userType === "Admin";

  return isAdmin ? <EditDonationContainer /> : <Navigate to="/login" />;
};
export default App;
