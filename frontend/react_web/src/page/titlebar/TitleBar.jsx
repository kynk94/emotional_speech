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
  }
})

export default function TitleBar() {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Typography>Typo1</Typography>
      <Typography>Typo2</Typography>
      <Typography>Typo3</Typography>
      <Typography>Typo4</Typography>
      <Typography>Typo5</Typography>
      <Typography>Typo6</Typography>
    </AppBar>
  )
}
