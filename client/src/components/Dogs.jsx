import { Link } from "react-router-dom";

export default function Dog(props) {
  const { id, nombre, temperamento, peso, imagen } = props
  return (
    <div>
      <div>

      <img src={imagen} alt="" />
      </div>
      <Link to={`/dogs/${id}`}>
      <span>{nombre}</span>
      </Link>
      <span>{temperamento}</span>
      <span>{peso}</span>
    </div>
  );
}
