// import { ResponsivePie } from '@nivo/pie';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const data = [
  { kdc: '0', count: 3 },
  { kdc: '1', count: 3 },
  { kdc: '2', count: 2 },
  { kdc: '9', count: 4 },
  { kdc: '4', count: 5 },
];

const initialOptions = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          show: false, // 항목 리스트 제거
        },
      },
    },
  ],
  dataLabels: {
    enabled: true,
    dropShadow: {
      enabled: false,
    },
    formatter: function (val, opts) {
      // 각 항목의 이름과 값을 같이 표시
      return `${opts.w.globals.labels[opts.seriesIndex]}: ${val.toFixed(1)}%`;
    },
    style: {
      fontSize: '12px',
      fontFamily: 'Pretendard',
      color: '#000',
      fontWeight: 400,
      textShadow: 'none',
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -7,
        style: {
          fontSize: '12px',
          fontWeight: 400,
          textShadow: 'none',
        },
      },
    },
  },
  legend: {
    show: false, // 항목 리스트를 아예 숨김
  },
};

const WEPie = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    const newSeries = data.map((item) => item.count);
    const newLabels = data.map((item) => {
      switch (item.kdc) {
        case '0':
          return '총류';
        case '1':
          return '철학';
        case '2':
          return '종교';
        case '3':
          return '사회과학';
        case '4':
          return '자연과학';
        case '5':
          return '기술과학';
        case '6':
          return '예술';
        case '7':
          return '언어';
        case '8':
          return '문학';
        case '9':
          return '역사';
        default:
          return `기타`;
      }
    });

    setSeries(newSeries);
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: newLabels,
    }));
  }, []);

  return (
    <div className="flex justify-center w-full h-full">
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={300}
        />
      </div>
    </div>
  );
};

export default WEPie;
