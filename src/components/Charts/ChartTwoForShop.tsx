import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import shopApi from '../../hooks/useShopApi';
import { useParams } from 'react-router-dom';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      size: 5,
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);
  const [monthlyRevenue5Percent, setMonthlyRevenue5Percent] = useState<number[]>([]);
  const {id} = useParams();
  interface Series {
    name: string;
    data: number[];
  }

  const [state, setState] = useState<{ series: Series[] }>({
    series: [
      {
        name: 'Sales',
        data: [],
      },
      {
        name: 'Revenue',
        data: [],
      },
    ],
  });

  const fetchMonthlyRevenue = async () => {
    try {
     
      const response = await shopApi.getTotalRevenueForShop(id);
      setMonthlyRevenue(response.data.monthlyRevenue);
      setMonthlyRevenue5Percent(response.data.monthlyRevenue5Percent);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyRevenue();
  }, []);

  // Update state.series whenever monthlyRevenue or monthlyRevenue5Percent changes
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Revenue',
          data: monthlyRevenue,
        },
        {
          name: 'Profit',
          data: monthlyRevenue5Percent,
        },
      ],
    });
  }, [monthlyRevenue, monthlyRevenue5Percent]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Monthly Revenue
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
