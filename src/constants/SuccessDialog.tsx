import { Alert } from "@mui/material";

export type Alert = {
    msg:String
}


export default function SuccessDialog ({msg}:Alert){
   return( <Alert variant="outlined" severity={"success"}>
  {msg}
</Alert>);
}