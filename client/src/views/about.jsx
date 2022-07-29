import './about.css'

export default function About() {
  return (
    <section className="about-me">
      <div className="main-me">
        <img src="../../assets/OliYo.jpeg" alt="" />
        <div className="about-me-text">
          <h1>About me</h1>
          <h5>
            Full Stack Web <span>Developer</span>
          </h5>
          <p>
            I am a Full Stack web developer. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dicta eaque illo necessitatibus natus
            iure, maxime eum minus similique aliquid perferendis dolor quod
            laboriosam rem nulla, fugit quaerat aperiam doloribus totam.
          </p>
          <button type="button">
            <a href="/dogs/">back</a>
          </button>
        </div>
      </div>
    </section>
  );
}