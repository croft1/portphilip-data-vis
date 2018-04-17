import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Icon from 'material-ui/svg-icons/alert/warning';



const iconStyle = {
    margin: 5,
    cursor: 'pointer',
    position: 'absolute',
    right: 190,
    top: 15
}

export default class DialogBox extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            open: false,
            restrictedIcon: <Icon style={iconStyle} onClick={this.handleOpen} color="#fff"/>
        };
    }

    handleClose = () => this.setState({open: false});
    handleOpen = () => this.setState({open: true});

    getIcon(){
        return this.state.restrictedIcon
    }

    componentWillReceiveProps(nextProps){
        //for whatever reason you have to do the opposite
        if(!nextProps.isRestricted){
            this.setState({
                restrictedIcon: <div/>
            })
        }else{
            this.setState({
                restrictedIcon: <Icon style={iconStyle} onClick={this.handleOpen} color="#fff"/>
            })
        }
    }

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
                {this.getIcon()}
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    {<p>{this.props.text}</p>}
                </Dialog>
            </div>
        )
    }
}

