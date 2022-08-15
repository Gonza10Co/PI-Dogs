import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import Dogs from "../components/Dogs";

configure({ adapter: new Adapter() });

describe("<Dogs />", () => {
  let dogs;
  // Usar function component!
  beforeEach(() => {
    dogs = shallow(<Dogs />);
    expect(isReact.classComponent(Dogs)).toBeFalsy();
  });

  it('Debería renderizar un <Link to="dogs/undefined" />.', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(dogs.find(Link).length).toBeGreaterThanOrEqual(1);
    expect(dogs.find(Link).at(0).prop("to")).toEqual("/dogs/undefined");
  });
});
