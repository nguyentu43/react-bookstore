import { SimpleGrid, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <SimpleGrid columns={[1,2,4]} gap={8}>
      <StatGroup  p={2} borderRadius="md" bg="red.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup  p={2} borderRadius="md" bg="pink.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup  p={2} borderRadius="md" bg="teal.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup  p={2} borderRadius="md" bg="blue.500" color="white">
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </SimpleGrid>
  );
}
