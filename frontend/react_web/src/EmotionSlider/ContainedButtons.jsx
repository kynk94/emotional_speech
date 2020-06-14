import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

export default function ContainedButtons({ value }) {
  const classes = useStyles()
  const [buttonText, setButtonText] = useState('submit')
  const changeText = useCallback(() => setButtonText(value), [value])

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={changeText}>
        {buttonText}
      </Button>
    </div>
  )
}
