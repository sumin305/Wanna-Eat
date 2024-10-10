import { Component } from 'react';
import Chart from 'react-apexcharts';
import { ColumnWrapperStyled } from './WEColumn.js';
import theme from 'style/common/theme.js';

class ColumnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWeb: window.matchMedia('(min-width: 480px)').matches,
      options: {
        fill: {
          colors: [theme.color.primary],
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
            if (props.isRevenue) {
              return (val / 10000).toFixed(2);
            } else {
              return val;
            }
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        xaxis: {
          categories: this.props.categories || [],
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
              if (props.isRevenue) {
                if (val >= 10000) {
                  return (val / 10000).toFixed(2) + '만원';
                } else {
                  return val + '원';
                }
              } else {
                return val + '건';
              }
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
          data: [],
        },
      ],
    };
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.categories !== this.props.categories ||
      prevProps.series !== this.props.series
    ) {
      this.setState({
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.props.categories || [],
          },
        },
        series: this.props.series || this.state.series,
      });
    }
  }

  render() {
    const columnHeight = this.state.isWeb ? 300 : 200;

    if (!this.props.categories || !this.props.series) {
      return <div>Loading...</div>;
    }

    return (
      <ColumnWrapperStyled>
        <Chart
          options={this.state.options}
          categories={this.props.categories || this.state.categories}
          series={this.props.series || this.state.series}
          type="bar"
          height={columnHeight}
        />
      </ColumnWrapperStyled>
    );
  }
}

export default ColumnChart;
