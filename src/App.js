import React from 'react';
import { Box, Flex, Link } from 'rebass'

const App = () => {
  return (
    <>
      <Box
        color='white'
        bg='black'
      >
        <Flex alignItems='center' sx={{
          maxWidth: 1200,
          mx: 'auto',
          py: 3,
          px: 2
        }}>

          <Link variant='nav' sx={{ p: 0, fontSize: 2 }} href='https://samuelreichert.github.io' target='_blank'>
            Samuel Reichert's Test
          </Link>
          <Box mx='auto' />
          <Link variant='nav' p={0} href='https://saltoks.com/team' target='_blank'>
            SaltoKS
          </Link>
        </Flex>
      </Box>

      <Box sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: 2,
      }}>
        Contents
    </Box>
    </>
  );
}

export default App;
