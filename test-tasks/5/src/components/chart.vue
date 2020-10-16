<script>
import { Line  } from 'vue-chartjs'
export default {
  extends: Line ,
  props: {
    labels: {
      type: Array,
    },
    datasets: {
      type: Array,
    },
  },

  data(){
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    }
  },

  mounted(){
    this.drawChart()
  },

  methods: {
    drawChart(){
      this.renderChart({
        labels: this.labels,
        datasets: this.datasets,
      }, this.options)
    },
  }
}
</script>
