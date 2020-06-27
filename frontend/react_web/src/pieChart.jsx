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
  const series = useMemo(() => [10, 15, 20, 25, 30], [])
  const labels = useMemo(() => ['Anger', 'Fear', 'Happy', 'Sad', 'Neutral'], [])

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
        width: 380,
        type: 'pie',
        events: {
          click: handleClick
          // dataPointSelection: handleClick
        }
      },
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  }, [handleClick, labels])

  return (
    <div className={classes.root}>
      <h3>Pick emotion</h3>
      <ApexCharts options={pieOption} series={series} type="pie" />
    </div>
  )
}
