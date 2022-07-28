import { useDispatch } from "react-redux";
import { setPage } from "../actions";
import "./Paginado.css";

export default function Paginado({ cardsPerPage, totalCards, indexFirstCard }) {
  const dispatch = useDispatch();
  const pages = Math.ceil(totalCards / cardsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const onClickPage = (e) => dispatch(setPage(e.target.innerHTML));

  const onClickPrev = () => {
    let page = document.querySelector(".active-pag");
    page.classList.remove("active-pag");

    page.previousSibling.innerHTML === "Prev"
      ? (page = document.querySelector(`#page-${pages}`))
      : (page = page.previousSibling);

    dispatch(setPage(page.innerHTML));
  };

  const onClickNext = () => {
    let page = document.querySelector(".active-pag");
    page.classList.remove("active-pag");

    page.nextSibling.innerHTML === "Next"
      ? (page = document.querySelector("#page-1"))
      : (page = page.nextSibling);

    dispatch(setPage(page.innerHTML));
  };

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="prev" onClick={onClickPrev}>
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            className={
              indexFirstCard / cardsPerPage + 1 === number
                ? "pageNumber active-pag"
                : "pageNumber"
            }
            id={`page-${number}`}
            key={number}
            onClick={onClickPage}
          >
            {number}
          </li>
        ))}
        <li className="next" onClick={onClickNext}>
          Next
        </li>
      </ul>
    </div>
  );
}
