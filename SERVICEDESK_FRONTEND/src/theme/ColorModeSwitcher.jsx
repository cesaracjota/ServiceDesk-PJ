import React from 'react';
import { useColorMode, useColorModeValue, IconButton, Tooltip } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('Oscuro', 'Claro');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <Tooltip label={`Modo ${text}`} aria-label={`Modo ${text}`}>
        <IconButton
          size="lg"
          fontSize="xl"
          variant="ghost"
          marginLeft="2"
          onClick={toggleColorMode}
          icon={<SwitchIcon />}
          {...props}
        />
    </Tooltip>
  );
};
