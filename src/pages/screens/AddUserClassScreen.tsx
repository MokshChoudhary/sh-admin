import { Component } from "react";
import axios from "axios";
import ServiceConstants from "../../constants/ServiceConst";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Form from "../../constants/Form";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

type State = {

    rowData: any;
    isClassLoaded: boolean;
    isUserLoaded: boolean;
    classList: [string, string][];
    userList: [string, string][];
    open: boolean;
}

type Prop = {

}

class AddUserClass extends Component<Prop, State> {

    constants: ServiceConstants;


    columns: GridColDef<(typeof this.state.rowData)[number]>[] | undefined;
    Transition: any;

    constructor(parameters: any) {
        super(parameters)
        this.constants = new ServiceConstants();
        this.state = {
            rowData: null,
            isClassLoaded: false,
            isUserLoaded: false,
            classList: [][0],
            userList: [][0],
            open: false
        }
        this.getClassList();
        this.getUserList();
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

    getClassList() {
        axios({
            method: "post",
            url: this.constants.getMeta,
            data: {
                "tableName": "class_data"
            }
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data.data);
                    var combo: [string, string][] = [];
                    for (var d in response.data.data) {
                        combo.push([response.data.data[d].class_id, response.data.data[d].class_name])
                    }
                    this.setState({ classList: combo , isClassLoaded : true});
                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    getUserList() {
        axios({
            method: "post",
            url: this.constants.getUsers,
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data.data);
                    var combo: [string, string][] = [];
                    for (var d in response.data.data) {
                        combo.push([response.data.data[d].user_id, response.data.data[d].username])
                    }
                    this.setState({ userList: combo, isUserLoaded : true});
                }
            })
            .catch(err => {
                console.log(err);

            })
    }

    init() {

        axios({
            method: "post",
            url: this.constants.getUserClass,
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data.data);
                    this.setState({ rowData: response.data.data });
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
            { field: 'uuid', headerName: 'ID', width: 90 },
            { field: 'classId', headerName: 'Class Id', width: 90 },
            { field: 'userId', headerName: 'User Id', width: 90 }
        ];
        return (
            <>
            {Array.from(this.state.rowData).length > 0 ? <Dialog
                open={this.state.open}
                TransitionComponent={this.Transition}
                keepMounted
                onClose={this.handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"User Class Table"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <DataGrid
                            getRowId={(row) => row.uuid}
                            rows={this.state.rowData}
                            columns={columns} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            :
            <Dialog
                open={this.state.open}
                TransitionComponent={this.Transition}
                keepMounted
                onClose={this.handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"User Class Table"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Data is empty
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>}
            </>

        );
    }

    render() {
        var formData: [string, any][] = [
            ["userId", this.state.userList],
            ["classId", this.state.classList],
        ];


        return (
            <>
                {!(this.state.isClassLoaded && this.state.isUserLoaded) && <p>Data is being loaded..</p>}
                {(this.state.isClassLoaded && this.state.isUserLoaded) &&
                    <div className="relative">
                        <Card className="absolute transform -translate-x-1/2 left-1/2 w-[50%] p-2">
                            <Form formName="Add User Class" data={formData} positiveButtonHandler={(data: any) => {
                                console.log(data);
                                    axios({
                                        method: "post",
                                        url: this.constants.addUserClass,
                                        data: data,
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

export default AddUserClass;