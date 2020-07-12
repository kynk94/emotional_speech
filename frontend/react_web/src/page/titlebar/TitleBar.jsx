import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles({
  appBar: {
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40
  },
  typography: {
    fontFamily :'NanumSquare_acB'
  }
})

export default function TitleBar() {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Typography className={classes.typography}>Typo1</Typography>
      <Typography className={classes.typography}>Typo2</Typography>
      <Typography className={classes.typography}>Typo3</Typography>
      <Typography className={classes.typography}>Typo4</Typography>
      <Typography className={classes.typography}>Typo5</Typography>
      <Typography className={classes.typography}>Typo6</Typography>
    </AppBar>
  )
}
