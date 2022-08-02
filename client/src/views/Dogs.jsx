import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dog from "../components/Dogs";
import { clearDogs, getDogs } from "../actions";
import "./Dogs.css";
import Paginado from "../components/Paginado";

export default function Dogs() {
  const { redDogs: data, redPage, redSearch } = useSelector((state) => state);
  const dispatch = useDispatch();

  //Para el paginado:
  const cardsPerPage = 8;
  const indexLastCard = redPage * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  let totalCards = 0;
  let cardsPage = [];
  if (data) {
    totalCards = data.length;
    cardsPage = data.slice(indexFirstCard, indexLastCard);
  }

  useEffect(() => {
    dispatch(getDogs(redSearch));
    return () => dispatch(clearDogs());
  }, [dispatch, redSearch]);

  if (!data)
    return (
      <h1 style={{ color: "white", margin: "20px" }}>
        Breed not found ☹
      </h1>
    );

  return (
    <>
      <Paginado
        cardsPerPage={cardsPerPage}
        totalCards={totalCards}
        indexFirstCard={indexFirstCard}
      />
      <div className="wrapper">
        {cardsPage.map((raza) => (
          <div key={raza.id}>
            <Dog
              id={raza.id}
              nombre={raza.nombre}
              pesoMin={raza.pesoMin}
              pesoMax={raza.pesoMax}
              imagen={raza.imagen}
              temperamentos={raza.temperamentos}
            />
          </div>
        ))}
      </div>
    </>
  );
}
