import { Component, useEffect } from "react";
import axios from "axios";
import ServiceConstants from "../../constants/ServiceConst";
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Form from "../../constants/Form";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

type State = {

    rowData: any;
    isLoading: boolean;
    typeList: [string, string][];
    open: boolean;
}

type Prop = {

}

class AddSubject extends Component<Prop, State> {

    constants: ServiceConstants;


    columns: GridColDef<(typeof this.state.rowData)[number]>[] | undefined;
    Transition: any;

    constructor(parameters: any) {
        super(parameters)
        this.constants = new ServiceConstants();
        this.state = {
            rowData: null,
            isLoading: true,
            typeList: [][0],
            open: false
        }
        this.init();
        this.Transition = React.forwardRef(function Transition(
            props: TransitionProps & {
                children: React.ReactElement<any, any>;
            },
            ref: React.Ref<unknown>,
        ) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
    }

    init() {

        axios({
            method: "post",
            url: this.constants.getSubjects,
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data.data);
                    this.setState({ rowData: response.data.data, isLoading: false });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    userDetails() {

        const columns: GridColDef[] = [
            { field: 'subject_id', headerName: 'ID' },
            { field: 'subject_name', headerName: 'Subject Name' },
        ];
        return (
            <Dialog
                open={this.state.open}
                TransitionComponent={this.Transition}
                keepMounted
                onClose={this.handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"Subject Table Data"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <DataGrid
                            getRowId={(row) => row.subject_id}
                            rows={this.state.rowData}
                            columns={columns} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>

        );
    }

    render() {
        var formData: [string, any][] = [
            ["subject_id", "UUId"],
            ["subject_name", "Subject Name"],
        ];


        return (
            <>
                {this.state.isLoading && <p>Data is being loaded..</p>}
                {!this.state.isLoading &&
                    <div className="relative">
                        <Card className="absolute transform -translate-x-1/2 left-1/2 w-[50%] p-2">
                            <Form formName="Add Subject" data={formData} positiveButtonHandler={(data: any) => {
                                console.log(data);
                                    axios({
                                        method: "post",
                                        url: this.constants.addSubject,
                                        data: data
                                    })
                                        .then(response => {
                                            if (response.status == 200) {
                                                console.log(response.data);
                                                this.init();
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                            }} negitiveButtonHandler={() => console.log("Click")} />
                            <Button variant="outlined" onClick={this.handleClickOpen}>
                                Slide in alert dialog
                            </Button>
                            {this.userDetails() }
                        </Card>
                    </div>
                }
            </>
        );
    }
}

export default AddSubject;