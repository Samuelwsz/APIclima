import axios from "axios"
import { useEffect, useState, KeyboardEvent, SetStateAction } from "react"
import { WeatherData } from "../Interfaces/IWeatherData"

const restCountriesApiUrl = axios.create({
  baseURL: "https://restcountries.com/v3.1/alpha/",
})

const openWeatherMapApiUrl = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
})

/*
const openWeatherMapApiUrl = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0e4ba8942e36e6085c2a1a3f1406d6c6`,
})*/

export default function useSearchAPI<T = unknown>() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<string>("")
  const [countryName, setCountryName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTrigger, setSearchTrigger] = useState<boolean>(false)

  useEffect(() => {
    // O código dentro deste bloco será executado após a renderização inicial do componente

    // Certifique-se de que `location` não é uma string vazia antes de fazer a chamada à API
    if (searchTrigger && location !== "") {
      setLoading(true)
      setError(null)

      // Use uma função assíncrona dentro do useEffect para lidar com chamadas assíncronas
      const fetchData = async () => {
        try {
          const response = await openWeatherMapApiUrl.get("", {
            params: {
              q: location,
              appid: "0e4ba8942e36e6085c2a1a3f1406d6c6",
            },
          })

          setData(response.data)

          // Obter o nome completo do país a partir da sigla usando o serviço Rest Countries
          const countryResponse = await restCountriesApiUrl.get(
            `${response.data.sys.country}`
          )
          setCountryName(countryResponse.data[0]?.name.common)
        } catch (error) {
          setError("City not found. Please check the city name.")
          setData(null)
          setCountryName(null)
        } finally {
          setLoading(false)
          setSearchTrigger(false) // Resetar o gatilho de pesquisa
          setLocation("")
        }
      }

      fetchData() // Chama a função de busca de dados
    }
  }, [searchTrigger, location]) // As dependências `[searchTrigger, location]` significam que o efeito será reexecutado quando qualquer uma delas for alterada

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchTrigger(true) // Ativar o gatilho de pesquisa
    }
  }

  const handleSearch = (event: {
    preventDefault: () => void
    target: { value: SetStateAction<string> }
  }) => {
    event.preventDefault()
    setLocation(event.target.value)
  }

  return {
    data,
    error,
    loading,
    handleKeyDown,
    countryName,
    location,
    handleSearch,
  }
}
