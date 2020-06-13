import { TextField } from "@material-ui/core"
import React, { useCallback, useMemo, useEffect, useState,useRef } from "react"
import { makeStyles } from "@material-ui/styles"

var txt ="리셋"
const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",

  },
  resize:{
    fontSize:40
  }
}))

export default function TextInput({ asd }) {
  const classes = useStyles()
  const [text, setText] = useState("")
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState("")
//  const [FormHelperTextProps] = useStyles1()
//  const [message, setMessage] = useState("");
  // state = {
	// 	message: ""
  // };
  const diff = useMemo(() => {
    if (error) {
      return 1
    } else {
      return 2
    }
  }, [error])
  var value1 =""
  useEffect(() => {
    if (error) {
      setHelperText("에러 발생")
    } else {
      setHelperText("")
    }
  }, [error])
//  const inputEl = useRef(null);

  console.log(error)
  console.log(diff)
  //console.log(title)
  //title.state = {
  //   value = "Nothing"
  // }
  
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
    setText("")
  }, [])

  const handleKeyPress = useCallback((event)=> {
    if (event.key==='Enter'){
    
    value1=""
    value1 = event.target.value
    alert("You entered "+value1)
    setHelperText("You entered "+event.target.value)}
    if (event.key==='1'){
    setText(txt)
    alert('You entered 1')
    }


    
  },[])



  return (

      <main className="todo-list-template">
        <div className="title">
          Enter a sentence.
          </div>
          <TextField
            className={classes.root}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
            value={text}
            placeholder={asd}
            // FormHelperTextProps={{
            //   app: classes.resize
            // }}
            // FormHelperTextProps={
            //   {
            //     classes:{input:classes.resize},
            //   }
            // }
            error={error}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            helperText={helperText}
            onClick={handleClick}
          />
          </main>
    
  )

  // return(
  //       <TextField
  //     className={classes.root}
  //     error={error}
  //     helperText={helperText}
  //     value={text}
  //     placeholder={asd}
  //     onClick={handleClick}
  //     onChange={handleChange}
  //   />
  // )
}
