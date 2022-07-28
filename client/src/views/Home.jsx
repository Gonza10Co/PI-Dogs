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
      <article class="contain">
        <h2 class="title">Doggypedia</h2>
         <a href="/dogs" class="landing-btn">
          Home
        </a>
      </article>
    </div>
    </>
  );
}
