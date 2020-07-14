import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import Inference from './inference/Inference'
import Intro from './intro/Intro'
import TitleBar from './titleBar/TitleBar'
import PhotoPage from './photoPage/PhotoPage'
import TimeLine from './timeLine/TimeLine'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  content: {
    marginTop: 40
  }
})

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TitleBar />
      <div className={classes.content}>
        <Intro />
        <Inference />
        <TimeLine />
        <PhotoPage />
      </div>
    </div>
  )
}
