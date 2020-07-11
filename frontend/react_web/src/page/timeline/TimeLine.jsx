import React, {  useMemo } from 'react'
import ApexCharts from 'react-apexcharts'

export default function TimeLine(){

const timeLineOption = useMemo(() => {
    return {
        series: [
            {
              data: [
                {
                  x: 'Data Collection',
                  y: [
                    new Date('2020-04-10').getTime(),
                    new Date('2020-04-20').getTime()
                  ],
                  fillColor: '#008FFB'
                },
                {
                  x: 'Data Preprocessing',
                  y: [
                    new Date('2020-04-20').getTime(),
                    new Date('2020-05-02').getTime()
                  ],
                  fillColor: '#00E396'
                },
                {
                  x: 'Related Technology Study',
                  y: [
                    new Date('2020-04-25').getTime(),
                    new Date('2020-05-31').getTime()
                  ],
                  fillColor: '#42dbc7'
                },
                {
                  x: 'Modeling',
                  y: [
                    new Date('2020-05-24').getTime(),
                    new Date('2020-06-27').getTime()
                  ],
                  fillColor: '#775DD0'
                },
                {
                  x: 'Testing',
                  y: [
                    new Date('2020-06-27').getTime(),
                    new Date('2020-07-15').getTime()
                  ],
                  fillColor: '#FEB019'
                },
                {
                  x: 'Develop Web/App',
                  y: [
                    new Date('2020-07-01').getTime(),
                    new Date('2020-07-15').getTime()
                  ],
                  fillColor: '#FF4560'
                }
              ]
            }
          ],
          options: {
            chart: {
              height: 100,
              width :200,
              type: 'rangeBar'
            },
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
              formatter: function(val, opts) {
                var label = opts.w.globals.labels[opts.dataPointIndex]
                //var a = moment(val[0])
                //var b = moment(val[1])
                //var diff = b.diff(a, 'days')
                return label 
                //+ ': ' + diff + (diff > 1 ? ' days' : ' day')
              },
              style: {
                colors: ['#f3f4f5', '#fff']
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
    }
}, [])


return (
    <div>
        <ApexCharts align = 'center' options={timeLineOption.options} series={timeLineOption.series} type='rangeBar' height='500' width ='1200'></ApexCharts>
    </div>
)
}