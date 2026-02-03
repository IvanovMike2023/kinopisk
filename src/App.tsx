import {useState} from 'react'
import './App.css'
import {Header} from './Component/Header'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
        <Header />
      <h1>Vite + React START!!!  </h1>
    </>
  )
}

export default App
