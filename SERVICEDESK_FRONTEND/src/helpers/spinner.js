import { Box, Spinner, Stack, Text } from "@chakra-ui/react";

export function SpinnerComponent () {

    return (
        <Box display={'flex'} w={'full'} justifyContent="center" alignItems={'center'}>
            <Stack spacing={4} w="full" py={10} justifyContent="center" alignItems={'center'} direction="column" align={'center'}>
                <Text fontSize="3xl" fontWeight="extrabold">
                    {' '}
                    Cargando ...{' '}
                </Text>
                <Spinner
                    thickness="3px"
                    speed="0.80s"
                    emptyColor="gray.200"
                    color="purple.500"
                    size="xl"
                    variant={'grow'}
                />
            </Stack>
        </Box>
    )
}