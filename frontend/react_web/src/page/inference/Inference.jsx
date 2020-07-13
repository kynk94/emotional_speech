import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useMemo, useState } from 'react'

import EmotionChart from './EmotionChart'
import EmotionSlider from './EmotionSlider'
import useRecorder from './useRecorder';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(19, 19, 19, 1)',
    width: '100%',
    padding: '30px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  typography: {
    color: '#ffffff',
    fontFamily :'NanumSquare_acB'
  
  },
  buttons: {
    width: '700px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px',
  },
  button: {
    backgroundColor: 'rgba(41, 151, 255, 1)',
    color: '#ffffff',
    fontFamily :'NanumSquare_acB'
  }
})

export default function Inference() {
  const classes = useStyles()
  const emotionLabels = useMemo(
    () => [
      { emotion: 'Neutral', color: '#ffdb53' },
      { emotion: 'Anger', color: '#f5b1e2' },
      { emotion: 'Disgust', color: '#42dbc7' },
      { emotion: 'Fear', color: '#ff9375' },
      { emotion: 'Happy', color: '#60caf1' },
      { emotion: 'Sad', color: '#a8e07d' }
    ],
    []
  )
  const [emotion, setEmotion] = useState(emotionLabels[0].emotion)
  const [strength, setStrength] = useState(0)

  const handleEmotionUpdate = useCallback((newEmotion) => {
    setEmotion(newEmotion)
  }, [])

  const handleStrengthUpdate = useCallback((newStrength) => {
    setStrength(newStrength)
  }, [])

  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();


  const [src, setSrc] = useState('')
  const hiddenFileInput = React.useRef(null)



  const handleClick = event => {
    hiddenFileInput.current.click()
  }

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setSrc(event.target.value)
    //props.handleFile(fileUploaded)
  };



  return (
    <div className={classes.root}>
      <EmotionChart labels={emotionLabels} onUpdate={handleEmotionUpdate} />
      <div>
        <Typography className={classes.typography} variant="h6" align ='center'>
          {emotion} Strength : {strength}
        </Typography>
        <EmotionSlider value={strength} onUpdate={handleStrengthUpdate} />
      </div>
      <div className={classes.buttons}>

        <Typography className={classes.typography} >
        Input:  
        </Typography>
        <audio src={audioURL} controls />

  
        <Button className={classes.button}  onClick ={handleClick}>
            파일 업로드<input  type="file" ref ={hiddenFileInput} value={src} onChange={handleChange} style={{display: 'none'}} />
        </Button>
       

        <Button className={classes.button} variant="contained" onClick={startRecording} disabled={isRecording}>
          녹음하기
        </Button>
        <Button className={classes.button} variant="contained" onClick={stopRecording} disabled={!isRecording}>
          녹음 중지
        </Button>

      </div>
      <div className={classes.buttons}>
        <Typography className={classes.typography} >
          Output: 
        </Typography>
        <audio src={audioURL} controls />
        <Button className={classes.button} variant="contained" >
          음성 재생
        </Button>
      </div>
    </div>
  )
}
