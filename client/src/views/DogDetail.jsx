// import Dog from "../components/Dogs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { setLoading } from "../actions";
import "./DogDetail.css";

export default function DogDetail() {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const { redLoading } = useSelector((state) => state);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(setLoading(true))
        const response = await axios.get(`/dogs/${id}`);
        setDog(response.data); // ➡ Guardar datos
        dispatch(setLoading(false))
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [dispatch, id]); //⬅️ ahora este efecto se ejecutará cada vez que cambie este estado

  let arrayTemp = [];
  if (dog.temperamentos && typeof dog.id === "string")//viene de la api
    arrayTemp = dog.temperamentos;
  else if (dog.temperamentos && typeof dog.id === "number") {
    dog.temperamentos.forEach((element) => {
      arrayTemp.push(element.temperamento);
    });
  }

  const onClickBtn = () => {
    history.push("/dogs");
  };

  if (redLoading.loading) return <></>
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
