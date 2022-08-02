import "./Home.css";

export default function Home() {
  return (
    // <main>
    //   <h1>Hola Gonzalo 👋🏻</h1>
    //   <div>
    //     <Link to="/dogs">Ver los perritos 🐶🐶</Link>
    //   </div>
    // </main>
    <>
    <div className="bg">
      <article className="contain">
        <h2 className="title">Doggypedia</h2>
         <a href="/dogs" className="landing-btn">
          Home
        </a>
      </article>
    </div>
    </>
  );
}
