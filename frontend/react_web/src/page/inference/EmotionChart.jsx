import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import ApexCharts from 'react-apexcharts'

const useStyles = makeStyles({
  typography: {
    color: '#ffffff'
  }
})

export default function EmotionChart({ onUpdate }) {
  const classes = useStyles()
  const series = useMemo(() => [1, 1, 1, 1, 1], [])
  const labels = useMemo(() => ['Anger', 'Fear', 'Happy', 'Sad', 'Neutral'], [])

  const dataLabelFormatter = useCallback(
    (value, { seriesIndex }) => {
      return labels[seriesIndex]
    },
    [labels]
  )

  const handleSelection = useCallback(
    (event, chartContext, config) => {
      const index = config.dataPointIndex
      onUpdate(labels[index])
    },
    [labels, onUpdate]
  )

  const chartOption = useMemo(() => {
    return {
      chart: {
        events: {
          dataPointSelection: handleSelection
        }
      },
      dataLabels: {
        formatter: dataLabelFormatter,
        style: {
          fontSize: '16px'
        }
      },
      labels: labels,
      legend: {
        labels: {
          colors: '#ffffff'
        }
      },
      tooltip: {
        enabled: false
      }
    }
  }, [dataLabelFormatter, handleSelection, labels])

  return (
    <div>
      <Typography className={classes.typography} variant="h4">
        Pick emotion
      </Typography>
      <ApexCharts options={chartOption} series={series} type="pie" width={500} />
    </div>
  )
}

EmotionChart.propTypes = {
  onUpdate: PropTypes.func.isRequired
}
