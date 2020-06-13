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
  const [text, setText] = useState('50')
  const changeText = (text) => setText(text);

/*  const handle = {
    position: "absolute",
    transform: 'translate(-50%, -50%)',
    width: "14px",
    height: "14px",
    cursor: "pointer",
    borderRadius: "50%",
    border: "solid 2px #000",
    backgroundColor: "#fff"
};
*/
  /*const handleStyle = Object.assign({left : `${this.props.offset}%`},handle)*/

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom 
      onClick={(text)=>changeText("change")}>{text}
      </Typography>

      <Slider
        defaultValue={50}
        step={25}
        marks={marks}
        valueLabelDisplay="on"
        /*onValueChange={(text) =>this.setText({SliderValue : changedValue})} */
      />

    </div>
  );
}