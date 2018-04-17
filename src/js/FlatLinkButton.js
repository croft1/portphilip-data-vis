import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class FlatLinkButton extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            label: props.label,
            link: props.link
        };
    }

    render(){
        return(
            <FlatButton
                className=" b-center"
                label={this.state.label}
                href={this.state.link}
            />
        )
    }
}

