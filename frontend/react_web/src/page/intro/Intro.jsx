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
    width: '70%'
    
  },
  typography: {
    position: 'absolute',
    fontFamily : 'NanumSquare_acL',
    
  }
})

export default function Intro() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Image className={classes.image} alt="genie" src={genie} />
      <div className={classes.typography}>
        <Typography className ={classes.typography} variant="h5" style={{ position: 'absolute', top: '10vw', right: '20vw' }}>

        </Typography>
        <Typography className ={classes.typography} style={{ position: 'absolute', top: '10vw', width: '25vw',  left: '17vw', fontSize:'calc(16px + 6 * ((100vw - 320px) / 680))'}}>
        <p>What emotion do you want?</p>
        <p>Let me take your order.</p>
        </Typography>
      </div>
    </div>
  )
}
