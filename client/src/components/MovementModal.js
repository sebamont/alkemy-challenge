import React, {useState, useEffect, useContext} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Input,
    NumberInput,
    Select,
    FormControl,
    FormLabel,
    NumberInputField,
    Wrap
  } from "@chakra-ui/react"

import {GlobalContext} from '../context/GlobalContext';


const MovementModal = ({isModalOpen, onCloseModal, movementOnModal}) => {
  const [movDescription, setMovDescription] = useState('');
  const [movAmount, setMovAmount] = useState(0);
  const [movCategory, setMovCategory] = useState('')
  const [isAboutToDelete, setIsAboutToDelete] = useState(false);

  const{editMovement, deleteMovement} = useContext(GlobalContext);

    
  useEffect(()=>{
    setIsAboutToDelete(false);
    setMovDescription(movementOnModal.movementDescription);
    setMovAmount(movementOnModal.movementAmount);
    setMovCategory(movementOnModal.movementCategory);
  },[movementOnModal])

  const handleUpdate = () => {
    const editedBody = {
      movementDescription: movDescription,
      movementAmount: movAmount,
      movementCategory: movCategory
    }
    editMovement(movementOnModal._id, editedBody);
    onCloseModal();
  }

  const handleDelete = () => {
    deleteMovement(movementOnModal._id);
    onCloseModal();
  }

    return (
      <>
        <Modal isOpen={isModalOpen} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent>
            {isAboutToDelete && 
            <>
              <ModalHeader>Eliminar Movimiento: {movementOnModal.movementDescription} del {new Date(movementOnModal.movementCreatedAt).toLocaleDateString()}?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>¿Está seguro de eliminar este movimiento? La eliminación de un movimiento es permanente y no podrá recuperarse.</Text>
              </ModalBody>
              <ModalFooter>
              <Wrap>
                  <Button colorScheme="gray" mx="6" onClick={()=>setIsAboutToDelete(false)}>Cancelar</Button>
                  <Button colorScheme="red" onClick={handleDelete}>Eliminar</Button>
              </Wrap>
              </ModalFooter>
            </>
            }
            {!isAboutToDelete && 
            <>
            <ModalHeader>Editar/Eliminar Movimiento</ModalHeader>
            <ModalCloseButton />
              <form onSubmit={handleUpdate}>
            <ModalBody>
                <Text>Fecha: {new Date(movementOnModal.movementCreatedAt).toLocaleDateString()}</Text>
                <FormControl id="description">
                    <FormLabel>Descripción</FormLabel>
                    <Input value={movDescription} onChange={(e) => setMovDescription(e.target.value)}/>
                </FormControl>
                <FormControl id="amount">
                    <FormLabel>Monto</FormLabel>
                    <NumberInput max={500000} min={-500000} defaultValue={movAmount}>
                        <NumberInputField onChange={(e) => setMovAmount(e.target.value)}/>
                    </NumberInput>
                </FormControl>
                <FormControl id="category" >
                    <FormLabel>Categoría</FormLabel>
                    <Select value={movCategory} onChange={(e) => setMovCategory(e.target.value)}>
                        <option>Sueldo/Salarios</option>
                        <option>Otros Ingresos</option>
                        <option>Alquiler</option>
                        <option>Expensas y Servicios Mensuales</option>
                        <option>Mercadería</option>
                        <option>Ocio y Recreación</option>
                        <option>Bienes durables</option>
                        <option>Otros gastos</option>
                    </Select>
                </FormControl>
            </ModalBody>
            <ModalFooter>
              <Wrap>
                  <Button type="submit" colorScheme="teal" >Editar</Button>
                  <Button colorScheme="gray" mx="6" onClick={onCloseModal}>Cancelar</Button>
                  <Button colorScheme="red" onClick={()=>setIsAboutToDelete(true)}>Eliminar</Button>
              </Wrap>
            </ModalFooter>
              </form>
            </>
            }
  
          </ModalContent>
        </Modal>
      </>
    )
}

export default MovementModal
