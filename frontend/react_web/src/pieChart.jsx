import { makeStyles } from '@material-ui/styles'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ApexCharts from 'react-apexcharts'

const useStyles = makeStyles({
  pie: {
    position: 'absolute'
  },
  text: {
    position: 'absolute'
  }
})

// function shuffle (a) {
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]]
//   }
//   return a
// }

export default function ChartsPage() {
  const classes = useStyles()
  const [seconds, setSeconds] = useState(0)
  const series = useMemo(() => [10,10,10,10,10,10], [])

  const labels = useMemo(() => ['Anger', 'Disgust','Fear', 'Happy', 'Sad', 'Neutral'], [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1)
      // setSeries(shuffle(series))
    }, 1000)
    return () => clearInterval(interval)
  }, [series, seconds])

  const handleClick = useCallback((chartEle) => {
    console.log(chartEle)
    // const eleIndex = chartEle._index
    // console.log(series[eleIndex], labels[eleIndex])
  }, [])

  const pieOption = useMemo(() => {
    return {
      chart: {
        events: {
          click: handleClick
          // dataPointSelection: handleClick
        }
      },
      labels: labels ,
      colors : ['#ffdb53', '#f5b1e2', '#42dbc7', '#ff9375', '#60caf1','#a8e07d' ],
     // fill : {
     //   type:'image',
     //   opacity:0.85,
        // image :{
          //src : ['./emotion_chart.png','./total.png','./total.png','./total.png','./total.png','./total.png'],
          //width :100,
          //imagedHeight : 100
     //   }
     // },
      stroke :{
        width :4
      }

    }
  }, [handleClick, labels])

  return (
    <div className={classes.root}>
      <h3>Pick emotion</h3>
      <ApexCharts options={pieOption} series={series} type="pie" width={500} />
    </div>
  )
}