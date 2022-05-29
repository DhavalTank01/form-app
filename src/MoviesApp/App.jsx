import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Customers from "./Customers";
import Rentels from "./Rantels";
import Navbar from "./Navbar";
import ErrorPage from "../Components/ErrorPage";
import Footer from "../Components/Footer";
import MovieDetails from "./MovieDetails";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import MovieForm from "./MovieForm";

const App = () => {
  return (
    <>
      <div className="m-3">
        <Navbar />
        <Routes>
          <Route exact path="/form-app" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/form-app/not-found" element={<ErrorPage />} />
          <Route path="/form-app/customers" element={<Customers />} />
          <Route path="/form-app/rentals" element={<Rentels />} />
          <Route path="/form-app/signIn" element={<SignIn />} />
          <Route path="/form-app/signUp" element={<SignUp />} />
          <Route path="/form-app/movies" element={<Home />}></Route>
          <Route path="/form-app/movies/:id" element={<MovieDetails />} />
          <Route path="/form-app/movies/new" element={<MovieForm />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
