import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
// import uuid from 'react-uuid'

import EmotionChart from './EmotionChart'
import EmotionSlider from './EmotionSlider'
import useRecorder from './useRecorder';


import axios from 'axios'

// // get : 서버에서 데이터를 가져와서 보여줄때
// axios.get('/result',{
//   uuid:,
//   request_time:

// })
// .then( response => { console.log(response) } )
// .catch( response => { console.log(response) } );

// // post: 서버상에 데이터 값을 보냄 
// axios.post('/speech',{
//   uuid:,
//   request_time:,
//   datetime:,
//   wav:,
//   emotion:,
//   intensity:
//   })
//   .then(response => {console.log(response)})
//   .catch(response => {console.log(response)});


const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgba(19, 19, 19, 1)',
    padding: '30px 0',
    width: '100%',
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
    padding: '10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily :'NanumSquare_acB'
  },
  formRow: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 100,
    backgroundColor: 'rgba(41, 151, 255, 1)',
    color: '#ffffff',
    fontFamily :'NanumSquare_acB'
  }
})

export default function Inference() {
  const classes = useStyles()
  const { register, handleSubmit, getValues, watch, errors } = useForm()
  //const [fileId, setFileId] = useState(uuid())
  const [fileName, setFileName] = useState('')
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

  const handleFileChange = useCallback((event) => {
    const filePath = event.target.value
    setFileName(filePath)
  }, [])

  console.log(getValues('upload-file'))
  return (
    <div className={classes.root}>
      <EmotionChart labels={emotionLabels} onUpdate={handleEmotionUpdate} />
      <div>
        <Typography className={classes.typography} variant="h6" align ='center'>
          {emotion} Strength : {strength}
        </Typography>
        <EmotionSlider value={strength} onUpdate={handleStrengthUpdate} />
      </div>

      <div className={classes.buttons} >
        <Typography className={classes.typography} >
        Input
        </Typography>
        <audio src={audioURL} controls />
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
      <form className={classes.form}>
        <input
          hidden
          type="file"
          id="upload-file"
          name="upload-file"
          ref={register}
          onChange={handleFileChange}
        />


        <div className={classes.formRow}>
          <label htmlFor="upload-file">
            <Button className={classes.button} varient="contained" component="span">
              파일 선택
            </Button>
          </label>
          <Typography className={classes.typography}>{fileName}</Typography>
        </div>
        <Button className={classes.button} variant="contained">
          녹음하기
        </Button>
      </form>
    </div>
  )
}
