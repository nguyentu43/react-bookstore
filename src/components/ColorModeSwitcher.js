import React from 'react';
import { useColorMode, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Icon
      _hover={{ cursor: 'pointer' }}
      aria-label={`Switch to ${text} mode`}
      color="current"
      onClick={toggleColorMode}
      as={SwitchIcon}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
