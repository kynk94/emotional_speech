import { makeStyles } from '@material-ui/styles'
import React from 'react'

import TextInput from './textInput'
//import logo from "./logo.svg"
import logo from './Plutchik-wheel-of-emotion.png'
import './App.css'

const useStyles = makeStyles((theme) => ({
  app: {
    alignItems: 'center'
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextInput asd="Hi" />
      </header>
    </div>
  )
}

export default App
