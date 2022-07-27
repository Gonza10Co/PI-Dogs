// import Dog from "../components/Dogs";
import { useEffect, useState } from "react";
import { useParams,  useHistory } from "react-router-dom";
import "./DogDetail.css";

export default function DogDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dog, setDog] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      fetch(`http://localhost:3001/dogs/${id}`)
        .then((response) => {
          if (response.ok) {
            response.json().then((resJson) => {
              setDog(resJson); // ➡ Guardar datos
              setLoading(false); // ➡ Desactivar modo "cargando"
            });
          } else {
            console.log("Hubo un error cargando Data"); // ⬅️ hubo un problema HTTP 4XX o 5XX
          }
        })
        .catch((error) => {
          console.log("No pudimos hacer la solicitud para obtener el perrito");
        });
    }
  }, [id, loading]); //⬅️ ahora este efecto se ejecutará cada vez que cambie este estado

  let arrayTemp = [];
  if (dog.temperamentos && typeof dog.id === "string")
    arrayTemp = dog.temperamentos;
  else if (dog.temperamentos && typeof dog.id === "number") {
    dog.temperamentos.forEach((element) => {
      arrayTemp.push(element.temperamento);
    });
  }

  const onClickBtn = () => {
    history.push("/dogs");
  };

  return (
    <section className="about">
      <div className="main">
        <h1>
          About the <span>{dog.nombre}</span>
        </h1>
        <img src={dog.imagen} alt="" />
        <div className="text-wrapper">
          <div className="about-text-left">
            <h4>Weight</h4>
            <h6>{`${dog.pesoMin} - ${dog.pesoMax} kg`}</h6>
            <h4>Height</h4>
            <h6>{`${dog.alturaMin} - ${dog.alturaMax} cm`}</h6>
            <h4>Life Span</h4>
            <h6>{dog.duracion}</h6>
          </div>
          <div className="about-text-right">
            <h4>Temperament: </h4>
            <ul>
              {arrayTemp.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={onClickBtn} type="button">
          back
        </button>
      </div>
    </section>
  );
}
