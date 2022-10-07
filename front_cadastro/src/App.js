import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Image,
  Heading,
  Divider,
  Center

} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import { getAllTeachers, deleteTeacher } from './services/TeacherService';

const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    loadData();
  }, [setData]);

  const loadData = async () => {
    const teachers = await getAllTeachers();
    if (teachers) {
      setData(teachers)
    }
  }


  const handleRemove = async (id) => {

    const deleted = await deleteTeacher(id);

    if (deleted) {
      loadData();
    }

  };

  return (
    <Flex
      h="100vh" 
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >

      <Box maxW={950} w="100%" h="100vh" py={10} px={2}>

        <Flex align="center" justify="left">
          <Image src='https://s3.amazonaws.com/gupy5/production/companies/856/career/1160/images/2021-07-28_15-36_logo.png' boxSize='100px' alt='Nova Escola' />
          <Heading> &nbsp; Cadastro de professores </Heading>
        </Flex>

        <Center height='20px'>
          <Divider orientation='horizontal' />
        </Center>

        <Center>
          <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
            NOVO CADASTRO
          </Button>
        </Center>
        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Matrícula
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Sobrenome
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Série
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ first_name, last_name, registration_number, grade, id }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{registration_number}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{first_name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{last_name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{grade}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ first_name, last_name, registration_number, grade, index, id }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
}

export default App;
