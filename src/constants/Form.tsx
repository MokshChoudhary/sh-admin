import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Component } from "react";

export type formProp = {
    formName: string;
    data?: Map<String, [string,string][]> | [string, [string, string]][];
    positiveButtonHandler?: any;
    negitiveButtonHandler?: any;
}



class Form extends Component<formProp> {
    constructor(prop: formProp) {
        super(prop)
        this.formData = new Map<String, any>;
    }
    value: any;
    formData: Map<String, any>;

    render() {

        return (
            <>
                <div className="flex items-center justify-center my-3">{this.props.formName}</div>

                <Stack spacing={2}>
                    {
                        this.props.data instanceof Map ?
                            Array.from(this.props.data!).map(([key, value], _i) => {
                                var select_value: any;
                                return value instanceof Array ?
                                    <Select
                                        value={select_value}
                                        label={String(key)}
                                        id={String(key)}
                                        onChange={(event) => {
                                            this.formData.set(key, event.target.value);
                                            select_value = event.target.value;
                                        }}
                                    >
                                        {
                                            Array.from(value).map((k, v) => {
                                                return <MenuItem value={k}>{v}</MenuItem>
                                            })
                                        }

                                    </Select>
                                    :
                                    <TextField className="w-full" id={String(key)} onChange={(event) => { this.formData.set(key, event.target.value); }} label={String(value)} variant="outlined" />

                            }) :
                            Array.from(this.props.data!).map(([key, value], _i) => {
                                var select_value: any;
                                return value instanceof Array ?

                                    <Select
                                        value={select_value}
                                        label={key}
                                        id={String(key)}
                                        onChange={(event) => {
                                            this.formData.set(key, event.target.value);
                                            select_value = event.target.value;
                                        }}
                                    >
                                        {
                                            Array.from(value).map(([id,viewText], v) => {
                                                return <MenuItem value={id}>{viewText}</MenuItem>
                                            })
                                        }

                                    </Select>
                                    :
                                    <TextField className="w-full" id={String(key)} onChange={(event) => { this.formData.set(key, event.target.value); }} label={String(value)} variant="outlined" />

                            })
                    }
                    <Stack className="flex justify-center items-center" direction="row" spacing={3}>
                        {this.props.positiveButtonHandler ? <Button value="submit" onClick={() => this.props.positiveButtonHandler(this.formData)}>Submit</Button> : ""}
                        {this.props.negitiveButtonHandler ? <Button value="cancle" onClick={() => this.props.negitiveButtonHandler()}>Cancle</Button> : ""}
                    </Stack>
                </Stack>
            </>
        );
    }


}


export default Form;

