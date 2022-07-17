import Dog from "../components/Dogs";
import { useEffect, useState } from "react";

export default function Dogs(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (loading) {
      fetch("http://localhost:3001/dogs")
        .then((response) => {
          if (response.ok) {
            // ⬆ verificamos que todo esté bien con la respuesta HTTP
            response.json().then((resJson) => {
              // ⬆ si está todo bien, proseguimos a transformar a JSON y actualizar los estados
              setData(resJson); // ➡ Guardar datos
              setLoading(false); // ➡ Desactivar modo "cargando"
              setError(null); // ➡ No hubo error"
            });
          } else {
            setError("Hubo un error cargando Data"); // ⬅️ hubo un problema HTTP 4XX o 5XX
          }
        })
        .catch((error) => {
          // ⬆ hubo un problema que no permitió hacer la solicitud
          setError("No pudimos hacer la solicitud para obtener el perrito");
        });
    }
  }, [loading]); //⬅️ ahora este efecto se ejecutará cada vez que cambie este estado

  return (
    <main>
      {data.map((raza) => (
        <Dog
          key={raza.id}
          id={raza.id}
          nombre={raza.nombre}
          temperamento={raza.temperamento}
          peso={raza.peso}
          imagen={raza.imagen}
        />
      ))}
    </main>
  );
}
