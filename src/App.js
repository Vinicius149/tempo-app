import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [dados, setDados] = useState({});
  const [local, setLocal] = useState("");
  const [clima, setClima] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${local}&units=metric&lang=pt_br&APPID=${API_KEY}`;
//
  const buscaLocal = (event) => {
    // eslint-disable-next-line no-restricted-globals
    if (event.key === "Enter" && local) {
      axios.get(url).then(async (response) => {
        setDados(response.data);
        console.log(response.data);
        setClima(response.data.weather[0].main.toLowerCase()); 
        setLocal('');
      });
    }
  };

  useEffect(() => { 
    if (dados.weather) { 
      setClima(dados.weather[0].main.toLowerCase()); 
    } 
  }, [dados]);

  return (
    <div className={`app ${clima}`}>
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
            {dados.main ? <h1>{dados.main.temp.toFixed()}°C</h1> : null}
          </div>
        </div>
        <div className="descricao">
          {dados.weather ? <p>{dados.weather[0].description}</p> : null}
        </div>

        {dados.name != undefined &&
        <div className="bottom">
        <div className="sensacao">
          {dados.main ? <p className="bold">{dados.main.feels_like}</p> : null}
          <p>Sensação</p>
        </div>
        <div className="humidade">
          {dados.main ? <p className="bold">{dados.main.humidity}%</p>: null}
          <p>Humidade do ar</p>
        </div>
        <div className="vento">
          {dados.wind ? <p className="bold">{dados.wind.speed.toFixed()}Km\h</p> : null}
          <p>Vento</p>
         </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
