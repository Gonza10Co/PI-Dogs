import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getDogs,
  sortAscAZ,
  sortDescAZ,
  sortAsc19,
  sortDesc19,
  setPage,
} from "../actions";
import { MultOpts } from "./MultOpts";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const { redDogs: data } = useSelector((state) => state);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (location.pathname !== "/dogs") history.push("/dogs");
    let page = document.querySelector(".active-pag");
    page.classList.remove("active-pag");
    page = document.querySelector("#page-1");
    page.classList.toggle("active-pag");
    await dispatch(getDogs(search));
    dispatch(setPage(1));
  };

  const onClickSortAZ = () => {
    const element = document.querySelector(".sortAZ");
    element.classList.toggle("desc");
    if (element.classList[1] === "desc") {
      element.childNodes[0].className = "fa-solid fa-arrow-up-z-a";
      dispatch(sortDescAZ(data));
    } else {
      element.childNodes[0].className = "fa-solid fa-arrow-down-a-z";
      dispatch(sortAscAZ(data));
    }
  };

  const onClickSort19 = () => {
    const element = document.querySelector(".sort19");
    element.classList.toggle("desc");
    if (element.classList[1] === "desc") {
      element.childNodes[0].className = "fa-solid fa-arrow-up-1-9";
      dispatch(sortDesc19(data));
    } else {
      element.childNodes[0].className = "fa-solid fa-arrow-down-1-9";
      dispatch(sortAsc19(data));
    }
  };

  return (
    <>
      <div className="topnav">
        <a className="active" href="/dogs">
          Home
        </a>
        <a href="/dogs/create">Create</a>
        <a href="#contact">About</a>
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
