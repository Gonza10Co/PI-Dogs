import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  sortAscAZ,
  sortDescAZ,
  sortAsc19,
  sortDesc19,
  setPage,
  searchDog,
  setLoading,
} from "../actions";
import { MultOpts } from "./MultOpts";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(searchDog(search));
    dispatch(setPage(1));
    if (location.pathname !== "/dogs") history.push("/dogs");
  };

  const onClickSortAZ = () => {
    dispatch(setLoading(true));
    const element = document.querySelector(".sortAZ");
    element.classList.toggle("desc");
    if (element.classList[1] === "desc") {
      element.childNodes[0].className = "fa-solid fa-arrow-up-z-a";
      dispatch(sortDescAZ());
    } else {
      element.childNodes[0].className = "fa-solid fa-arrow-down-a-z";
      dispatch(sortAscAZ());
    }
  };

  const onClickSort19 = () => {
    dispatch(setLoading(true));
    const element = document.querySelector(".sort19");
    element.classList.toggle("desc");
    if (element.classList[1] === "desc") {
      element.childNodes[0].className = "fa-solid fa-arrow-up-1-9";
      dispatch(sortDesc19());
    } else {
      element.childNodes[0].className = "fa-solid fa-arrow-down-1-9";
      dispatch(sortAsc19());
    }
  };

  return (
    <>
      <div className="topnav">
        <a
          className={location.pathname === "/dogs" ? "active" : ""}
          href="/dogs"
        >
          Home
        </a>
        <a
          className={location.pathname === "/dogs/create" ? "active" : ""}
          href="/dogs/create"
        >
          Create
        </a>
        <a
          className={location.pathname === "/dogs/about" ? "active" : ""}
          href="/dogs/about"
        >
          About
        </a>
        <MultOpts />
        <div className="search-container">
          <form onSubmit={handleOnSubmit}>
            <input
              id="search"
              type="text"
              placeholder="Search breed.."
              name="search"
              onChange={handleOnChange}
            />
            <button className="btn-search" type="submit">
              <i className="fas fa-search"></i>
            </button>
            <button type="button" onClick={onClickSortAZ} className="sortAZ">
              <i className="fa-solid fa-arrow-down-a-z"></i>
            </button>
            <button type="button" onClick={onClickSort19} className="sort19">
              <i className="fa-solid fa-arrow-down-1-9"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
