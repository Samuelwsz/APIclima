import "./global.css"

import clear from "./assets/clear.png"
import cloud from "./assets/cloud.png"
import drizzle from "./assets/drizzle.png"
import humidity from "./assets/humidity.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import wind from "./assets/wind.png"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

function App() {
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
              className="w-full p-2 rounded-2xl border-2 border-gray-300 focus:outline-none outline-none"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
          </div>
          <img src={clear} alt="" className="flex m-auto" />
          <p className="text-white font-semibold text-8xl">24ºc</p>
          <p className="text-white my-5 text-4xl">London</p>

          <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between px-4 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10">
            {/* Bloco 1 */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <img src={humidity} alt="" />
              <div className="text-white text-center sm:text-left text-xl">
                <p>64%</p>
                <p className="mb-2">Humidity</p>
              </div>
            </div>

            {/* Bloco 2 */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              <img src={wind} alt="" />
              <div className="text-white text-center sm:text-left text-xl">
                <p>10 km/h</p>
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

export default App
