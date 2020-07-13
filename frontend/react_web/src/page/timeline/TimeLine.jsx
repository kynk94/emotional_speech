import React, { useCallback, useMemo } from 'react'
import ApexCharts from 'react-apexcharts'
import { makeStyles } from '@material-ui/core/styles'

import IntroduceProject from './IntroduceProject'

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '30px 0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  chart: {
    fontFamily: 'NanumSquare_acB'
  }
})

export default function TimeLine() {
  const classes = useStyles()

  const dataLabelFormatter = useCallback(
    (val, opts) => opts.w.globals.labels[opts.dataPointIndex],
    []
  )

  const chartSeries = useMemo(
    () => [
      {
        data: [
          {
            x: 'Data Collection',
            y: [new Date('2020-04-10').getTime(), new Date('2020-04-20').getTime()],
            fillColor: '#008FFB'
          },
          {
            x: 'Data Preprocessing',
            y: [new Date('2020-04-20').getTime(), new Date('2020-05-02').getTime()],
            fillColor: '#00E396'
          },
          {
            x: 'Related Technology Study',
            y: [new Date('2020-04-25').getTime(), new Date('2020-05-31').getTime()],
            fillColor: '#42dbc7'
          },
          {
            x: 'Modeling',
            y: [new Date('2020-05-24').getTime(), new Date('2020-06-27').getTime()],
            fillColor: '#775DD0'
          },
          {
            x: 'Testing',
            y: [new Date('2020-06-27').getTime(), new Date('2020-07-15').getTime()],
            fillColor: '#FEB019'
          },
          {
            x: 'Develop Web/App',
            y: [new Date('2020-07-01').getTime(), new Date('2020-07-15').getTime()],
            fillColor: '#FF4560'
          }
        ]
      }
    ],
    []
  )

  const chartOption = useMemo(() => {
    return {
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: false,
          dataLabels: {
            hideOverflowingLabels: false
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: dataLabelFormatter,
        style: {
          colors: ['#f3f4f5', '#fff'],
          fontFamily: 'NanumSquare_acB'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        show: false
      },
      grid: {
        row: {
          colors: ['#f3f4f5', '#fff'],
          opacity: 1
        }
      }
    }
  }, [dataLabelFormatter])

  return (
    <div className={classes.root}>
      <IntroduceProject />
      <ApexCharts
        className={classes.chart}
        options={chartOption}
        series={chartSeries}
        type="rangeBar"
        height={500}
        width={1200}
      />
    </div>
  )
}
