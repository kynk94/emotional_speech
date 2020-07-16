import { useCallback, useEffect, useState } from 'react'

export default function useRecorder() {
  const [audioURL, setAudioURL] = useState()
  const [isRecording, setIsRecording] = useState(false)
  const [recorderStopped, setRecorderStopped] = useState(false)
  const [recorder, setRecorder] = useState()

  const handleData = useCallback((event) => {
    setAudioURL(URL.createObjectURL(event.data))
  }, [])

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (!recorder) {
      if (isRecording) requestRecorder().then(setRecorder)
      return
    }
    recorder.addEventListener('dataavailable', handleData)
    if (isRecording) {
      recorder.start()
      setRecorderStopped(false)
    } else {
      recorder.stop()
      setRecorderStopped(true)
    }
  }, [handleData, isRecording, recorder])

  useEffect(() => {
    if (recorderStopped && recorder) {
      recorder.removeEventListener('dataavailable', null)
      setRecorder(null)
    }
  }, [recorder, recorderStopped])

  const startRecording = useCallback(() => {
    setIsRecording(true)
  }, [])

  const stopRecording = useCallback(() => {
    setIsRecording(false)
  }, [])

  return { audioURL, isRecording, startRecording, stopRecording }
}

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  return new MediaRecorder(stream)
}
