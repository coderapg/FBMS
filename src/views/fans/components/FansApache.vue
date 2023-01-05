<template>
  <!-- 1、在绘图前我们需要为 ECharts 准备一个定义了高宽的 DOM 容器。 -->
  <div class="fans-children" ref="apache"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'FansApache',
  data () {
    return {
      option: {
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: 'Apache ECharts',
                fontSize: 80,
                fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#000',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 3000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.8,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: 'black'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.loadApache()
  },
  methods: {
    loadApache () {
      // 2、基于准备好的dom，初始化echarts实例
      const apache = this.$refs.apache
      const myChart = echarts.init(apache)
      // 3、指定图表的配置项和数据
      // const option = this.option
      // 4、使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    }
  }
}
</script>
