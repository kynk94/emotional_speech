import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useState } from 'react'

import ContainedButtons from './ContainedButtons'
import DiscreteSlider from './DiscreteSlider'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

export default function EmotionSlider() {
    const classes = useStyles()
  const [value, setValue] = useState(50)

  const handleUpdate = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  return (
    <div className={classes.root}>
      <DiscreteSlider value={value} onUpdate={handleUpdate} />
      <ContainedButtons value={value} />
    </div>
  )
}
