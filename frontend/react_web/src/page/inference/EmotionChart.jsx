import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import ApexCharts from 'react-apexcharts'

const useStyles = makeStyles({
  typography: {
    color: '#ffffff',
    fontFamily: 'NanumSquare_acB'
  }
})

export default function EmotionChart({ labels, onUpdate }) {
  const classes = useStyles()
  const [emotions, colors] = useMemo(() => {
    const emotionArray = []
    const colorArray = []
    _.forEach(labels, (label) => {
      emotionArray.push(label.emotion)
      colorArray.push(label.color)
    })
    return [emotionArray, colorArray]
  }, [labels])

  const series = useMemo(() => Array(emotions.length).fill(1), [emotions])

  const dataLabelFormatter = useCallback(
    (value, { seriesIndex }) => {
      return emotions[seriesIndex]
    },
    [emotions]
  )

  const handleSelection = useCallback(
    (event, chartContext, config) => {
      const index = config.dataPointIndex
      onUpdate(emotions[index])
    },
    [emotions, onUpdate]
  )

  const chartOption = useMemo(() => {
    return {
      chart: {
        events: {
          dataPointSelection: handleSelection
        }
      },
      colors: colors,
      dataLabels: {
        formatter: dataLabelFormatter,
        style: {
          fontSize: '16px',
          fontFamily : 'NanumSquare_acB'
        }
      },
      labels: emotions,
      legend: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    }
  }, [colors, dataLabelFormatter, emotions, handleSelection])

  return (
    <div>
      <Typography className={classes.typography} variant="h4" align = 'center'>
        Pick emotion
      </Typography>
      <ApexCharts options={chartOption} series={series} type="pie" width={500} />
    </div>
  )
}

EmotionChart.propTypes = {
  labels: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired
}
