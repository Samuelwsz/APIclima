import "./global.css"

import clear from "./assets/clear.png"
import cloud from "./assets/cloud.png"
import drizzle from "./assets/drizzle.png"
import humidity from "./assets/humidity.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import wind from "./assets/wind.png"

import { WeatherData } from "./Interfaces/IWeatherData"
import useSearchAPI from "./hooks/useSearchAPI"
import InputSearch from "./components/inputSearch"

export default function App() {
  const {
    data,
    error,
    loading,
    handleKeyDown,
    countryName,
    location,
    handleSearch,
  } = useSearchAPI<WeatherData>()

  const getWeatherImage = (weatherCondition: string | undefined) => {
    switch (weatherCondition) {
      case "Clear":
        return clear
      case "Clouds":
        return cloud
      case "Drizzle":
        return drizzle
      case "Rain":
        return rain
      case "Snow":
        return snow
      // Adicione mais casos conforme necessário para outras condições meteorológicas
      default:
        return clear // Imagem padrão para condições desconhecidas
    }
  }

  return (
    <>
      <div className="flex justify-center items-start min-h-screen pt-16">
        {/* 'pt-16' adiciona um preenchimento superior de tamanho 16 (pode ser ajustado) */}
        <div className="custom-opacity-bg p-4 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg sm:w-2/3 md:w-2/3 lg:w-2/3 text-center relative shadow-md">
          {/* Conteúdo da caixa */}    
          <InputSearch
            value={location}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          {/*
             <p className="text-white">
            Weather: {data?.weather ? <>{data.weather[0].main}</> : null}
          </p>
          */}
          {loading && <p className="text-white text-xl">Loading...</p>}
          {error && (
            <p className="text-red-500 font-semibold text-xl mt-2">{error}</p>
          )}

          <img
            src={getWeatherImage(
              data?.weather ? data.weather[0].main : undefined
            )}
            alt=""
            className="flex m-auto"
          />

          <p className="text-white text-4xl">
            Temperature:{" "}
            {data?.main ? (
              <>
                {/* converte para graus celsius */}
                {Math.round(data.main.temp - 273.15)}°c
              </>
            ) : null}
          </p>
          <p className="text-white my-5 text-4xl">City: {data?.name}</p>
          <p className="text-white my-5 text-4xl">Country: {countryName}</p>
          <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10 ">
            {/* Bloco 1 */}
            <div className="flex items-center gap-3">
              <img src={humidity} alt="" />
              <div className="text-white text-center sm:text-left text-xl">
                {data?.main ? <p>{data.main.humidity} %</p> : null}
                <p>Humidity</p>
              </div>
            </div>

            {/* Bloco 2 */}
            <div className="flex items-center gap-3">
              <img src={wind} alt="" />
              <div className="text-white text-center sm:text-left text-xl">
                {/* converte de milhas para km */}
                {data?.wind ? (
                  <p>{Math.round(data.wind.speed * 1.60934)} km/h</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
          {/**/}
        </div>
      </div>
    </>
  )
}
