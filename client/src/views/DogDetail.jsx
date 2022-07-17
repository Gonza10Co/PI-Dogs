// import Dog from "../components/Dogs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DogDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dog, setDog] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) {
      fetch(`http://localhost:3001/dogs/${id}`)
        .then((response) => {
          if (response.ok) {
            response.json().then((resJson) => {
              setDog(resJson); // ➡ Guardar datos
              setLoading(false); // ➡ Desactivar modo "cargando"
              setError(null); // ➡ No hubo error"
            });
          } else {
            setError("Hubo un error cargando Data"); // ⬅️ hubo un problema HTTP 4XX o 5XX
          }
        })
        .catch((error) => {
          setError("No pudimos hacer la solicitud para obtener el perrito");
        });
    }
  }, [id, loading]); //⬅️ ahora este efecto se ejecutará cada vez que cambie este estado

  return (
    <main>
      <div>
        <img src={dog.imagen} alt="" />
      </div>
      <h3>{dog.nombre}</h3>
      <h3>{dog.temperamento}</h3>
      <h3>{dog.peso}</h3>
    </main>
  );
}
