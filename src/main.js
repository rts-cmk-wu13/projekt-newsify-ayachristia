import './style.scss'

try {
  const apiKey = `rx7RIG7KHCa4ZSId1HyatuJOoTT9t9kr`
  const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
  const data = await response.json()
} catch (error) {
  console.error('Error fetching data:', error)
}



document.querySelector('#app').innerHTML = `
`
