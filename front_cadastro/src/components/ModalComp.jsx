import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

import { createTeacher, updateTeacher } from '../services/TeacherService';

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

    const [first_name, setFirstName] = useState(dataEdit.first_name || "");
    const [last_name, setLastName] = useState(dataEdit.last_name || "");
    const [registration_number, setRegistrationNumber] = useState(dataEdit.registration_number || "");
    const [grade, setGrade] = useState(dataEdit.grade || "");
    const id = dataEdit.id;

    const matriculaAlreadyExists = () => {

        if (dataEdit.registration_number !== registration_number && data?.length) {
            return data.find((item) => String(item.registration_number) === String(registration_number));
        }
        return false;
    };


    const handleSave = async () => {

        if (!first_name || !last_name || !registration_number) return;

        if (matriculaAlreadyExists()) {
            return alert("Matrícula já cadastrada!");
        }


        if (Object.keys(dataEdit).length) {
            const dataAtt = { first_name, last_name, registration_number, grade };
            const updated = await updateTeacher(id, dataAtt)
            if (updated)
                data[dataEdit.index] = dataAtt;

        } else {
            createTeacher({ first_name, last_name, registration_number, grade })
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { first_name, last_name, registration_number, grade }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastrar professor </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Sobrenome</FormLabel>
                                <Input
                                    type="text"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>Matricula</FormLabel>
                                <Input
                                    type="text"
                                    value={registration_number}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Série</FormLabel>
                                <Input
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                />
                            </Box>

                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComp;