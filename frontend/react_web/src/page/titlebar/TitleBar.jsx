import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import imgLamp from '../../assets/magic-lamp.png'

const useStyles = makeStyles({
  appBar: {
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40
  },
  typography: {
    fontFamily :'NanumSquare_acL'
  },
  lampImg :{
    height : 35
  }
})

export default function TitleBar() {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Typography className={classes.lampImg} src={imgLamp} component='img' ></Typography>
      <Typography className={classes.typography}>Genie</Typography>
      <Typography className={classes.typography}>Inference</Typography>
      <Typography className={classes.typography}>Introduce</Typography>
      <Typography className={classes.typography}>Member</Typography>
    </AppBar>
  )
}
