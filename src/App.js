import React, { useState } from "react";
import { parse, abs } from "mathjs";
import "./styles.css";

export default function App() {
  const [datos, guardarDatos] = useState({});
  const [respuesta, guardarRespuesta] = useState([]);

  const calcular = (formula, initial, upper, limite) => {
    const arr = [];
    const f = parse(formula);
    let a = Number(initial);
    let b = Number(upper);
    const lim = Number(limite);

    let c;
    let fi = f.evaluate({ x: a });
    let fu = f.evaluate({ x: b });

    let e = abs(fi - fu);
    let i = 0;
    while (1000 > i) {
      c = (a + b) / 2.0;
      let mult = f.evaluate({ x: c }) * f.evaluate({ x: a });
      arr.push(`mult: ${mult}, Raiz: ${c}, iteración: ${i}`);

      if (f.evaluate({ x: c }) === 0) {
        //arr.push(`mult: ${mult}, raiz: ${c}, iteración: ${i}`);
        break;
      } else if (mult < 0) {
        b = c;
      } else {
        a = c;
      }
      i = i + 1;
    }
    guardarRespuesta(arr.reverse());
    console.log(respuesta);
  };

  const formulario = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const enviar = (e) => {
    e.preventDefault();
    calcular(datos.ecuacion, datos.lower, datos.upper, datos.limite);
  };

  return (
    <div className="App">
      <h1>Bisección</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form id="forma" onSubmit={enviar}>
        <label>Ecuación</label>
        <input
          name="ecuacion"
          placeholder="x^2+x+23=0"
          type="text"
          onChange={formulario}
        />
        <label>Xi</label>
        <input
          name="lower"
          placeholder="12"
          type="text"
          onChange={formulario}
        />
        <label>Xu</label>
        <input
          name="upper"
          placeholder="23"
          type="text"
          onChange={formulario}
        />
        <label>Límite **NO IMPLEMENTADO</label>
        <input
          name="limite"
          placeholder="0.0001"
          type="text"
          onChange={formulario}
        />
        <button type="submit">Calcular</button>
      </form>
      <div>{respuesta && respuesta.map((r, i) => <p key={i}>{r}</p>)}</div>
    </div>
  );
}
