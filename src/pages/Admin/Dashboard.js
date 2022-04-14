/* eslint-disable react-hooks/exhaustive-deps */

import {
  GridItem,
  Select,
  SimpleGrid,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import Chart from 'react-google-charts';
import BlockLayout from '../../components/Admin/BlockLayout';
import { getDashboardData } from '../../api';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Dashboard() {
  const [data, setData] = useState({
    yearlyChart: [],
    bestSellerChart: [],
    monthlyChart: [],
  });
  const [year, setYear] = useState(moment().year());

  async function fetchData() {
    const { data } = await getDashboardData({ year });
    setData(JSON.parse(data));
  }

  useEffect(() => {
    fetchData();
  }, [year]);

  return (
    <SimpleGrid columns={[1, 2, 4]} gap={4}>
      <GridItem colSpan={[1, 2, 4]}>
        <Select value={year} onChange={e => setYear(Number(e.target.value))}>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
        </Select>
      </GridItem>
      <StatGroup p={2} borderRadius="md" bg="red.500" color="white">
        <Stat>
          <StatLabel>Books</StatLabel>
          <StatNumber>{data.productCount}</StatNumber>
        </Stat>
      </StatGroup>
      <StatGroup p={2} borderRadius="md" bg="pink.500" color="white">
        <Stat>
          <StatLabel>Orders</StatLabel>
          <StatNumber>{data.orderCount}</StatNumber>
        </Stat>
      </StatGroup>
      <StatGroup p={2} borderRadius="md" bg="teal.500" color="white">
        <Stat>
          <StatLabel>Users</StatLabel>
          <StatNumber>{data.userCount}</StatNumber>
        </Stat>
      </StatGroup>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Yearly Sales">
          {data.yearlyChart.length > 1 ? (
            <Chart
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={data.yearlyChart}
              options={{
                hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 },
                chartArea: { width: '50%', height: '70%' },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          ) : (
            'Data not found'
          )}
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Monthly Sales">
          {data.monthlyChart.length > 1 ? (
            <Chart
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={data.monthlyChart}
              options={{
                hAxis: { title: 'Month', titleTextStyle: { color: '#333' } },
                vAxis: { minValue: 0 },
                chartArea: { width: '50%', height: '70%' },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          ) : (
            'Data not found'
          )}
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Best Seller">
          {data.bestSellerChart.length > 1 ? (
            <Chart
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={data.bestSellerChart}
              options={{
                pieHole: 0.2,
              }}
              rootProps={{ 'data-testid': '3' }}
            />
          ) : (
            'Data not found'
          )}
        </BlockLayout>
      </GridItem>
    </SimpleGrid>
  );
}
