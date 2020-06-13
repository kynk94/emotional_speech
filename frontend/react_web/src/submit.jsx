import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function ContainedButtons() {
  const classes = useStyles();
  const [buttonText, setButtonText] = useState('submit')
  const changeText = (text) => setButtonText(text);
  

  return (
    <div className={classes.root}>
      <Button 
        variant="contained"
        onClick={()=>changeText("complete")}>{buttonText}</Button>
 
    </div>
  );
}