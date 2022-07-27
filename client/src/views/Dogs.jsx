import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dog from "../components/Dogs";
import { getDogs } from "../actions";
import "./Dogs.css";
import Paginado from "../components/Paginado";

export default function Dogs() {
  const { redDogs: data, redPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  //Para el paginado:
  const cardsPerPage=8;
  const totalCards = data.length;
  const indexLastCard = redPage * cardsPerPage;
  const indexFirstCard = indexLastCard - cardsPerPage;
  const cardsPage = data.slice(indexFirstCard, indexLastCard);
  
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);
  
  return (
    <>
      <Paginado
        cardsPerPage={cardsPerPage}
        totalCards={totalCards}
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
