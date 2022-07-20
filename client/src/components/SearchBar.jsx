import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, sortDesc } from "../actions";
import { MultOpts } from "./MultOpts";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { redDogs: data } = useSelector((state) => state);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogs(search));
  };

  const onClickSort = () => {
    const element = document.querySelector(".sort")
    element.classList.toggle("desc");
    if (element.classList[1] === "desc") {
      element.childNodes[0].className = "fa-solid fa-arrow-up-z-a"
      dispatch(sortDesc(data));
    } else {
      element.childNodes[0].className = "fa-solid fa-arrow-down-a-z";
      dispatch(getDogs());
    }
  }
  
  return (
    <>
      <div className="topnav">
        <a className="active" href="/dogs">
          Home
        </a>
        <a href="#about">Create</a>
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
            <button className='btn-search' type="submit">
              <i className="fas fa-search"></i>
            </button>
            <button type="button" onClick={onClickSort} className="sort">
              <i className="fa-solid fa-arrow-down-a-z"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
