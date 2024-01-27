import React, { useState } from "react";
import Image from "next/image";
import "./digging.css";
import Head from "next/head";
import ShareButton from "@/components/SharedButtons/SharedButons";

export default function DiggingDetails() {
  const [st, setSt] = useState("");
  const [basicLiftInformed, setBasicLiftInformed] = useState("");
  const [soilType, setSoilType] = useState("");
  const [toolType, setToolType] = useState("");
  const [pick, setPick] = useState(false);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [output, setOutput] = useState(`
  <div class="title">Força: <p class="result">0</p></div>
  <div class="title">Levantamento Básico:<p class="result">0</p></div>
  <div class="title">Com picareta:<p class="result">-</p></div>
  <div class="title">Ferramenta: <p class="result">-</p></div>
  <div class="title">Tempo:  <p class="result">0 horas e 0 minutos</p></div>
  <div class="title">Fadiga:  <p class="result">0</p></div>
  <div class="title">Volume:  <p class="result">0 pés cubicos</p></div>
`);
  function submitForm(e) {
    e.preventDefault();
    let st = document.getElementById("st").value;
    let basicLiftBySt = (st * st) / 5;
    let basicLiftInformed = document.getElementById("basicLift").value;
    let basicLift;

    if (st && !basicLiftInformed) {
      basicLift = basicLiftBySt;
    } else if (basicLiftInformed && !st) {
      basicLift = basicLiftInformed;
    } else if (basicLiftInformed && st) {
      basicLift = basicLiftInformed;
    } else {
      basicLift = 20;
    }

    let soilType = document.getElementById("soilType").value;
    let toolType = document.getElementById("toolType").value;
    let pick = document.getElementById("pick").checked;
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let depth = document.getElementById("depth").value;

    let diggingRate = calculateDiggingRate(soilType, basicLift, toolType, pick);
    let diggingDetails = calculateDiggingDetails(
      soilType,
      basicLift,
      toolType,
      pick,
      height,
      width,
      depth
    );

    function calculateDiggingRate(soilType, basicLift, toolType, pick) {
      let diggingRate;

      switch (soilType) {
        case "Loose Soil":
        case "Sand":
          diggingRate = 2 * basicLift;
          break;
        case "Ordinary Soil":
          if (pick) {
            diggingRate = 4 * basicLift;
          } else {
            diggingRate = basicLift;
          }
          break;
        case "Hard Soil":
        case "Clay":
          if (pick) {
            diggingRate = 2 * basicLift;
          } else {
            diggingRate = 0.6 * basicLift;
          }
          break;
        case "Hard Rock":
          if (pick) {
            diggingRate = basicLift;
          } else {
            diggingRate = 0.6 * basicLift;
          }
          break;
        default:
          return;
      }

      switch (toolType) {
        case "Iron":
        case "Steel":
          break;
        case "Wooden":
          diggingRate /= 2;
          break;
        case "Improvised":
          diggingRate /= 4;
          break;
        default:
          return;
      }

      return diggingRate;
    }

    function calculateDiggingDetails(
      soilType,
      basicLift,
      toolType,
      pick,
      height,
      width,
      depth
    ) {
      let diggingRate = calculateDiggingRate(
        soilType,
        basicLift,
        toolType,
        pick
      );
      let volume = height * width * depth;
      let time = volume / diggingRate;
      let fatigue;

      switch (soilType) {
        case "Loose Soil":
        case "Sand":
          fatigue = time;
          break;
        case "Ordinary Soil":
          fatigue = 2 * time;
          break;
        case "Hard Soil":
        case "Clay":
          fatigue = 3 * time;
          break;
        case "Hard Rock":
          fatigue = 4 * time;
          break;
        default:
          return;
      }

      return {
        volume: volume,
        time: time,
        fatigue: fatigue,
      };
    }

    // convert hours to minutes
    function convertHours(decimalHours) {
      let hours = Math.floor(decimalHours);
      let minutes = Math.round((decimalHours - hours) * 60);
      return `${hours} horas e ${minutes} minutos`;
    }

    let time = convertHours(diggingDetails.time.toFixed(2));
    let fatigue = Math.ceil(diggingDetails.fatigue.toFixed(2));
    setOutput(`
    <div class="title">Força: <p class="result">${st || "0"}</p></div>
    <div class="title">Levantamento Básico:<p class="result">${basicLift}</p></div>
    <div class="title">Com picareta:<p class="result">${
      pick ? "Sim" : "Não"
    }</p></div>
    <div class="title">Ferramenta: <p class="result">${toolType}</p></div>
    <div class="title">Tempo:  <p class="result">${time}</p></div>
    <div class="title">Fadiga:  <p class="result">${fatigue}</p></div>
    <div class="title">Volume:  <p class="result">${
      diggingDetails.volume
    } pés cubicos</p> </div>
`);
  }
  return (
    <>
      <Head>
        <title>GURPS: Regra de Cavar Buraco</title>
        <link rel="icon" href="/rpg/boi.svg" />
        <meta
          name="description"
          content="Você só não joga GURPS porque não sabe a regra de Cavar Buracos? Seus problemas acabaram!."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Boifubá" />
        <meta name="keywords" content="GURPS, Regra de Cavar Buraco" />
        <meta property="og:title" content="Calculadora para Cavar Buraco" />
        <meta
          property="og:description"
          content="Você só não joga GURPS porque não sabe a regra de Cavar Buracos? Seus problemas acabaram!."
        />
        <meta
          property="og:url"
          content="https://rolandodados.com.br/RPG/Utilidades/RegraDeCavarBuraco"
        />
        <meta
          property="og:image"
          content={
            "https://rolandodados.com.br/Utilidades/RegraDeCavarBuraco/digging.jpg"
          }
        />
        <meta name="theme-color" content="#ea4f4c"></meta>
        <meta name="twitter:title" content="Regra de Cavar Buracos em GURPS" />
        <meta
          name="twitter:description"
          content="Você só não joga GURPS porque não sabe a regra de Cavar Buracos? Seus problemas acabaram!"
        />
        <meta name="twitter:card" content="summary_large_image" />{" "}
        <meta
          name="twitter:image"
          content={
            "https://rolandodados.com.br/Utilidades/RegraDeCavarBuraco/digging.jpg"
          }
        />
        <meta
          name="description"
          content="Você só não joga GURPS porque não sabe a regra de Cavar Buracos? Seus problemas acabaram!"
        />
      </Head>
      <div className="image-box">
        <Image
          src={"/Utilidades/RegraDeCavarBuraco/digging.jpg"}
          alt="Regra de Cavar buraco no GURPS"
          width={1200}
          height={600}
        />
      </div>
      <div className="content">
        <ShareButton
          url="https://rolandodados.com.br/RPG/Utilidades/RegraDeCavarBuraco"
          title="Regra de Cavar Buracos em GURPS"
        />
        <h1>Regra de Cavar Buraco do GURPS</h1>
        <br />
        <p>
          As regras usadas para essa calculadora foram retiradas do módulo
          básico. A Única diferença é que só é possivel calcular uma pessoa por
          vez. Vocês pode somar as Forças e calcular se quiser, você terá um
          número bem aproximado da realidade da regra.
        </p>
        <br />
        <br />
        <h2>Preencha com Força ou Levantamento Básico</h2>
        <br />
        <form onSubmit={submitForm}>
          <div className="grid-container">
            <div className="column-1">
              <div className="form-div">
                <label htmlFor="st">ST</label>
                <input
                  type="number"
                  id="st"
                  name="st"
                  onChange={(e) => setSt(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="basicLift">Levantamento Básico:</label>
                <input
                  type="number"
                  id="basicLift"
                  name="basicLift"
                  onChange={(e) => setBasicLiftInformed(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="soilType">Tipo de Solo:</label>
                <select
                  id="soilType"
                  name="soilType"
                  onChange={(e) => setSoilType(e.target.value)}
                >
                  <option value="Loose Soil">Solo solto</option>
                  <option value="Sand">Areia</option>
                  <option value="Ordinary Soil">Solo comum</option>
                  <option value="Hard Soil">Solo duro</option>
                  <option value="Clay">Lama</option>
                  <option value="Hard Rock">Rocha</option>
                </select>
              </div>
              <br />
              <div>
                <label htmlFor="toolType">Tipo de ferramenta:</label>
                <select
                  id="toolType"
                  name="toolType"
                  onChange={(e) => setToolType(e.target.value)}
                >
                  <option value="Iron">Ferro</option>
                  <option value="Steel">Aço</option>
                  <option value="Wooden">Madeira</option>
                  <option value="Improvised">Improvisado</option>
                </select>
              </div>
            </div>
            <div className="column-2">
              <div>
                <label htmlFor="pick">Com picareta:</label>
                <input
                  type="checkbox"
                  id="pick"
                  name="pick"
                  onChange={(e) => setPick(e.target.checked)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="height">Altura:</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="width">Largura:</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="depth">Profundidade:</label>
                <input
                  type="number"
                  id="depth"
                  name="depth"
                  onChange={(e) => setDepth(e.target.value)}
                />
              </div>
            </div>
            <div className="column-3">
              <div
                className="resposta"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          </div>
          <div className="button-container">
            <button className="button" type="submit">
              Cavar o Buraco
            </button>{" "}
          </div>
        </form>
      </div>
    </>
  );
}
