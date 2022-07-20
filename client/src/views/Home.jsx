import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h1>Hola Gonzalo 👋🏻</h1>
      <div>
        <Link to="/dogs">Ver los perritos 🐶🐶</Link>
      </div>
    </main>
  );
}
