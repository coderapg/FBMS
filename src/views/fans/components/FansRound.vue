<template>
  <!-- 1、在绘图前我们需要为 ECharts 准备一个定义了高宽的 DOM 容器。 -->
  <div class="fans-children" ref="round"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'FansRound',
  data () {
    return {}
  },
  mounted () {
    this.loadRound()
  },
  methods: {
    loadRound () {
      // 2、基于准备好的dom，初始化echarts实例
      const round = this.$refs.round
      const myChart = echarts.init(round)
      // 3、指定图表的配置项和数据
      let option = null

      // 假数据
      const data = [
        { value: 800, name: 'A' },
        { value: 635, name: 'B' },
        { value: 580, name: 'C' },
        { value: 484, name: 'D' },
        { value: 300, name: 'E' },
        { value: 200, name: 'F' }
      ]
      const defaultPalette = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
      const radius = ['30%', '80%']
      const pieOption = {
        series: [
          {
            type: 'pie',
            id: 'distribution',
            radius: radius,
            label: {
              show: false
            },
            universalTransition: true,
            animationDurationUpdate: 1000,
            data: data
          }
        ]
      }
      const parliamentOption = (() => {
        const sum = data.reduce((sum, cur) => {
          return sum + cur.value
        }, 0)
        const angles = []
        const startAngle = -Math.PI / 2
        let curAngle = startAngle
        data.forEach((item) => {
          angles.push(curAngle)
          curAngle += (item.value / sum) * Math.PI * 2
        })
        angles.push(startAngle + Math.PI * 2)
        function parliamentLayout (startAngle, endAngle, totalAngle, r0, r1, size) {
          const rowsCount = Math.ceil((r1 - r0) / size)
          const points = []
          let r = r0
          for (let i = 0; i < rowsCount; i++) {
            const totalRingSeatsNumber = Math.round((totalAngle * r) / size)
            const newSize = (totalAngle * r) / totalRingSeatsNumber
            for (
              let k = Math.floor((startAngle * r) / newSize) * newSize;
              k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
              k += newSize
            ) {
              const angle = k / r
              const x = Math.cos(angle) * r
              const y = Math.sin(angle) * r
              points.push([x, y])
            }
            r += size
          }
          return points
        }
        return {
          series: {
            type: 'custom',
            id: 'distribution',
            data: data,
            coordinateSystem: undefined,
            universalTransition: true,
            animationDurationUpdate: 1000,
            renderItem: function (params, api) {
              var idx = params.dataIndex
              var viewSize = Math.min(api.getWidth(), api.getHeight())
              var r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2
              var r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2
              var cx = api.getWidth() * 0.5
              var cy = api.getHeight() * 0.5
              var size = viewSize / 50
              var points = parliamentLayout(
                angles[idx],
                angles[idx + 1],
                Math.PI * 2,
                r0,
                r1,
                size + 3
              )
              return {
                type: 'group',
                children: points.map((pt) => {
                  return {
                    type: 'circle',
                    autoBatch: true,
                    shape: {
                      cx: cx + pt[0],
                      cy: cy + pt[1],
                      r: size / 2
                    },
                    style: {
                      fill: defaultPalette[idx % defaultPalette.length]
                    }
                  }
                })
              }
            }
          }
        }
      })()
      let currentOption = (option = pieOption)
      setInterval(() => {
        currentOption = currentOption === pieOption ? parliamentOption : pieOption
        myChart.setOption(currentOption)
      }, 2000)
      // 4、使用刚指定的配置项和数据显示图表。
      option && myChart.setOption(option)
    }
  }
}
</script>
