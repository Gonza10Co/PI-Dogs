import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dog from "../components/Dogs";
import {getDogs} from "../actions";
import "./Dogs.css";

export default function Dogs() {
  const { redDogs: data } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch, ]);

  return (
    <>
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
