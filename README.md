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
        setError("City not found. Please check the city name.")
        setData(null)
        setCountryName(null)
      } finally {
        setLoading(false)
        setLocation("")
      }
    }

}

const [data, setData] = useState<WeatherData | null>(null)
const [location, setLocation] = useState<string>("")
const [countryName, setCountryName] = useState<string | null>(null)
const [loading, setLoading] = useState<boolean>(false)
const [error, setError] = useState<string | null>(null)
const [searchTrigger, setSearchTrigger] = useState<boolean>(false)

/\*
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0e4ba8942e36e6085c2a1a3f1406d6c6`
const restCountriesApiUrl = "https://restcountries.com/v3.1/alpha/"

useEffect(() => {
// O código dentro deste bloco será executado após a renderização inicial do componente

    // Certifique-se de que `location` não é uma string vazia antes de fazer a chamada à API
    if (searchTrigger && location !== "") {
      setLoading(true)
      setError(null)

      // Use uma função assíncrona dentro do useEffect para lidar com chamadas assíncronas
      const fetchData = async () => {
        try {
          const response = await axios.get(url)

          setData(response.data)

          // Obter o nome completo do país a partir da sigla usando o serviço Rest Countries
          const countryResponse = await axios.get(
            `${restCountriesApiUrl}${response.data.sys.country}`
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
}\*/
