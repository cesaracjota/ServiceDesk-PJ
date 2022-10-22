import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    IconButton,
    Button,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updateCargo } from '../../../actions/cargo';

export const CargoEditar = ({ row }) => {
    const [openedit, setOpenEdit] = React.useState(false);
    const dispatch = useDispatch();

    const [indice, setIndice] = useState({
        idCargo: null,
        cargo: "",
        activo: "",
      });
    
      const handleClickOpenEdit = index => {
        setIndice(index);
        setOpenEdit(true);
      };
    
      const handleCloseEdit = () => {
        setOpenEdit(false);
      };

      const actualizarCargo = e => {
        e.preventDefault();
        dispatch(updateCargo(indice))
          .then(() => {
            handleCloseEdit(true);
          })
          .catch(e => {
            // console.log(e);
          });
      };

    return (
        <>
            <IconButton
                onClick={() => handleClickOpenEdit(row)}
                variant={'outline'}
                colorScheme="facebook"
                icon={<AiTwotoneEdit size={24} />}
                size={'sm'}
                _focus={{ boxShadow: "none" }}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        EDITAR CARGO
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idCargo : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">CARGO</FormLabel>
                            <Input
                                defaultValue={indice ? indice.cargo : ''}
                                type="text"
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, cargo: e.target.value.toUpperCase() })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel fontWeight="bold">ESTADO</FormLabel>
                            <Select
                                defaultValue={indice ? indice.activo : ''}
                                onChange={e =>
                                    setIndice({ ...indice, activo: e.target.value })
                                }
                            >
                                <option value="S">ACTIVO</option>
                                <option value="N">INACTIVO</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={e => actualizarCargo(e)}
                            colorScheme="green"
                            mr={3}
                            _focus={{ boxShadow: "none" }}
                        >
                            ACTUALIZAR
                        </Button>
                        <Button onClick={handleCloseEdit} _focus={{ boxShadow: "none" }} colorScheme="red" variant="outline">CANCELAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}