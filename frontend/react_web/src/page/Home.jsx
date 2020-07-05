import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import Inference from './inference/Inference'
import Intro from './intro/Intro'
import TitleBar from './titlebar/TitleBar'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    marginTop: 40,
    overflow: 'auto'
  }
})

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TitleBar />
      <div className={classes.content}>x`
        <Intro />
        <Inference />
      </div>
    </div>
  )
}
