import React, {useState} from 'react'
import {FormControl, FormLabel,Input, InputRightElement,InputGroup, 
    VStack, Button} from "@chakra-ui/react"
import {Link} from "react-router-dom";

const Login=()=>{
    const [show, setShow] = useState(false);
    const [email, setEmail]= useState();
    const [password, setPassword]=useState();

    const handleClick=(e) => setShow(!show); 
    const submitHandler = () => {
        console.log("Email:", email);
        console.log("Password:", password);
      };
      
    console.log(setEmail,setPassword)
    return (
        
        <VStack spacing="5px" color="black">
             <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter Your Email"
                    onChange={(e)=>setEmail(e.target.value)} value={email}/>
             </FormControl>
              <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                    <Input 
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                    onChange={(e)=>setPassword(e.target.value)} value={password}/>

                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide":"Show"}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
             </FormControl>
             <Link to="/dash">
             <Button colorScheme="blue" width="100%" style={{marginTop:15}} 
             onClick={submitHandler}>
                Login
                           
            </Button></Link>
           
        </VStack>
    )
}

export default Login;

