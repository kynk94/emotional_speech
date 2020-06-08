import { makeStyles } from "@material-ui/styles"
import React from "react"

import TextInput from './textInput'
import logo from "./logo.svg"
import "./App.css"

const useStyles = makeStyles((theme) => ({
  app: {
    alignItems: "center"
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {TextInput({asd: 'ss'})}
      </header>
    </div>
  )
}

export default App
