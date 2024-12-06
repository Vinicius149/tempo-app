import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [dados, setDados] = useState({});
  const [local, setLocal] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&APPID=3ef44a7a7c395682cfb2f9cb5024cded`;
//
  const buscaLocal = (event) => {
    // eslint-disable-next-line no-restricted-globals
    if (event.key === "Enter") {
      axios.get(url).then(async (response) => {
        setDados(response.dados);
        console.log(response.dados);
      });
    }
  };

  return (
    <div className="app">
      <div className="busca">
        <input
          type="text"
          placeholder="Busque"
          defaultValue={local}
          onChange={(event) => buscaLocal(event.target.value)}
          onKeyPress={buscaLocal}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="local">
            <p>Londres</p>
          </div>
          <div className="temp">
            <h1>20°C</h1>
          </div>
        </div>
        <div className="descricao">
          <p>Nublado</p>
        </div>
        <div className="bottom">
          <div className="sensacao">
            <p className="bold">18°C</p>
            <p>Sensação Térmica</p>
          </div>
          <div className="humidade">
            <p className="bold">78%</p>
            <p>Humidade</p>
          </div>
          <div className="vento">
            <p className="bold">38 KM/H</p>
            <p>Vento</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
