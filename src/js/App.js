import React, {Component} from 'react';
import '../css/App.css';
import Map from './Map';
import MTP from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import RaisedButton from 'material-ui/RaisedButton';
import Axios from 'axios';
import AppBar from './AppBar';
import FlatLinkButton from './FlatLinkButton';
import * as Str_en from './Strings_en';

import AubergineStyle from '../map_styles/AUBERGINE_CUSTOM_STYLE';
import DarkStyle from '../map_styles/DARK_CUSTOM_STYLE';
import NightStyle from '../map_styles/NIGHT_CUSTOM_STYLE';
import RetroStyle from '../map_styles/RETRO_CUSTOM_STYLE';
import SilverStyle from '../map_styles/SILVER_CUSTOM_STYLE';
import StdStyle from '../map_styles/STD_CUSTOM_STYLE';

import StyleIcon from 'material-ui/svg-icons/image/style';

const DATA_COUNT_LIMIT = 5000; //will die at 15000 points

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentEndpoint: Str_en.REST_BUILDINGS,
            currentLayerName: Str_en.NAME_BUILDINGS,
            data: [],
            mapStyle: RetroStyle,
            mapItemColor: "RoyalBlue",
            dataRestricted: {
                is: false,
                limit: DATA_COUNT_LIMIT,
                fullCount: 0
            }
        };
        this.fetchData(this.state.currentEndpoint);
        document.title = "Port Philip Data Visualiser " + this.state.currentLayerName;

    }

    componentWillMount() {
        // this.setState({data: this.fetchTestData()});
    }

    componentDidMount() {
    }

    changeDataSet = (name, endpoint) => {
        console.log(this.state.currentLayerName);
        this.setState({
                currentEndpoint: endpoint,
                currentLayerName: name,
            },
            () => {
                this.fetchData(this.state.currentEndpoint)
                console.log(this.state.currentLayerName);
                document.title = "Port Philip Data Visualiser " + this.state.currentLayerName;
            }); //callback

    }

    handleStyleSwitch = (style, itemColor) => {
        this.setState({
            mapStyle: style,
            mapItemColor: itemColor
        })
    }

    render() {
        return (
            <div className="App">
                <MTP >
                    <AppBar
                        title={this.state.currentLayerName}
                        changeEndpoint={this.changeDataSet}
                        backgroundColor={this.state.mapItemColor}
                        dataRestricted={this.state.dataRestricted}
                    />
                </MTP>
                <Map
                    isLayerShown
                    visible
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDEHhw8Prc-TJfTeEFHfuNGw7eEMYGm-6Y"
                    loadingElement={<div className="map-loading-element"/>}
                    containerElement={<div className="map-container-element"/>}
                    mapElement={<div className="map-element"/>}
                    mkrs={this.state.data}
                    layerName={this.state.currentLayerName}
                    mapStyle={this.state.mapStyle}
                    mapItemColor={this.state.mapItemColor}
                />

                <footer>
                    <MTP muiTheme={getMuiTheme(darkBaseTheme)}>
                        <span>
                            <StyleIcon className="footerIcon"/>
                            <RaisedButton onClick={
                                this.handleStyleSwitch.bind(
                                    this, StdStyle, "Sienna")
                            } label={Str_en.MAP_STYLE_NAME_STD}/>
                            <RaisedButton onClick={
                                this.handleStyleSwitch.bind(
                                    this, RetroStyle, "Maroon")
                            } label={Str_en.MAP_STYLE_NAME_RETRO}/>
                            <RaisedButton onClick={
                                this.handleStyleSwitch.bind(
                                    this, NightStyle, "LightSeaGreen")
                            } label={Str_en.MAP_STYLE_NAME_NIGHT}/>
                            <RaisedButton onClick={
                                this.handleStyleSwitch.bind(
                                    this, DarkStyle, "Gainsboro")
                            } label={Str_en.MAP_STYLE_NAME_DARK}/>
                            <RaisedButton onClick={
                                this.handleStyleSwitch.bind(
                                    this, SilverStyle, "Black")
                            } label={Str_en.MAP_STYLE_NAME_SILVER}/>
                            <RaisedButton onClick={
                                this.handleStyleSwitch.bind(
                                    this, AubergineStyle, "YellowGreen")
                            } label={Str_en.MAP_STYLE_NAME_AUBERGINE}/>


                            <FlatLinkButton

                                label={Str_en.FOOTER_CREDIT}
                                link={Str_en.FOOTER_CREDIT_LINK}/>
                        </span>
                    </MTP>
                </footer>
            </div>
        );
    }

    fetchData(url) {
        var data = "";
        var restricted = false;
        var origLength = 0;
        Axios.get(url)
            .then(response => {
                // console.log("axiosGet success " + url);
                data = response.data.features;
                if (data.length > this.state.dataRestricted.limit) {
                    origLength = data.length;
                    var shortenedArray = data.splice(0, this.state.dataRestricted.limit);
                    console.log("Data length restricted (" + shortenedArray.length + "/" + origLength + "): full dataSet too large so it's been restricted");
                    data = shortenedArray;
                    restricted = true;

                } else {
                    console.log("Total data size:" + data.length);
                    restricted = false;
                }
                this.setState({
                    data: data,
                    dataRestricted: {
                        is: restricted,
                        fullCount: origLength,
                        limit: DATA_COUNT_LIMIT
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchTestData() {
        return [
            {
                "type": "Feature",
                "id": "ckan_dfcd7012_576e_40ab_825b_67d5140a4e63.1",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        144.25372566,
                        -36.72930663
                    ]
                },
                "geometry_name": "geom",
                "properties": {
                    "assetid": 49010,
                    "playground": "Truscott Reserve - Playground",
                    "hierarchy": "District",
                    "house_no": "5",
                    "st_name": "Murdock Street",
                    "suburb": "California Gully",
                    "photo_link": null
                }
            },
            {
                "type": "Feature",
                "id": "ckan_dfcd7012_576e_40ab_825b_67d5140a4e63.2",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        144.25178598,
                        -36.73540441
                    ]
                },
                "geometry_name": "geom",
                "properties": {
                    "assetid": 49012,
                    "playground": "Rose/Barker Streets Playground",
                    "hierarchy": "Local",
                    "house_no": "18",
                    "st_name": "Rose Street",
                    "suburb": "California Gully",
                    "photo_link": null
                }
            },
            {
                "type": "Feature",
                "id": "ckan_dfcd7012_576e_40ab_825b_67d5140a4e63.3",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[
                        144.22178598,
                        -36.71540441
                    ], [
                        144.29178598,
                        -36.79540441
                    ]]
                },
                "geometry_name": "geom",
                "properties": {
                    "assetid": 49012,
                    "playground": "Rose/Barker Streets Playground",
                    "hierarchy": "Local",
                    "house_no": "18",
                    "st_name": "Rose Street",
                    "suburb": "California Gully",
                    "photo_link": null
                }
            },
            {
                "type": "Feature",
                "id": "ckan_1a478d6e_fddd_4d00_a61a_c2d196562db0.2",
                "geometry": {
                    "type": "MultiLineString",
                    "coordinates": [
                        [
                            [144.22767241, -36.79921016], [144.22811943, -36.7991468], [144.22818955, -36.79913699]],
                        [[144.22767241, -36.79921016], [144.22767225, -36.79920953]],
                        [[144.22767906, -36.79924122], [144.22767241, -36.79921016]],
                        [[144.22767241, -36.79921016], [144.22762105, -36.79921743]]
                    ]
                },
                "geometry_name": "geom",
                "properties": {
                    "assetid": 676199,
                    "desc": "Ashbourne Way, Kangaroo Flat - Eldridge Court to Wesley Street : Concrete Footpath Standard",
                    "type": "Concrete Footpath Standard",
                    "length": 0,
                    "width": 1.5,
                    "plan": "GB3756"
                }
            },
            {
                "type": "Feature",
                "id": "ckan_c2f141ec_a3ac_4b42_a397_ba5ed0c5da46.1", "geometry":
                    {
                        "type": "MultiPolygon",
                        "coordinates":
                            [[[[144.22165923, -36.71676509], [144.22237894, -36.71734845], [144.22293072, -36.71682857], [144.22316567, -36.71660718], [144.22385398, -36.7170706], [144.22439202, -36.7165704], [144.22495947, -36.71604286], [144.22530411, -36.71627669], [144.22680285, -36.71845421], [144.22701891, -36.71876802], [144.22747805, -36.71912687], [144.22753772, -36.71929504], [144.22757017, -36.71953231], [144.22767512, -36.7198301], [144.22770409, -36.71991511], [144.22839206, -36.72078511], [144.22868976, -36.72103406], [144.22981084, -36.72197135], [144.23208646, -36.72161852], [144.23213454, -36.72149539], [144.23450497, -36.72192373], [144.23471386, -36.72243855], [144.23552094, -36.72234802], [144.23610233, -36.72228278], [144.23615515, -36.72258873], [144.2362221, -36.72297663], [144.23640289, -36.72345936], [144.23566074, -36.72361807], [144.23560003, -36.72344241], [144.23516414, -36.72352986], [144.23517205, -36.72355374], [144.2355134, -36.72458881], [144.23585995, -36.72451118], [144.23606008, -36.72446754], [144.23632735, -36.72525708], [144.23708172, -36.72510035], [144.23755459, -36.72500123], [144.23775598, -36.72570797], [144.23796371, -36.72563008], [144.23801574, -36.72573905], [144.23756795, -36.72603472], [144.23716597, -36.72667969], [144.23677674, -36.7278906], [144.23640365, -36.72852245], [144.23585714, -36.72905774], [144.23513925, -36.72946506], [144.23429113, -36.72970934], [144.23049471, -36.73022619], [144.23005167, -36.73027507], [144.2260395, -36.73150097], [144.22385563, -36.73305478], [144.21556392, -36.73926971], [144.20850077, -36.73883346], [144.20342672, -36.73865937], [144.19887076, -36.73931248], [144.19930577, -36.74103281], [144.19883146, -36.74110408], [144.19853373, -36.74073991], [144.19824842, -36.74048388], [144.19784627, -36.74022907], [144.19441501, -36.73837348], [144.19419785, -36.73866019], [144.18875772, -36.73581361], [144.18828829, -36.7356834], [144.18763214, -36.73533452], [144.18803273, -36.73490205], [144.18853603, -36.73209764], [144.19015647, -36.7322837], [144.19058014, -36.73013891], [144.1924697, -36.73035688], [144.1926821, -36.729197], [144.19770831, -36.72840662], [144.19771809, -36.72835099], [144.19919689, -36.72809958], [144.19918182, -36.72773441], [144.19942577, -36.72776349], [144.19955225, -36.7276616], [144.19953826, -36.72671811], [144.20011531, -36.7259964], [144.20012079, -36.72531465], [144.1993885, -36.72418865], [144.20018651, -36.72351557], [144.19991619, -36.72297302], [144.20207748, -36.72322832], [144.20230104, -36.72200292], [144.2034056, -36.72213512], [144.2041304, -36.7181349], [144.20452567, -36.71785677], [144.20808774, -36.71825434], [144.20759752, -36.72109277], [144.2071367, -36.72360537], [144.20356037, -36.7231895], [144.20286539, -36.72702949], [144.20440678, -36.72657857], [144.20598249, -36.7260486], [144.20713641, -36.72561295], [144.20804541, -36.7252411], [144.21409149, -36.7225188], [144.21397675, -36.72235771], [144.21544938, -36.72169267], [144.21585073, -36.7217772], [144.21810974, -36.72117513], [144.21808815, -36.72071169], [144.21839332, -36.72057368], [144.21805899, -36.72008761], [144.21800097, -36.71884324], [144.22165923, -36.71676509]]]]
                    }
            }
        ];
    }

}

export default App;
