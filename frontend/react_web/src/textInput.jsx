import { TextField } from '@material-ui/core'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    alignItems: 'center'
  },
  resize: {
    fontSize: 40
  }
})

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
    setText('')
  }, [])

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      const value1 = event.target.value
      alert('You entered ' + value1)
      setHelperText('You entered ' + value1)
    }
    if (event.key === '1') {
      const value1 = event.target.value
      setText(value1)
      alert('You entered 1')
    }
  }, [])

  return (
    <main className="todo-list-template">
      <div className="title">Enter a sentence.</div>
      <TextField
        className={classes.root}
        InputProps={{
          classes: {
            input: classes.resize
          }
        }}
        value={text}
        placeholder={asd}
        FormHelperTextProps={{ classes: { root: classes.resize } }}
        error={error}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        helperText={helperText}
        onClick={handleClick}
      />
    </main>
  )
}
