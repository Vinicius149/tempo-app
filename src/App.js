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
    if (event.key === "Enter" && local) {
      axios.get(url).then(async (response) => {
        setDados(response.data);
        console.log(response.data);
      });
      setLocal('')
    }
  };

  return (
    <div className="app">
      <div className="busca">
        <input
          type="text"
          value={local}
          onChange={(event) => setLocal(event.target.value)}
          onKeyDown={buscaLocal}
          placeholder="Digite o nome da cidade"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="local">
            <p>{dados.name}</p>
          </div>
          <div className="temp">
            {dados.main ? <h1>{dados.main.temp}°C</h1> : null}
          </div>
        </div>
        <div className="descricao">
          {dados.weather ? <p>{dados.weather[0].description}</p> : null}
        </div>
        <div className="bottom">
          <div className="sensacao">
            {dados.main ? <p className="bold">{dados.main.feels_like}</p> : null}
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
