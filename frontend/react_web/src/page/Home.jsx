import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { ScrollingProvider, Section } from 'react-scroll-section'

import Inference from './inference/Inference'
import Intro from './intro/Intro'
import PhotoPage from './photoPage/PhotoPage'
import TimeLine from './timeline/TimeLine'
import { Item } from './titlebar/Menu'
import SectionContainer from './titlebar/SectionContainer'
import TitleBar from './titlebar/TitleBar'

import imgLamp from '../assets/magic-lamp.png'
import imgTeam from '../assets/weareteam.png'


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
    <ScrollingProvider scrollBehavior="smooth" className={classes.root}>
      <TitleBar>
        {/* <Typography className={classes.lampImg} src={imgLamp} component='img' ></Typography> */}
        <Item section='genie'>
          <Typography className={classes.lampImg} src={imgLamp} component='img' width='50' ></Typography>
        </Item>
        <Item section='inference'>
          <Typography className={classes.typography}>INFERENCE</Typography>
        </Item>
        <Item section='introduce'>
          <Typography className={classes.typography}>INTRODUCE</Typography>
        </Item>
        <Item section='member'>
          <Typography className={classes.lampImg} src={imgTeam} component='img' width='50' ></Typography>
        </Item>
      </TitleBar>
      <div className={classes.content}>
        <Section id='genie'>
          <SectionContainer>
            <Intro />
          </SectionContainer>
        </Section>
        <Section id='inference'>
          <SectionContainer>
            <Inference />
          </SectionContainer>
        </Section>
        <Section id='introduce'>
          <SectionContainer>
            <TimeLine />
          </SectionContainer>
        </Section>
        <Section id='member'>
          <SectionContainer>
            <PhotoPage />
          </SectionContainer>
        </Section>
      </div>
    </ScrollingProvider>
  )
}
