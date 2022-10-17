import {
    Box,
    useColorModeValue,
    SimpleGrid,
    chakra,
    Flex,
    Icon,
    Button,
    VStack,
  } from '@chakra-ui/react';
  
  import { NavLink } from 'react-router-dom';
  
  import { ArrowForwardIcon } from '@chakra-ui/icons'
  
  import { BsPerson } from 'react-icons/bs';
  import { GoCalendar } from 'react-icons/go';
  import { HiOutlineDocumentReport } from "react-icons/hi"
  
  export default function ListaReportes() {
    return (
      <>
        <Box borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow={'md'}
          mb={4}
          p={2}
          fontSize={['6px', '12px', '14px', '16px']}
          bg={useColorModeValue('gray.100', 'gray.900')} >
          <SimpleGrid columns={[1, 2, 2, 3]} spacing={5} textColor={'white'}>
            <Flex
                w="full"
                bg="white"
                _dark={{ bg: "gray.800", borderWidth: "1px" }}
                rounded="md"
                overflow="hidden"
                justify={'space-between'}
                boxShadow={'md'}
                _hover={{boxShadow: 'lg'}}
              >
                <Box py={6}>
                  <Box mx={3}>
                    <VStack>
                      <chakra.span
                        color="red.500"
                        _dark={{ color: "red.600" }}
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        POR TÉCNICOS
                      </chakra.span>
                      <NavLink to='/dashboard/reportes/incidencias-por-tecnico'>
                        <Button _focus={{ boxShadow: "none" }} rightIcon={<ArrowForwardIcon />} size={'xs'} _dark={{ color: "gray.200" }} colorScheme='red' variant='solid'>
                          INGRESAR
                        </Button>
                      </NavLink>
                    </VStack>
                  </Box>
                </Box>
  
                <Flex justifyContent="center" alignItems="center" w={20} bg="red.600" rounded="md">
                  <Icon as={HiOutlineDocumentReport} color="white" boxSize={12} />
                </Flex>
              </Flex>
              <Flex
                w="full"
                bg="white"
                _dark={{ bg: "gray.800", borderWidth: "1px" }}
                rounded="md"
                overflow="hidden"
                justify={'space-between'}
                boxShadow={'md'}
                _hover={{boxShadow: 'lg'}}
              >
                <Box py={6}>
                  <Box mx={3}>
                    <VStack>
                      <chakra.span
                        color="green.500"
                        _dark={{ color: "green.600" }}
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        POR USUARIOS
                      </chakra.span>
                      <NavLink to='/dashboard/reportes/incidencias-por-usuario'>
                        <Button _focus={{ boxShadow: "none" }} rightIcon={<ArrowForwardIcon />} size={'xs'} _dark={{ color: "gray.200" }} colorScheme='green' variant='solid'>
                          INGRESAR
                        </Button>
                      </NavLink>
                    </VStack>
                  </Box>
                </Box>
  
                <Flex justifyContent="center" alignItems="center" w={20} bg="green.600" rounded="md">
                  <Icon as={GoCalendar} color="white" boxSize={12} />
                </Flex>
              </Flex>
  
              <Flex
                w="full"
                bg="white"
                _dark={{ bg: "gray.800", borderWidth: "1px" }}
                rounded="md"
                overflow="hidden"
                justify={'space-between'}
                boxShadow={'md'}
                _hover={{boxShadow: 'lg'}}
              >
                <Flex py={6} mx={3} justifyContent={'left'} alignItems={'left'}>
                    <VStack>
                      <chakra.span
                        color="blue.500"
                        _dark={{ color: "blue.600" }}
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        TIEMPO
                      </chakra.span>
                      <NavLink to='/dashboard/reportes/incidencias-por-tiempos'>
                        <Button _focus={{ boxShadow: "none" }} textAlign={'left'} rightIcon={<ArrowForwardIcon />} size={'xs'} _dark={{ color: "gray.200" }} colorScheme='blue' variant='solid'>
                          INGRESAR
                        </Button>
                      </NavLink>
                    </VStack>
                </Flex>
  
                <Flex justifyContent="center" alignItems="center" w={20} bg="blue.600" rounded="md">
                  <Icon as={BsPerson} color="white" boxSize={12} />
                </Flex>
              </Flex>       
          </SimpleGrid>
        </Box>
      </>
    );
  }