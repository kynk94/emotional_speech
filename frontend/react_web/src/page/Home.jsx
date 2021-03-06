import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import Inference from './inference/Inference'
import Intro from './intro/Intro'
import PhotoPage from './photoPage/PhotoPage'
import TimeLine from './timeline/TimeLine'
import TitleBar from './titlebar/TitleBar'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    marginTop: 80
  }
})

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TitleBar></TitleBar>
      <div className={classes.content}>
        <Intro />
        <Inference />
        <TimeLine />
        <PhotoPage />
      </div>
    </div>
  )
}
