import { Link } from "react-router-dom";
import "./Dogs.css";

export default function Dog(props) {
  const { id, nombre, temperamentos, pesoMin, pesoMax, imagen } = props;
  let tempString = "";
  const pesoString = `${pesoMin} - ${pesoMax}`;

  if (temperamentos && typeof id === "string")
    tempString = temperamentos.join(", ");
  else if (temperamentos && typeof id === "number") {
    let arrayTemp = [];
    temperamentos.forEach((element) => {
      arrayTemp.push(element.temperamento);
    });
    tempString = arrayTemp.join(", ");
  }

  var cardStyle = {
    backgroundImage: `url(${imagen})`,
  };

  return (
    <div style={cardStyle} className="card">
      <div className="border">
        <Link to={`/dogs/${id}`}>
          <h2>{nombre}</h2>
        </Link>
        <h5 className="peso">
          <span>Weight: {pesoString} kg</span>
        </h5>
        <h5>
          <span className="temp">{tempString}</span>
        </h5>
      </div>
    </div>
  );
}
