import React, { useCallback, useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
import Alert from "../Components/Alert";
import _ from "loadsh";
import Title from "./Title";
import Pagenation from "../Components/Pagenation";
import pagenate from "../utility/pagenate";
import DropDown from "../Components/DropDown";
import ListGroup from "../Components/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTabel from "./MoviesTabel";
import "../css/style.scss";
import { Link } from "react-router-dom";
import Input from "../Components/Input";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState({
    searchQuery: "",
  });
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGenres, setCurrentGenres] = useState("All");
  const [pageSize, setPageSize] = useState();
  const [columns, setColumns] = useState({
    path: "title",
    order: "asc",
  });
  const [alert, setAlert] = useState({
    isShow: false,
    type: "warning",
    message: "",
  });
  const OnClose = useCallback(() => {
    setAlert({
      isShow: false,
      type: "",
      message: "",
    });
  }, []);

  useEffect(() => {
    if (alert.isShow) {
      setTimeout(() => {
        OnClose();
      }, 3000);
    }
  });
  useEffect(() => {
    setMovies(getMovies());
    setGenres(getGenres());
    setPageSize(5);
  }, []);
  useEffect(() => {
    document.title = "Home";
  }, []);

  const handelDelete = useCallback(
    (item) => {
      const new_list = movies.filter((movie) => {
        if (movie._id !== item._id) {
          return movie;
        } else {
          return null;
        }
      });
      setMovies(new_list);
      setAlert({
        isShow: true,
        type: "success",
        message: "Movie delete successfully.",
      });
    },
    [movies]
  );

  const titles = [
    "title",
    "genre",
    "numberInStock",
    "dailyRentalRate",
    "liked",
  ];
  const handelLike = useCallback(
    (item) => {
      const list = movies.filter((cele) => {
        if (cele === item) {
          cele.liked = !cele.liked;
          return cele;
        }
        return cele;
      });

      setMovies(list);
    },
    [movies]
  );

  const handelPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const allMovies = movies;
  let filtered = {};
  if (query.searchQuery !== "") {
    filtered = allMovies.filter((m) => {
      return m.title.toLowerCase().includes(query.searchQuery.toLowerCase());
    });
  } else {
    filtered =
      "All" === currentGenres
        ? movies
        : movies.filter((cele) => cele.genre.name === currentGenres);
  }

  const sorted = _.orderBy(filtered, [columns.path], [columns.order]);

  const moviesList = pagenate(sorted, currentPage, pageSize);

  const handelShowRows = useCallback((val) => {
    setPageSize(val);
  }, []);

  const handelChangeGenres = useCallback((val) => {
    setCurrentGenres(val);
  }, []);

  const handelSort = useCallback((path, order) => {
    setColumns({ path, order });
  }, []);

  const handelQuery = useCallback((e) => {
    let name = e.target.name;
    let value = e.target.value;
    const data = query;
    data[name] = value;
    setQuery({ ...data });
  }, []);

  return (
    <div className="container">
      {alert.isShow && (
        <Alert
          type={alert.type}
          message={alert.message}
          OnClose={OnClose}
        ></Alert>
      )}
      {movies.length === 0 ? (
        <Title title={"there are no movies in the database"} />
      ) : (
        <>
          <Title
            title={`showing ${moviesList.length} movies out of ${filtered.length}`}
          />
          <DropDown onChange={handelShowRows} pageSize={pageSize} />
          <Input
            type={"text"}
            placeholder={"Search...."}
            name="searchQuery"
            id="searchQuery"
            value={query.searchQuery}
            onChange={handelQuery}
          />
          <div className="row table-box">
            <div className="col mt-3 box-1">
              <ListGroup
                currentGenres={currentGenres}
                OnClick={handelChangeGenres}
                items={genres}
              />
            </div>
            <div className="col box-2">
              {moviesList.length === 0 ? (
                <p className="h3 text-capitalize mt-3">
                  there are no movies of {currentGenres} genres
                </p>
              ) : (
                <>
                  <Link
                    className="btn btn-primary mt-3"
                    to="/form-app/movies/new"
                  >
                    New Movie
                  </Link>
                  <MoviesTabel
                    columns={columns}
                    OnLike={handelLike}
                    OnDelete={handelDelete}
                    moviesList={moviesList}
                    titles={titles}
                    onSort={handelSort}
                  />
                </>
              )}

              <Pagenation
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handelPageChange}
                itemsCount={filtered.length}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
