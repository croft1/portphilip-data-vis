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
                <a href={Str_en.HOMEPAGE_BUILDINGS}>{Str_en.NAME_BUILDINGS}</a><br/>
                <a href={Str_en.HOMEPAGE_GARBAGE}>{Str_en.NAME_GARBAGE}</a><br/>
                <a href={Str_en.HOMEPAGE_TREES}>{Str_en.NAME_TREES}</a><br/>
                <a href={Str_en.HOMEPAGE_ACCESS_PARKING}>{Str_en.NAME_ACCESS_PARKING}</a><br/>
                <a href={Str_en.HOMEPAGE_BUS_ROUTES}>{Str_en.NAME_BUS_ROUTES}</a><br/>
                <a href={Str_en.HOMEPAGE_BUS_STOPS}>{Str_en.NAME_BUS_STOPS}</a><br/>
                <a href={Str_en.HOMEPAGE_CAR_SHARE}>{Str_en.NAME_CAR_SHARE}</a><br/>
                <a href={Str_en.HOMEPAGE_DOG_WALKING}>{Str_en.NAME_DOG_WALKING}</a><br/>
                <a href={Str_en.HOMEPAGE_COMMUNITY_GARDENS}>{Str_en.NAME_COMMUNITY_GARDENS}</a><br/>
                <a href={Str_en.HOMEPAGE_MATERNAL}>{Str_en.NAME_MATERNAL}</a><br/>
                <a href={Str_en.HOMEPAGE_SYRINGE}>{Str_en.NAME_SYRINGE}</a><br/>
                <a href={Str_en.HOMEPAGE_SWEEPING}>{Str_en.NAME_SWEEPING}</a><br/>
                <a href={Str_en.HOMEPAGE_PARKING_MACHINES}>{Str_en.NAME_PARKING_MACHINES}</a><br/>
                <a href={Str_en.HOMEPAGE_IMMUNISATION}>{Str_en.NAME_IMMUNISATION}</a><br/>

                </Dialog>
            </div>
        )
    }
}

