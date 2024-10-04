import { Component } from 'react';
import Chart from 'react-apexcharts';
import theme from 'style/common/theme.js';

class WELine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWeb: window.matchMedia('(min-width: 480px)').matches,
      options: {
        series: [
          {
            name: 'Desktops',
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ],
        fill: {
          colors: [theme.color.primary],
        },
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true,
          },
          toolbar: {
            show: true,
            autoSelected: 'pan',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.props.categories || ['0', '0', '0', '0', '0'],
        },
      },
    };
  }

  render() {
    const columnHeight = this.state.isWeb ? 300 : 200;

    const updatedOptions = {
      ...this.state.options,
      xaxis: {
        categories:
          this.props.categories || this.state.options.xaxis.categories,
        labels: {
          show: false,
        },
      },
    };

    return (
      <Chart
        options={updatedOptions}
        series={this.props.series || this.state.series}
        type="line"
        height={columnHeight}
      />
    );
  }
}

export default WELine;
