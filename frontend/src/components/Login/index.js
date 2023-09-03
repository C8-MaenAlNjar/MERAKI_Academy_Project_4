import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { useColorMode } from "@chakra-ui/react";


const Login = () => {

  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate();
  const { setUser, setUserInfo } = useContext(UserContext);
  const [theme ,setTheme] =useState("light")
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handlLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", info);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setUser(response.data.userId);
        setUserInfo(response.data);

        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Error response:", err.response);
      console.log("Error:", err);
    }
  };
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
          <Button size='sm' colorScheme='blue' onClick={toggleColorMode}>
        Dark mode
      </Button>
        </Stack>
       
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handlLogin}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={info.email} 
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={info.password}
                  onChange={(e) => setInfo({ ...info, password: e.target.value })}
                  />
              </FormControl>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
