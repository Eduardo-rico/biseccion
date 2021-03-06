import React, { useState } from "react";
import { parse, abs } from "mathjs";
import "./styles.css";

export default function App() {
  const [datos, guardarDatos] = useState({});
  const [respuesta, guardarRespuesta] = useState([]);

  const calcular = (formula, initial, upper, limite) => {
    const arr = [];
    //se parsea la fórmula
    const f = parse(formula);
    //se cambia el tipo de dato
    let a = Number(initial);
    let b = Number(upper);
    const lim = abs(Number(limite));
    // c es la nueva raiz, typescritp let c: Number;
    let c;

    let i = 0;
    const aprox = [1];
    while (10000 > i) {
      //while 10,000 > i evita el stackoverflow nativo de codesandbox
      c = (a + b) / 2.0;
      let mult = f.evaluate({ x: c }) * f.evaluate({ x: a });
      let E = abs(1 - aprox[i - 1] / c);
      aprox.push(c);
      arr.push(
        ` Iteración: ${i + 1}, xl: ${a}, xu: ${b}, RAIZ: ${c}, error: ${
          E * 100
        }% `
      );

      if (E < lim || f.evaluate({ x: c }) === 0) {
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
      <h2>Métodos numéricos.</h2>
      <form id="forma" onSubmit={enviar}>
        <label>
          Ecuación <small>Variable siempre como x</small>
        </label>
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
        <label>
          Límite{" "}
          <small>Default: El algoritmo se detiene cuando f(xi)*f(xu)=0</small>
        </label>
        <input
          name="limite"
          placeholder="0.0001"
          type="text"
          onChange={formulario}
        />
        <button type="submit">Calcular</button>
      </form>
      <div>
        {respuesta &&
          respuesta.map((r, i) => (
            <p key={i} className="resultado">
              {r}
            </p>
          ))}
      </div>
    </div>
  );
}
