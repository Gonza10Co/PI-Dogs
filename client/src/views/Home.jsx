import "./Home.css";

export default function Home() {
  return (
    // <main>
    //   <h1>Hola Gonzalo ππ»</h1>
    //   <div>
    //     <Link to="/dogs">Ver los perritos πΆπΆ</Link>
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
