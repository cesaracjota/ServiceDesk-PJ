import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
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
  Textarea,
  Select,
  IconButton,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { updatePerfilPersona } from '../../../actions/perfilPersona';

export const PerfilPersonaEditar = ({ row }) => {
    const [openedit, setOpenEdit] = React.useState(false);
    const dispatch = useDispatch();

    const [indice, setIndice] = useState({
        idPerfilPersona: null,
        perfil: '',
        descripcion: '',
        activo: '',
    });

    const handleClickOpenEdit = index => {
        setIndice(index);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const actualizarPerfilPersona = e => {
        e.preventDefault();
        dispatch(updatePerfilPersona(indice))
            .then(() => {
                handleCloseEdit(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <IconButton
                icon={<AiTwotoneEdit />}
                variant={'outline'}
                colorScheme={'facebook'}
                onClick={() => handleClickOpenEdit(row)}
                fontSize={'22px'}
                size={'sm'}
                _focus={{ boxShadow: "none" }}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} justifyContent={'center'}>
                        EDITAR PERFIL
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idPerfilPersona : ''}
                                disabled={true}
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>PERFIL</FormLabel>
                            <Input
                                autoFocus
                                defaultValue={indice ? indice.perfil : ''}
                                type="text"
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, perfil: (e.target.value).toUpperCase() })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>DESCRIPCIÓN</FormLabel>
                            <Textarea
                                autoFocus
                                defaultValue={indice ? indice.descripcion : ''}
                                onChange={e =>
                                    setIndice({ ...indice, descripcion: (e.target.value).toUpperCase() })
                                }
                                placeholder="Descripcion"
                                textTransform={'uppercase'}
                                type="text"
                                row={1}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>ESTADO</FormLabel>
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
                            onClick={e => actualizarPerfilPersona(e)}
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