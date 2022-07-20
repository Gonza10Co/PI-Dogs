import { Link } from "react-router-dom";
import "./Dogs.css";

export default function Dog(props) {
  const { id, nombre, temperamento, peso, imagen } = props;
  
  const tempString = temperamento?.join(", ");
  
  var cardStyle = {
    backgroundImage: `url(${imagen})`,
  };

  return (
    <div style={cardStyle} className="card">
      <div className="border">
        <Link to={`/dogs/${id}`}>
          <h2>{nombre}</h2>
        </Link>
        <h5>
          <span className="peso">Weight: {peso} kg</span>
        </h5>
        <h5>
          <span className="temp">{tempString}</span>
        </h5>
      </div>
    </div>
  );
}
