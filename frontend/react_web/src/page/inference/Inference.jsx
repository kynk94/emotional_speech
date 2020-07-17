import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import uuid from 'react-uuid'

import EmotionChart from './EmotionChart'
import EmotionSlider from './EmotionSlider'
import useRecorder from './useRecorder'
import { useEffect } from 'react'

import imgBack from '../../assets/back_image.jpg'

const useStyles = makeStyles({
  root: {
    //backgroundColor: 'rgba(19, 19, 19, 1)',
    backgroundImage: `url(${imgBack})`,
    padding: '30px 0',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  typography: {
    color: '#ffffff',
    fontFamily: 'NanumSquare_acB'
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
    fontFamily: 'NanumSquare_acB'
  },
  formRow: {
    width: 400,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'rgba(41, 151, 255, 1)',
    color: '#ffffff',
    fontFamily: 'NanumSquare_acB'
  },
  iconButton: {
    color: '#ffffff'
  }
})

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default function Inference() {
  const classes = useStyles()
  const { audioURL, isRecording, startRecording, stopRecording } = useRecorder()
  const [playSrc, setPlaySrc] = useState('')
  const [resultSrc, setResultSrc] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [requestTime, setRequestTime] = useState()
  const [fileId, setFileId] = useState('')
  const [fileName, setFileName] = useState('')
  const fileRef = useRef()
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
  const [intensity, setIntensity] = useState(0)

  const handleRequestGet = useCallback(async () => {
    var file = null
    for (var i = 0; i < 10; i++) {
      await sleep(1000)
      if (file) {
        return
      }
      setTimeout(() => {
        axios({
          method: 'get',
          url: 'http://localhost:5000/result',
          params: {
            'uuid': fileId,
            'request_time': requestTime
          }
        }).then((response) => {
          // response가 false 일 경우에는 리턴하도록 처리할 것
          // file일 경우에는 setResultSrc
          file = response.data
          if (!file) {
            return
          }
          setResultSrc(file)
          return
        })
      }, 1000)
    }
  }, [fileId, requestTime])

  const handleData = useCallback(() => {
    const formData = new FormData()
    const currentDate = new Date()
    setRequestTime(currentDate)
    formData.append('uuid', fileId)
    formData.append('request_time', currentDate)
    formData.append('speech', playSrc)
    formData.append('emotion', emotion)
    formData.append('intensity', intensity)
    axios({
      method: 'post',
      url: 'http://localhost:5000/speech',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      handleRequestGet()
      console.log(response)
    })
  }, [emotion, fileId, handleRequestGet, playSrc, intensity])

  const handleEmotionUpdate = useCallback((newEmotion) => {
    setEmotion(newEmotion)
  }, [])

  const handleStrengthUpdate = useCallback((newStrength) => {
    setIntensity(newStrength)
  }, [])

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0]
    if (!file || file.type !== 'audio/wav') {
      return
    }
    setPlaySrc(URL.createObjectURL(file))
    setFileId(uuid())
    setFileName(file.name)
  }, [])

  const handleDelete = useCallback(() => {
    setPlaySrc('')
    setFileName()
  }, [])

  useEffect(() => {
    if (audioURL) {
      setFileId(uuid())
      setPlaySrc(audioURL)
    }
  }, [audioURL])

  useEffect(() => {
    if (playSrc) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [playSrc])

  return (
    <div className={classes.root}>
      <EmotionChart labels={emotionLabels} onUpdate={handleEmotionUpdate} />
      <div>
        <Typography className={classes.typography} variant="h6" align="center">
          {emotion} Strength : {intensity}
        </Typography>
        <EmotionSlider value={intensity} onUpdate={handleStrengthUpdate} />
      </div>
      <form className={classes.form}>
        <input
          hidden
          disabled={buttonDisabled || isRecording}
          type="file"
          accept=".wav"
          id="upload-file"
          name="upload-file"
          ref={fileRef}
          onChange={handleFileChange}
        />
        <div className={classes.formRow}>
          <label htmlFor="upload-file">
            <Button
              className={classes.button}
              disabled={buttonDisabled || isRecording}
              varient="contained"
              component="span"
            >
              파일 선택
            </Button>
          </label>
          <Typography className={classes.typography}>{fileName}</Typography>
          <Button
            className={classes.button}
            variant="contained"
            onClick={startRecording}
            disabled={buttonDisabled || isRecording}
          >
            녹음
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            onClick={stopRecording}
            disabled={buttonDisabled || !isRecording}
          >
            중지
          </Button>
          <IconButton className={classes.iconButton} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className={classes.formRow}>
          <audio src={playSrc} controls />
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleData}
            disabled={!playSrc}
          >
            전송
          </Button>
        </div>
      </form>
      <audio src={resultSrc} controls />
    </div>
  )
}