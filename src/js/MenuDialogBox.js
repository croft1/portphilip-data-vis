import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as Str_en      from './Strings_en';
import MenuItem from 'material-ui/MenuItem';
import DataIcon from 'material-ui/svg-icons/file/cloud';


const customStyle = {
    width: '50%',
    maxWidth: '300px',
    minWidth: '100px',
};
export default class DialogBox extends React.Component{

    constructor(props){
        super(props);
        this.state = {open: false};
    }

    handleClose = () => this.setState({open: false});
    handleOpen = () => this.setState({open: true});

    render(){
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return(
            <div>
                <MenuItem leftIcon={<DataIcon/>} onClick={this.handleOpen} >{Str_en.NAME_DATA_SOURCES}</MenuItem>

                <Dialog
                    title={Str_en.NAME_DATA_SOURCES}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    contentStyle={customStyle}
                >
                    {/*make this more reusable and pass in a prop with this info*/}
                <p>data.gov.au</p>
                <a href={Str_en.HOMEPAGE_BUILDINGS}>{Str_en.NAME_BUILDINGS}</a>
                    <br/>

                </Dialog>
            </div>
        )
    }
}

