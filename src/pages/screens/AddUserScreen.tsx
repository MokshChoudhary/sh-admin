import { Button, Card, Grid } from "@mui/material";
import { Component } from "react";
import Form from "../../constants/Form";
import axios from "axios";
import ServiceConstants from "../../constants/ServiceConst";

class AddUser extends Component {
    constructor(parameters: any) {
        super(parameters)
        this.constants = new ServiceConstants();
    }
    constants: ServiceConstants;

    render() {
        var formData: [string, any][] = [
            ["userName", "User Name"],
            ["password", "Password"],
            ["rpassword", "Re-enterPassword"],
            ["type", ["10", "20", "30"]],
        ];
        return (
            <div className="relative">
                <Card className="absolute transform -translate-x-1/2 left-1/2 w-[50%] p-2">
                    <Form formName="Add User" data={formData} positiveButtonHandler={(data: any) => {
                        console.log(data);
                        if (data['password'] == data['rpassword'])
                            axios({
                                method: "post",
                                url: this.constants.login,
                                data: data
                            })
                                .then(response => {
                                    if (response.status == 200) {
                                        console.log(response.data);
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                    }} negitiveButtonHandler={() => console.log("Click")} />
                </Card>
            </div>
        );
    }
}

export default AddUser;