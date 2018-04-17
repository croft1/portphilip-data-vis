import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import MenuItemSnackbar from './MenuItemSnackbar';
import Divider from 'material-ui/Divider';

import PersonIcon from 'material-ui/svg-icons/social/person';
import MapLayerIcon from 'material-ui/svg-icons/maps/layers';
import MapLayerErrorIcon from 'material-ui/svg-icons/alert/error-outline';
import logo from '../images/logo.png';
import DialogMenuItem from './MenuDialogBox';
import * as Str_en      from './Strings_en';

//these must be at the correct index to each other please
export default class DrawerUndocked extends React.Component{

    constructor(props){
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        console.log(props);
        this.state = {
            open:false,
            styles: {
                backgroundColor: props.backgroundColor,
            }
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => {
        this.setState({open: false});
    }

    handleToggling(){
        this.setState({open: !this.state.open})
    }

    handleDataSwap(endpoint, name){
        this.props.changeEndpoint(endpoint, name);
    }

    handleItemClick(name, endpoint){
        this.handleToggling()
        this.handleDataSwap(name, endpoint);
    }

    render(){
        return(
            <div>
                <RaisedButton  className=" b-center" label="Choose Data Set"
                              onClick={this.handleToggle}
                              buttonStyle={{backgroundColor: this.props.backgroundColor}}
                            default={true}
                />
                <Drawer
                    docked={false}
                        width={330}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                    <MenuItem href={'https://www.portphilip.vic.gov.au'} onClick={this.handleClose}>
                        <img src={logo} alt={Str_en.COUNCIL_FULL_NAME} className="drawer_logo"/>
                    </MenuItem>
                    <Divider />
                    <Subheader>Data Sets</Subheader>

                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_BUILDINGS, Str_en.REST_BUILDINGS)}
                              primaryText={Str_en.NAME_BUILDINGS}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_GARBAGE, Str_en.REST_GARBAGE)}
                              primaryText={Str_en.NAME_GARBAGE}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_TREES, Str_en.REST_TREES)}
                              primaryText={Str_en.NAME_TREES}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_ACCESS_PARKING, Str_en.REST_ACCESS_PARKING)}
                              primaryText={Str_en.NAME_ACCESS_PARKING}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_BUS_ROUTES, Str_en.REST_BUS_ROUTES)}
                              primaryText={Str_en.NAME_BUS_ROUTES}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_BUS_STOPS, Str_en.REST_BUS_STOPS)}
                              primaryText={Str_en.NAME_BUS_STOPS}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_CAR_SHARE, Str_en.REST_CAR_SHARE)}
                              primaryText={Str_en.NAME_CAR_SHARE}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_DOG_WALKING, Str_en.REST_DOG_WALKING)}
                              primaryText={Str_en.NAME_DOG_WALKING}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_COMMUNITY_GARDENS, Str_en.REST_COMMUNITY_GARDENS)}
                              primaryText={Str_en.NAME_COMMUNITY_GARDENS}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_MATERNAL, Str_en.REST_MATERNAL)}
                              primaryText={Str_en.NAME_MATERNAL}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_SYRINGE, Str_en.REST_SYRINGE)}
                              primaryText={Str_en.NAME_SYRINGE}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_SWEEPING, Str_en.REST_SWEEPING)}
                              primaryText={Str_en.NAME_SWEEPING}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_PARKING_MACHINES, Str_en.REST_PARKING_MACHINES)}
                              primaryText={Str_en.NAME_PARKING_MACHINES}  />
                    <MenuItem leftIcon={<MapLayerIcon/>} onClick={
                        this.handleItemClick.bind(
                            this, Str_en.NAME_IMMUNISATION, Str_en.REST_IMMUNISATION)}
                              primaryText={Str_en.NAME_IMMUNISATION}  />
                    <Divider />
                    <Subheader>New Features</Subheader>
                    <MenuItemSnackbar leftIcon={<MapLayerErrorIcon/>} onClick={this.handleClose} text={"Link New Set"} message={Str_en.COMING_SOON} />

                    <Divider />
                    <Subheader>Credits</Subheader>
                    <DialogMenuItem/>
                    <MenuItem leftIcon={<PersonIcon/>}  primaryText="mewc 2018"  />
                </Drawer>
            </div>
        )
    }
}

