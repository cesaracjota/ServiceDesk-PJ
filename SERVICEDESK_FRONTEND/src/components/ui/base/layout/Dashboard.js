import React from 'react'
import { Box, Container, useDisclosure } from '@chakra-ui/react'
import SidebarContent from './Sidebar';
import Topnav from './Topnav';
import { store } from '../../../../store/store';
// import Footer from './Footer';

const Dashboard = ({ componente: Component }) => {

    const usuario = store.getState().auth;

    const sidebar = useDisclosure();

    return (
        <>
            <Box as="section" bg="gray.50" _dark={{ bg: "#151a23" }} minH="100vh">

                <SidebarContent onClose={sidebar.onClose} rol={usuario?.rol} display={{ base: "none", lg: "unset" }} />

                <Topnav isOpen={sidebar.isOpen} onClose={sidebar.onClose} onOpen={sidebar.onOpen} />

                <Box mt={"95px"} ml={{ base: 0, lg: 60 }} transition=".6s ease">
                    <Container maxW="container.2xl" mb={4}>
                        { Component }
                    </Container>
                    {/* footer */}
                    {/* <Divider  mt={4}/>
                    <Footer/> */}
                </Box>
            </Box>
        </>
    )
}

export default Dashboard;