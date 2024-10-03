import { Component } from 'react';
import Chart from 'react-apexcharts';
import theme from 'style/common/theme.js';
import { DonutWrapperStyled } from './WEDonut.js';

class WEDonut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWeb: window.matchMedia('(min-width: 480px)').matches,
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: '35%',
            },
          },
        },
        fill: {
          colors: [
            theme.color.statisticsSkyBlue,
            theme.color.statisticsBlue,
            theme.color.statisticsPink,
          ],
        },

        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.labels[opts.seriesIndex];
          },
          textAnchor: 'middle',
          style: {
            fontWeight: `${theme.fontWeight.bold}`,
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            padding: 0,
            borderRadius: 0,
            borderWidth: 0,
            opacity: 0,
            dropShadow: {
              enabled: false,
            },
          },

          dropShadow: {
            enabled: false,
          },
        },
        labels: this.props.labels || ['금', '화', '월'],
      },
      series: this.props.series || [44, 55, 41],
    };
  }

  render() {
    const donutWidth = this.state.isWeb ? 130 : 90;
    const donutFontSize =
      this.props.type === 'time'
        ? this.state.isWeb
          ? theme.fontSize.px10
          : theme.fontSize.px8
        : this.state.isWeb
          ? theme.fontSize.px13
          : theme.fontSize.px10;

    const dynamicOptions = {
      ...this.state.options,
      dataLabels: {
        ...this.state.options.dataLabels,
        style: {
          ...this.state.options.dataLabels.style,
          fontSize: donutFontSize,
        },
      },
    };

    return (
      <DonutWrapperStyled>
        <Chart
          options={dynamicOptions}
          series={this.state.series}
          type="donut"
          width={donutWidth}
        />
      </DonutWrapperStyled>
    );
  }
}

export default WEDonut;
