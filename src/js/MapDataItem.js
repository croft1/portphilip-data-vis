import React, {Component} from 'react';
import {Marker, Polygon, Polyline, InfoWindow} from 'react-google-maps'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import * as Str_en from './Strings_en';
import MTP from 'material-ui/styles/MuiThemeProvider';

//data
class MapDataItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowOpen: false,
        };
        this.handleToggleWindow.bind(this);
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props.mkr);
        return this.genItemForData(this.props.mkr);
    }

    handleToggleWindow = () => {
        console.log(this.props);
        this.setState({
                windowOpen: !this.state.windowOpen,
            },
            () => {
                if (this.state.windowOpen === true) {
                    this.props.mapCallback(this.props.itemID);
                }
                else {
                    this.props.mapCallback(null);
                }
            });
    };

    hideWindow = () => {
        console.log(this.props);
        this.setState({
            windowOpen: false,
        }, () => {
        });
    };

    extractProperties(p) {

        var properties = Object.keys(p).map((key, index) => {
            return <p key={index}>{key}: {p[key]}</p>;
        });
        return properties
    }

    genItemForData(mkr) {

        //for 1 [] deep
        if (mkr.geometry.type.localeCompare("Point") === 0) {

            var iconSymbol = {
                path: this.props.mkrIcon,
                strokeWeight: 0,
                fillColor: this.props.styleColor,
                fillOpacity: 1
            };

            return <Marker
                position={this.getPosition(mkr.geometry.coordinates)}
                clickable
                options={{strokeColor: this.props.styleColor}}
                onClick={() => this.handleToggleWindow()}
                icon={
                    // url: DotIcon,
                    iconSymbol
                }
            >
                {this.state.windowOpen &&
                <InfoWindow
                    onCloseClick={() => this.handleToggleWindow()}
                    zIndex={1}
                    defaultZIndex={1}
                    position={this.getPosition(mkr.geometry.coordinates)}
                >
                    <div>
                        <MTP>
                            <div>
                                <InfoIcon/>
                            </div>
                        </MTP>
                        {this.extractProperties(mkr.properties)}

                    </div>
                </InfoWindow>}
            </Marker>
        }

        //for 2 [[]] deep
        if (mkr.geometry.type.localeCompare("LineString") === 0
            || mkr.geometry.type.localeCompare("Polyline") === 0) {
            var line = <Polyline
                path={this.getLine(mkr.geometry.coordinates)}
                options={{
                    strokeColor: this.props.styleColor,
                    strokeOpacity: 1,
                    strokeWeight: 8
                }}
                label={Str_en.COUNCIL_FULL_NAME}

            />
            return line;
        }

        // for 3 [[[][][]]] deep, need to generate multiple lines for single data set
        if (mkr.geometry.type.localeCompare("MultiLineString") === 0) {
            return this.getPolyLines(mkr); //many <PolyLine/> generated from within;
        }


        //for 4 deep [[[[]]]]
        if (mkr.geometry.type.localeCompare("Polygon") === 0 || mkr.geometry.type.localeCompare("MultiPolygon") === 0) {
            var poly = <Polygon
                path={this.getPolygonCoords(mkr.geometry.coordinates)}  //probably need to do an extra layer of processing
                label={Str_en.COUNCIL_FULL_NAME}
                clickable
                options={{
                    strokeColor: this.props.styleColor,
                    strokeOpacity: 1,
                    strokeWeight: 3
                }}
            />;
            return poly;
        }
    }

    getPolyLines(mkr) {
        var lines = [];
        var coordinates = mkr.geometry.coordinates;
        for (var i = 0; i < coordinates.length; i++) {
            lines.push(<Polyline
                    path={this.getLine(coordinates[i])}
                    options={{
                        strokeColor: this.props.styleColor,
                        strokeOpacity: 1,
                        strokeWeight: 4
                    }}
                    key={mkr.id + i}
                    label={Str_en.COUNCIL_FULL_NAME}
                />
            );
        }
        return lines;
    }

    getPolygonCoords(coordinates) {
        var lines = [];
        for (var i = 0; i < coordinates.length; i++) {

            if(coordinates.length === 1){
                //there is surely a way to get this to work with getLIne().  ugh
                var poly = coordinates[i];
                for (var j = 0; j < poly.length; j++) {
                    lines.push(
                        this.getPosition(poly[j])
                    );
                }
                return lines;
            }else{
                lines.push(
                    this.getLine(coordinates[i][0])
                );
                return lines[0];
            }
            console.log(lines)
        }
    }

    getLine(coordinates) {
        var positions = [];
        for (var point = 0; point < coordinates.length; point++) { //weirdly doesnt get array, point just iterates. tried .map too
            positions.push(
                this.getPosition(coordinates[point])
            );
        }
        return positions;
    }

    getPosition(coords) {
        return {lat: this.getLat(coords), lng: this.getLng(coords)};
    }

    getLat(coords) {
        return coords[1];
    }

    getLng(coords) {
        return coords[0];
    }


}

export default MapDataItem;



