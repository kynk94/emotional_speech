import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

const useStyles = makeStyles({
  slider: {
    margin: '0 10px',
    color: '#ffffff',
    width: 400
  },
  typograpy :{
  fontFamily: 'NanumSquare_acB'
  }
})

export default function EmotionSlider({ value, onUpdate }) {
  const classes = useStyles()

  const handleChange = useCallback(
    (event, newValue) => {
      onUpdate(newValue)
    },
    [onUpdate]
  )

  const marks = useMemo(() => [{ value: 0 }, { value: 0.5 }, { value: 1 }], [])

  return (
    <Slider
      className={classes.slider}
      marks={marks}
      max={1}
      step={0.01}
      value={value}
      onChange={handleChange}
    />
  )
}

EmotionSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired
}
