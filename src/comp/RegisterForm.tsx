import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

import ServiceConstants from '../constants/ServiceConst';

     


export default function RegisterForm(){
    //useEffect(setUsernameState, [username])
    var constants = new ServiceConstants();
    const [username, setUsernameState] = useState("");
    const [password, setPasswordState] = useState("");

    var SubmitHandler = ()=>{
        axios({
            method:"post",
            url: constants.login,
            data:{
                "username":username,
                "password":password,
              }
        })
        .then(response =>{
            if(response.status == 200){
                console.log(response.data);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return (
        <Card className='absolute transform -translate-x-1/2 -translate-y-1/2 top-[40%] left-1/2' variant="outlined">
            <Stack className='m-8' spacing={2}>
                <div className='flex items-center justify-center text-xl'>Login</div>
                <TextField className='w-72' id="outlined-basic" label="Username" variant="outlined" onChange={e=>setUsernameState(e.target.value)}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e=>setPasswordState(e.target.value)}/>
                <Button variant="contained" onClick={SubmitHandler}>Submit</Button>
            </Stack>
        </Card>

    );
}

