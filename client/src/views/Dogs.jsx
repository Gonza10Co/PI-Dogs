import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dog from "../components/Dogs";
import {getDogs, sortDesc} from "../actions";
import "./Dogs.css";
import { MultOpts } from "../components/MultOpts.jsx";

export default function Dogs() {
  const { redDogs: data } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch, ]);

  return (
    <>
      <button
        onClick={() => dispatch(getDogs())}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="button"
        aria-pressed="true"
      >
        Order Asc
      </button>
      <button
        onClick={() => dispatch(sortDesc(data))}
        type="button"
        className="btn btn-primary active"
        data-bs-toggle="button"
      >
        Order Desc
      </button>

      <MultOpts />

      <div className="wrapper">
        {data.map((raza) => (
          <div key={raza.id}>
            <Dog
              id={raza.id}
              nombre={raza.nombre}
              temperamento={raza.temperamento}
              peso={raza.peso}
              imagen={raza.imagen}
            />
          </div>
        ))}
      </div>
    </>
  );
}
