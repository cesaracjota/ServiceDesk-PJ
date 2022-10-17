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
  Select,
  IconButton,
} from '@chakra-ui/react';

import { AiTwotoneEdit } from 'react-icons/ai';
import { updateOrgano } from '../../../actions/organo';

import { store } from '../../../store/store';

export const OrganoEditar = ({ row }) => {
    const [openedit, setOpenEdit] = useState(false);
    const dispatch = useDispatch();

    const dataSede = store.getState().sede.rows;
    
    const [indice, setIndice] = useState({
      idOrgano: null,
      organo: '',
      sede: {
        idSede: null,
      },
      activo: '',
    });
  
    const handleClickOpenEdit = index => {
      setIndice(index);
      setOpenEdit(true);
    };
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    const handleUpdateOrgano = e => {
        e.preventDefault();
        dispatch(updateOrgano(indice))
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
                onClick={() => handleClickOpenEdit(row)}
                variant={'outline'}
                colorScheme="facebook"
                icon={<AiTwotoneEdit size={24} />}
                size={'sm'}
                _focus={{ boxShadow: "none" }}
            />
            <Modal isOpen={openedit} onClose={handleCloseEdit} size={'2xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} justifyContent={'center'}>
                        EDITAR ORGANO
                    </ModalHeader>
                    <ModalCloseButton _focus={{ boxShadow: "none" }} />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                value={indice ? indice.idOrgano : ''}
                                disabled={true}
                                type="text"
                                hidden={true}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>SEDE</FormLabel>
                            <Select
                                defaultValue={indice ? indice.sede.idSede : ''}
                                onChange={e =>
                                    setIndice({ ...indice, sede: e.target.value })
                                }
                            // onChange={handleChangeSede}
                            // options={
                            //   dataSede.map((item, idx) => ({
                            //     key: idx,
                            //     value: item.idSede,
                            //     label: item.sede,
                            //   }))
                            // }
                            >
                                {dataSede.map((item, idx) => (
                                    <option value={item.idSede} key={idx}>
                                        {item.sede}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>ORGANO</FormLabel>
                            <Input
                                defaultValue={indice ? indice.organo : ''}
                                type="text"
                                textTransform={'uppercase'}
                                onChange={e =>
                                    setIndice({ ...indice, organo: e.target.value.toUpperCase() })
                                }
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
                            onClick={e => handleUpdateOrgano(e)}
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
