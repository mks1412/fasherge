<template lang="pug">
  .item-color-chart.shadow.py-2
    transition(name="fade")
      .loader-wrapper(v-show="analytics.loading")
        loader(color="#08d9d6")
    chart(:options="chartOptions")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Chart } from 'highcharts-vue'
import * as Highcharts from 'highcharts'
import Loader from '@/components/atoms/Loader.vue'
import { analyticsModule } from '@/store/analytics/const'
import { BreakdownOfColorEntity } from '@/entities/ItemAnalytics'

@Component({ components: { Loader, Chart } })
export default class ItemColorChart extends Vue {
  @analyticsModule.State('byColor')
  private analytics!: { loading: boolean; entity: BreakdownOfColorEntity }

  @analyticsModule.Action('loadByColor')
  private load!: () => Promise<void>

  mounted() {
    setTimeout(() => this.load(), 0)
  }

  get chartOptions(): Highcharts.Options {
    return {
      title: {
        text: 'カラー内訳',
        style: { color: '#333333', fontSize: '18px', fontWeight: 'bold' }
      },
      chart: {
        type: 'pie'
      },
      colors: this.analytics.entity.colors,
      credits: {
        enabled: false
      },
      legend: {
        verticalAlign: 'bottom',
        floating: false,
        layout: 'horizontal',
        itemMarginBottom: 5
      },
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25CF</span>{point.key}: ',
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          size: '100%',
          shadow: true
        }
      },
      series: [
        {
          type: 'pie',
          name: '色',
          data: this.analytics.entity.data
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.item-color-chart {
  position: relative;

  .loader-wrapper {
    position: absolute;
    background: #fff;
    width: 100%;
    height: calc(100% - 35px);
    align-items: center;
    display: flex;
    bottom: 0;
    z-index: 1;
  }
}
</style>
