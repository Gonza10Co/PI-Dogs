//https://www.youtube.com/watch?v=IBDKc1T5KQ8
import "./MultOpt.css";
import { useDispatch, useSelector } from "react-redux";
import { clearDogs, getTemp, getTempDogs, setPage } from "../actions";
import { useState } from "react";

export const MultOpts = () => {
  const { redTemp } = useSelector((state) => state);
  const [queryTemps, setQueryTemps] = useState([]);
  const dispatch = useDispatch();

  const countSelected = () => {
    let checked = document.querySelectorAll(".checked");
    let btnText = document.querySelector(".btn-text");
    checked.length
      ? (btnText.innerText = `${checked.length} Selected`)
      : (btnText.innerText = "Select Temperament");
  };

  const handleOnClickDiv = () => {
    dispatch(getTemp());
    document.querySelector(".select-btn").classList.toggle("open");
  };

  const OnClickItem = (e) => {
    const li = //si el click es en algun span, el elemento es li
      e.target.classList[0] === "item" ? e.target : e.target.parentElement;
    li.classList.toggle("checked");
    li.classList[1]
      ? setQueryTemps([...queryTemps, li.childNodes[1].innerText])
      : setQueryTemps(
          queryTemps.filter((e) => e !== li.childNodes[1].innerText)
        );
    countSelected();
  };

  const handleOnClickRender = () => {
    document.querySelector(".select-btn").classList.toggle("open");
    dispatch(clearDogs())
    dispatch(setPage(1));
    dispatch(getTempDogs({ temp: queryTemps }));
  };

  return (
    <div className="container">
      <div onClick={handleOnClickDiv} className="select-btn">
        <span className="btn-text">Select Temperament </span>
        <span onClick={handleOnClickRender} className="filter">
          <i className="fa-solid fa-filter"></i>
        </span>
      </div>

      <ul className="list-items">
        {redTemp.map((t) => (
          <li key={t.id} className="item" onClick={OnClickItem}>
            <span className="checkbox">
              <i className="fa-solid fa-check check-icon"></i>
            </span>
            <span id={`item${t.id}`} className="item-text">
              {t.temperamento}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
