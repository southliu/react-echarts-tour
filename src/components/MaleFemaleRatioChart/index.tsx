import type { EChartsOption } from 'echarts'
import { useEcharts } from '@/hooks/useEcharts'
import man from '../../assets/man.png'
import woman from '../../assets/woman.png'
import styles from './index.module.less'

interface IChartProp {
  man: number
  woman: number
}
const MaleFemaleRatioChart = () => {
  const data: IChartProp = {
    man: 0.6,
    woman: 0.4
  }
  const option: EChartsOption = {
    xAxis: {
      type: "value",
      show: false
    },
    grid: {
      left: 0,
      top: "30px",
      bottom: 0,
      right: 0
    },
    yAxis: [
      {
        type: "category",
        position: "left",
        data: ["男生"],
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      {
        type: "category",
        position: "right",
        data: ["女士"],
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false,
          padding: [0, 0, 40, -60],
          fontSize: 12,
          lineHeight: 60,
          color: "rgba(255, 255, 255, 0.9)",
          formatter: "{value}" + data.woman * 100 + "%",
          rich: {
            a: {
              color: "transparent",
              lineHeight: 30,
              fontFamily: "digital",
              fontSize: 12
            }
          }
        }
      }
    ],
    series: [
      {
        type: "bar",
        barWidth: 20,
        data: [data.man],
        z: 20,
        itemStyle: {
          borderRadius: 10,
          color: "#007AFE"
        },
        label: {
          show: true,
          color: "#E7E8ED",
          position: "insideLeft",
          offset: [0, -20],
          fontSize: 12,
          formatter: () => {
            return `男士 ${data.man * 100}%`
          }
        }
      },
      {
        type: "bar",
        barWidth: 20,
        data: [1],
        barGap: "-100%",
        itemStyle: {
          borderRadius: 10,
          color: "#FF4B7A"
        },
        label: {
          show: true,
          color: "#E7E8ED",
          position: "insideRight",
          offset: [0, -20],
          fontSize: 12,
          formatter: () => {
            return `女士 ${data.woman * 100}%`
          }
        }
      }
    ]
  }
  const [echartsRef] = useEcharts(option, data)
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.man}>
          <span>男士</span>
          <img src={man} alt="man" />
        </div>
        <div className={styles.woman}>
          <span>女士</span>
          <img src={woman} alt="woman" />
        </div>
      </div>
      <div ref={echartsRef} className={styles.echarts}></div>
    </div>
  )
}

export default MaleFemaleRatioChart
