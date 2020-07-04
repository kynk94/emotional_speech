import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useState } from 'react'

import EmotionChart from './EmotionChart'
import EmotionSlider from './EmotionSlider'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(19, 19, 19, 1)',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  typography: {
    color: '#ffffff'
  },
  buttons: {
    width: '300px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: 'rgba(41, 151, 255, 1)',
    color: '#ffffff'
  }
})

export default function Inference() {
  const classes = useStyles()
  const [emotion, setEmotion] = useState('Neutral')
  const [strength, setStrength] = useState(0)

  const handleEmotionUpdate = useCallback((newEmotion) => {
    setEmotion(newEmotion)
  }, [])

  const handleStrengthUpdate = useCallback((newStrength) => {
    setStrength(newStrength)
  }, [])

  return (
    <div className={classes.root}>
      <EmotionChart onUpdate={handleEmotionUpdate} />
      <div>
        <Typography className={classes.typography} variant="h6">
          {emotion} Strength : {strength}
        </Typography>
        <EmotionSlider value={strength} onUpdate={handleStrengthUpdate} />
      </div>
      <div className={classes.buttons}>
      <Button className={classes.button} variant="contained">파일 업로드</Button>
      <Button className={classes.button} variant="contained">녹음하기</Button>
      </div>
    </div>
  )
}
