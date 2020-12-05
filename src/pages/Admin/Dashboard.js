import {
  GridItem,
  SimpleGrid,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import Chart from 'react-google-charts';
import BlockLayout from '../../components/Admin/BlockLayout';
import { Table, THeading, TRow, TData } from '../../components/Table';

export default function Dashboard() {
  return (
    <SimpleGrid columns={[1, 2, 4]} gap={4}>
      <StatGroup p={2} borderRadius="md" bg="red.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup p={2} borderRadius="md" bg="pink.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup p={2} borderRadius="md" bg="teal.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup p={2} borderRadius="md" bg="blue.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Site Traffic">
          <Chart
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Year', 'Sales', 'Expenses'],
              ['2013', 1000, 400],
              ['2014', 1170, 460],
              ['2015', 660, 1120],
              ['2016', 1030, 540],
            ]}
            options={{
              title: 'Company Performance',
              hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: '50%', height: '70%' },
              // lineWidth: 25
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
          />
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Weekly Sales">
          <Chart
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Task', 'Hours per Day'],
              ['Work', 11],
              ['Eat', 2],
              ['Commute', 2],
              ['Watch TV', 2],
              ['Sleep', 7],
            ]}
            options={{
              title: 'My Daily Activities',
              // Just add this option
              pieHole: 0.4,
            }}
            rootProps={{ 'data-testid': '3' }}
          />
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="World Selling Region">
          <Chart
            chartType="GeoChart"
            data={[
              ['City', 'Population', 'Area'],
              ['Rome', 2761477, 1285.31],
              ['Milan', 1324110, 181.76],
              ['Naples', 959574, 117.27],
            ]}
            options={{
              region: 'IT',
              displayMode: 'markers',
              colorAxis: { colors: ['green', 'blue'] },
            }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="YOUR_KEY_HERE"
            rootProps={{ 'data-testid': '2' }}
          />
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Total Sales">
          <Stack direction={["column", "column", "row"]}>
            <StatGroup p={2} borderRadius="md" bg="red.500" color="white">
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
            <StatGroup p={2} borderRadius="md" bg="red.500" color="white">
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
            <StatGroup p={2} borderRadius="md" bg="red.500" color="white">
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Stack>
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="Customer Review">
          <Table>
            
          </Table>
        </BlockLayout>
      </GridItem>
      <GridItem colSpan={[1, 2]}>
        <BlockLayout blockName="New Orders">
          <Table>
            
          </Table>
        </BlockLayout>
      </GridItem>
    </SimpleGrid>
  );
}
