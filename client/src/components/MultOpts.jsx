//https://www.youtube.com/watch?v=IBDKc1T5KQ8
import "./MultOpt.css";
import { useDispatch, useSelector } from "react-redux";
import { getTemp, getTempDogs } from "../actions";

export const MultOpts = () => {
  const { redTemp } = useSelector((state) => state);
  const dispatch = useDispatch();
  const queryTemps = [];

  const countSelected = () => {
    let checked = document.querySelectorAll(".checked");
    let btnText = document.querySelector(".btn-text");
    checked.length
      ? (btnText.innerText = `${checked.length} Selected`)
      : (btnText.innerText = "Select Languaje");
  };

  const handleOnClickDiv = (e) => {
    dispatch(getTemp());
    e.target.classList.toggle("open");
  };

  const handleOnClickItem = (e) => {
    e.target.classList.toggle("checked");
    e.target.classList[1]
      ? queryTemps.push(e.target.childNodes[1].innerText)
      : queryTemps.pop(e.target.childNodes[1].innerText);
    console.log("queryTemps ", queryTemps);
    countSelected();
  };

  const handleOnClickRender = () => {
    dispatch(getTempDogs({ temp: queryTemps }));
    document.querySelector(".select-btn").classList.toggle("open");
    document
      .querySelectorAll(".checked")
      .forEach((e) => (e.className = "item"));
    countSelected();
  };

  return (
    <div className="container">
      <div onClick={handleOnClickDiv} className="select-btn">
        <span className="btn-text">Select Temperament </span>
        <span onClick={handleOnClickRender} className="arrow-dwn">
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>

      <ul className="list-items">
        {redTemp.map((t) => (
          <li key={t.id} className="item" onClick={handleOnClickItem}>
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
