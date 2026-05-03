import { useState, useEffect } from 'react'

function ApiCalling() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("https://api.github.com/users/amie-dev")
        const responseData = await response.json()
        setData(responseData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          <h2>{data.login}</h2>
          <img src={data.avatar_url} alt={data.login} width="100" />
          <p>Profile: <a href={data.html_url}>{data.html_url}</a></p>
        </div>
      )}
    </div>
  )
}

export default ApiCalling
