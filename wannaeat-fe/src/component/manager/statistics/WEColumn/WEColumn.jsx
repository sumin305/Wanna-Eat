import { Component } from 'react';
import Chart from 'react-apexcharts';
import { ColumnWrapperStyled } from './WEColumn.js';

class ColumnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWeb: window.matchMedia('(min-width: 480px)').matches,
      options: {
        fill: {
          colors: ['#344BFD'],
        },
        chart: {
          height: 350,
          type: 'bar',
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        xaxis: {
          categories: this.props.categories || ['0', '0', '0', '0', '0'],
          position: 'top',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + '만원';
            },
          },
        },
        title: {
          text: '',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444',
          },
        },
      },
      series: [
        {
          name: '',
          data: [0, 0, 0, 0, 0],
        },
      ],
    };
  }

  render() {
    const columnHeight = this.state.isWeb ? 300 : 200;
    return (
      <ColumnWrapperStyled>
        <Chart
          options={this.state.options}
          series={this.props.series || this.state.series}
          type="bar"
          height={columnHeight}
        />
      </ColumnWrapperStyled>
    );
  }
}

export default ColumnChart;
