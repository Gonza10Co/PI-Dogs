import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTemp } from "../actions";
import axios from "axios";
import "./Form.css";
// import DogDetail from "./DogDetail";

const validate = (input) => {
  let { nombre, duracion, alturaMin, alturaMax, pesoMin, pesoMax } = input;

  const errors = {};
  const onlyStringsPattern = /^[a-zA-Z ]*$/;

  if (nombre.length && !onlyStringsPattern.test(nombre))
    errors.nombre = "Only strings are allowed";

  if (duracion.length && (duracion < 1 || duracion > 20))
    errors.duracion = "Life-span no valid";

  if (alturaMin.length) {
    if (alturaMin < 1) errors.alturaMin = "Min height can't be 0";
    if (alturaMin > 110)
      errors.alturaMin = "Min height can't be more than 110 cm";
    if (alturaMax.length && Number(alturaMin) > Number(alturaMax)) {
      errors.alturaMin = "Check min height value";
      errors.alturaMax = "Check max height value";
    }
  }

  if (alturaMax.length && alturaMax > 110)
    errors.alturaMax = "Check max height value";

  if (pesoMin.length) {
    if (pesoMin < 1) errors.pesoMin = "Min weight can't be 0";
    if (pesoMin > 50) errors.pesoMin = "Min weight can't be more than 50 kg";
    if (pesoMax.length && Number(pesoMin) > Number(pesoMax)) {
      errors.pesoMin = "Check min weight value";
      errors.pesoMax = "Check max weight value";
    }
  }

  if (pesoMax.length && pesoMax > 50) errors.pesoMax = "Check max weight value";
  return errors;
};

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { redTemp } = useSelector((state) => state);
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState({
    // nombre: "",
    // duracion: "",
    // alturaMin: "",
    // alturaMax: "",
    // pesoMin: "",
    // pesoMax: "",
    // temperamentos: [],
    // imagen:""

    nombre: "English Bulldog",
    duracion: "14",
    alturaMin: "10",
    alturaMax: "20",
    pesoMin: "12",
    pesoMax: "24",
    temperamentos: [],
    imagen:
      "https://blog.agrocampo.com.co/wp-content/uploads/2021/11/perro-bulldog-ingles.jpg",
  });
  const myPortrail = document.querySelector("#forms-about");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setForm((prevState) => {
      const newState = { ...prevState, [name]: value };
      setErrors(validate(newState));
      return newState;
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/dogs", form);
    if (response.status === 201) {
      document.getElementById("btn-modal").checked = true;
      document.getElementById("text-modal").innerText =
        "El registro se ha creado correctamente";
      setCreated(true);
    }
  };

  const onClickSignUp = () => {
    const userForms = document.getElementById("user_options-forms");
    userForms.classList.remove("bounceRight");
    userForms.classList.add("bounceLeft");
    
  };
  
  const onCLickLogIn = () => {
    const userForms = document.getElementById("user_options-forms");
    userForms.classList.remove("bounceLeft");
    userForms.classList.add("bounceRight");
    console.log(created);
    created && (myPortrail.style.opacity = 1);
  };

  //-------- Controles para Temperamentos ---------
  const handleOnClickDiv = () => {
    dispatch(getTemp());
    document.querySelector(".forms-select-btn").classList.toggle("open");
  };

  const setSelected = () => {
    let checked = document.querySelectorAll(".checked");
    let btnText = document.querySelector(".forms-btn-text");
    checked.length
      ? (btnText.value = `${checked.length} Selected`)
      : (btnText.value = "Select Temperament");
  };

  const OnClickItem = (e) => {
    const li = //si el click es en algun span, el elemento es li
      e.target.classList[0] === "forms-item"
        ? e.target
        : e.target.parentElement;
    li.classList.toggle("checked");
    li.classList[1]
      ? setForm((prevState) => ({
          ...prevState,
          temperamentos: [...form.temperamentos, li.childNodes[1].innerText],
        }))
      : setForm((prevState) => ({
          ...prevState,
          temperamentos: form.temperamentos.filter(
            (e) => e !== li.childNodes[1].innerText
          ),
        }));
    setSelected();
  };

  const onClickBtn = () => {
    history.push("/dogs");
  };

  return (
    <>
      <section className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-unregistered">
              <h2 className="user_unregistered-title">
                Didn't find your favorite breed?
              </h2>
              <p className="user_unregistered-text">
                In this section you can create the breed you want.
              </p>
              <button
                onClick={onClickSignUp}
                className="formBtn user_unregistered-signup"
                id="signup-button"
              >
                Fill the form
              </button>
            </div>

            <div className="user_options-registered">
              <h2 className="user_registered-title">Have an picture?</h2>
              <p className="user_registered-text">
                Here you can upload the best picture you found of your new
                creation.
              </p>
              <button
                onClick={onCLickLogIn}
                className="formBtn user_registered-login"
                id="login-button"
              >
                Back
              </button>
            </div>
          </div>
          <div className="user_options-forms" id="user_options-forms">
            {/* Dog Detail Render */}
            <section id="forms-about" className="forms-about">
              <div className="forms-main">
                <h1>
                  You just created the <span>{form.nombre}</span>
                </h1>
                <img src={form.imagen} alt="" />
                <div className="forms-text-wrapper">
                  <div className="forms-about-text-left">
                    <h4>Weight</h4>
                    <h6>{`${form.pesoMin} - ${form.pesoMax} kg`}</h6>
                    <h4>Height</h4>
                    <h6>{`${form.alturaMin} - ${form.alturaMax} cm`}</h6>
                    <h4>Life Span</h4>
                    <h6>{`${form.duracion} years`}</h6>
                  </div>
                  <div className="forms-about-text-right">
                    <h4>Temperament: </h4>
                    <ul>
                      {form.temperamentos?.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button onClick={onClickBtn} type="button">
                  back
                </button>
              </div>
            </section>

            {/* Creation Form */}
            <div className="user_forms-signup">
              <h2 className="forms_title">Create New Breed</h2>
              <form className="forms_form">
                {/* Name and Life Span */}
                <div className="forms_field">
                  <label className="forms-label">Breed Name: </label>
                  <input
                    required
                    type="text"
                    value={form.nombre}
                    className="formInput"
                    placeholder="Breed Name"
                    name="nombre"
                    onChange={handleOnChange}
                  />
                  <p className="forms-error">{errors.nombre}</p>
                </div>
                <div className="forms_field">
                  <label className="forms-label">Life span (years): </label>
                  <input
                    required
                    type="number"
                    value={form.duracion}
                    min="1"
                    max="20"
                    className="formInput"
                    placeholder="life span in years..."
                    name="duracion"
                    onChange={handleOnChange}
                  />
                  <p className="forms-error">{errors.duracion}</p>
                </div>
                {/* Height */}
                <div className="forms_field">
                  <label className="forms-label">Height min (cm): </label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="20"
                    value={form.alturaMin}
                    className="formInput"
                    placeholder="min height in cm..."
                    name="alturaMin"
                    onChange={handleOnChange}
                  />
                  <p className="forms-error">{errors.alturaMin}</p>
                </div>
                <div className="forms_field">
                  <label className="forms-label">Height max (cm): </label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="20"
                    value={form.alturaMax}
                    className="formInput"
                    placeholder="max height in cm..."
                    name="alturaMax"
                    onChange={handleOnChange}
                  />
                  <p className="forms-error">{errors.alturaMax}</p>
                </div>
                {/* Weight */}
                <div className="forms_field">
                  <label className="forms-label">Weight min (kg): </label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="20"
                    value={form.pesoMin}
                    className="formInput"
                    placeholder="min weight in kg..."
                    name="pesoMin"
                    onChange={handleOnChange}
                  />
                  <p className="forms-error">{errors.pesoMin}</p>
                </div>
                <div className="forms_field">
                  <label className="forms-label">Weight max (kg): </label>
                  <input
                    required
                    type="number"
                    min="1"
                    max="20"
                    value={form.pesoMax}
                    className="formInput"
                    placeholder="max weight in kg..."
                    name="pesoMax"
                    onChange={handleOnChange}
                  />
                  <p className="forms-error">{errors.pesoMax}</p>
                </div>
                {/* Temperament and Image */}
                <div className="forms_field">
                  <div onClick={handleOnClickDiv} className="forms-select-btn">
                    <span className="forms-btn-text">Select Temperament </span>
                  </div>

                  <ul className="forms-list-items">
                    {redTemp.map((t) => (
                      <li
                        key={t.id}
                        className="forms-item"
                        onClick={OnClickItem}
                      >
                        <span className="forms-checkbox">
                          <i className="fa-solid fa-check forms-check-icon"></i>
                        </span>
                        <span id={`item${t.id}`} className="forms-item-text">
                          {t.temperamento}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="file">
                  {/* <input
                    type="text"
                    id="file"
                    aria-label="File browser example"
                    className="btn-upload"
                    onChange={viewFile}
                    accepts="image/png, image/jpg"
                  /> */}
                  <input
                    type="text"
                    className="file-custom"
                    value={form.imagen}
                    placeholder="input img url..."
                    name="imagen"
                    onChange={handleOnChange}
                  ></input>
                  {/* <img id="img" src="" alt="" style={{ width: "100px" }} /> */}
                </div>
                <div className="forms_buttons">
                  <input
                    type="submit"
                    value="Create"
                    className="formInput forms_buttons-action"
                    onClick={handleOnSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <input type="checkbox" id="btn-modal" />
      <div className="container-modal">
        <div className="content-modal">
          <h2>Create Breed</h2>
          <p id="text-modal"></p>
          <div className="btn-cerrar">
            <label htmlFor="btn-modal">Cerrar</label>
          </div>
        </div>
        <label htmlFor="btn-modal" className="cerrar-modal"></label>
      </div>
    </>
  );
}
