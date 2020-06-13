import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(20),
  },
})); 

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

export default function DiscreteSlider() {
  const classes = useStyles();
  const [text, setText] = useState('hihi')
  const changeText = (text) => setText(text);

  var SliderValue = 0

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
          Slider Value = {this.state.SliderValue}
      </Typography>

      <Slider
        defaultValue={50}
        step={25}
        marks={marks}
        valueLabelDisplay="on"
        onValueChange={(text) =>this.setText({SliderValue : changedValue})}
      />
    </div>
  );
}