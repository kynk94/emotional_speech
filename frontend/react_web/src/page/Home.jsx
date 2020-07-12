import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import Inference from './inference/Inference'
import Intro from './intro/Intro'
import TitleBar from './titlebar/TitleBar'
import Cardimages from './cardimages/Cardimages'
import TimeLine from './timeline/TimeLine'      
import IntroducePJ from './timeline/IntroducePJ'

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
      <div className={classes.content}>
        <Intro />
        <Inference />
        <IntroducePJ/>
        <TimeLine/>
        <Cardimages />

      </div>
    </div>
  )
}
