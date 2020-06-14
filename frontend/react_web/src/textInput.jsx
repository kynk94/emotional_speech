import { TextField } from '@material-ui/core'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center'
  }
}))

export default function TextInput({ asd }) {
  const classes = useStyles()
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const diff = useMemo(() => {
    if (error) {
      return 1
    } else {
      return 2
    }
  }, [error])

  useEffect(() => {
    if (error) {
      setHelperText('에러 발생')
    } else {
      setHelperText('')
    }
  }, [error])

  console.log(error)
  console.log(diff)

  const handleChange = useCallback((event) => {
    const newText = event.target.value
    setText(newText)
    if (newText && !newText.trim()) {
      setError(true)
    } else {
      setError(false)
    }
  }, [])

  const handleClick = useCallback((event) => {
    event.preventDefault()
    setText('안녕')
  }, [])

  return (
    <TextField
      className={classes.root}
      error={error}
      helperText={helperText}
      value={text}
      placeholder={asd}
      onClick={handleClick}
      onChange={handleChange}
    />
  )
}
