import "./global.css"

import clear from "./assets/clear.png"
import cloud from "./assets/cloud.png"
import drizzle from "./assets/drizzle.png"
import humidity from "./assets/humidity.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import wind from "./assets/wind.png"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { KeyboardEvent, useState } from "react"
import axios from "axios"

interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  weather: [
    {
      main: string
    }
  ]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
  name: string
}

export default function App() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<string>("")
  const [countryName, setCountryName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0e4ba8942e36e6085c2a1a3f1406d6c6`
  const restCountriesApiUrl = "https://restcountries.com/v3.1/alpha/"

  const searchLocation = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(url)

        setData(response.data)
        console.log(response.data)

        // Obter o nome completo do país a partir da sigla usando o serviço Rest Countries
        const countryResponse = await axios.get(
          `${restCountriesApiUrl}${response.data.sys.country}`
        )
        setCountryName(countryResponse.data[0]?.name.common)
      } catch (error) {
        setError(
          "Cidade não encontrada. Por favor, verifique o nome da cidade."
        )
      } finally {
        setLoading(false)
        setLocation("")
      }
    }
  }

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
        <div className="bg-blue-800 p-4 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg sm:w-2/3 md:w-2/3 lg:w-2/3 text-center relative shadow-md">
          {/* Conteúdo da caixa */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={searchLocation}
              className="w-full p-2 rounded-2xl border-2 border-gray-300 focus:outline-none outline-none"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
          </div>
          {/*
             <p className="text-white">
            Weather: {data?.weather ? <>{data.weather[0].main}</> : null}
          </p>
          */}
          {loading && <p className="text-white text-xl">Carregando...</p>}
          {error && <p className="text-red-500 text-xl mt-2">{error}</p>}

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
