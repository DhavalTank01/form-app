import Joi from "joi-browser";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Select from "../Components/Select";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

const MovieForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Movie Form";
  }, []);

  const [details, setDetails] = useState({
    title: "",
    genreId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
    publishDate: "",
  });

  const [error, setError] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
    publishDate: "",
  });

  const handelChange = useCallback(
    (e) => {
      const data = details;
      data[e.target.name] = e.target.value;
      setDetails({ ...data });
    },
    [details]
  );

  let schema = {
    title: Joi.string().label("Title").required(),
    genreId: Joi.string().label("Genre").required(),
    numberInStock: Joi.number().label("Number In Stock").required().greater(1),
    dailyRentalRate: Joi.number()
      .label("Daily Rental Rate")
      .required()
      .greater(1),
    publishDate: Joi.string().label("Publish Date").required(),
  };

  const validate = useCallback(() => {
    const option = { abortEarly: false };
    const error = Joi.validate(details, schema, option);

    if (error.error) {
      const errors = {};
      for (let item of error.error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    }
    return null;
  }, [details]);

  const handelSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validate();
      setError(errors === null ? {} : errors);
      if (!errors) {
        const res = saveMovie(details);
        if (res) {
          console.log("details: ", details);
          navigate("/form-app/movies");
        }
      }
    },
    [details, navigate, validate]
  );

  return (
    <div className="continer">
      <div className="h5">Movie Form</div>
      <form onSubmit={handelSubmit}>
        <Input
          placeholder="Enter title"
          type="text"
          name="title"
          label="Title"
          value={details.title}
          onChange={handelChange}
          id="title"
          error={error.title}
        />
        <Select
          id="genreId"
          name="genreId"
          label="Genre"
          onChange={handelChange}
          option={getGenres()}
          value={details.genreId}
          error={error.genreId}
        />
        <Input
          placeholder="Enter number in stock"
          type="number"
          name="numberInStock"
          label="Number in stock"
          value={details.numberInStock}
          onChange={handelChange}
          id="numberInStock"
          error={error.numberInStock}
        />
        <Input
          placeholder="Enter daily rental rate"
          type="number"
          name="dailyRentalRate"
          label="Daily rental rate"
          value={details.dailyRentalRate}
          onChange={handelChange}
          id="dailyRentalRate"
          error={error.dailyRentalRate}
        />
        <Input
          placeholder="Enter publish date"
          type="date"
          name="publishDate"
          label="Publish date"
          value={details.publishDate}
          onChange={handelChange}
          id="publishDate"
          error={error.publishDate}
        />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
