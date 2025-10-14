import '@mpv-easy/polyfill'
import React from 'react'
import { renderToString } from 'react-dom/server'

function App() {
  return (
    <div>
      <h1>hello</h1>
      <h1>world 🌏</h1>
    </div>
  )
}

const s = renderToString(<App />)
console.log(s)
