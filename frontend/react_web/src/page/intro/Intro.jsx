import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Image } from 'react-bootstrap'

import genie from '../../assets/genie.png'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  image: {
    width: '100%'
  },
  typography: {
    position: 'absolute'
  }
})

export default function Intro() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Image className={classes.image} alt="genie" src={genie} />
      <div className={classes.typography}>
        <Typography style={{ position: 'absolute', top: '15vw', left: '20vw' }}>Genie</Typography>
      </div>
    </div>
  )
}
