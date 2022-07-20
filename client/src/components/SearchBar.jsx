import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogs(search));
  };

  return (
    <>
      <div className="topnav">
        <a className="active" href="/dogs">
          Home
        </a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <div className="search-container">
          <form onSubmit={handleOnSubmit}>
            <input
              id="search"
              type="text"
              placeholder="Search breed.."
              name="search"
              onChange={handleOnChange}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
