import {
    TextField,
    makeStyles,
    Theme,
    createStyles, FormControl, Select, InputLabel
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Form} from "./Form";
import MenuItem from '@material-ui/core/MenuItem';

export enum RoadType {
    City= 'City',
    Countryside = 'Countryside',
    Express = 'Express',
    Highway = 'Highway'
}

export interface City {
    name?: string;
    guid?: string;
    longitude?: number;
    latitude?: number;

}

export const RoadForm = ()=>{

    const [distance, setDistance] = useState(0);
    const [type, setType] = useState(RoadType.City);
    const [startCity, setStartCity] = useState('');
    const [endCity, setEndCity] = useState('');
    const [data, setData] = useState<City[]>([{}]);

    useEffect(()=>{
        getData().then();
    }, [])

    const getData = async () => {
        const response = await fetch('https://localhost:5001/City');
        setData( await response.json() as City[]);
    }

    const classes = useStyles();
    const distanceLabel = 'Długość drogi', roadTypeLabel = 'Typ drogi', startCityLabel = 'Miasto początkowe', endCityLabel = "Miasto końcowe";

    return <Form url={"https://localhost:5001/Roads"} body={JSON.stringify({distance: distance, type: type, startCity: startCity, endCity: endCity })}>
        <FormControl className={classes.formControl}>
            <TextField id="name"
                       label={distanceLabel}
                       type={'number'}
                       required={true}
                       value={distance}
                       onChange={event => setDistance((event.target as any).valueAsNumber)}
            />
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel>
                {roadTypeLabel}
            </InputLabel>
            <Select
            id={'type'}
            value={type}
            onChange={event => {setType(event.target.value as RoadType)}}
            >
                <MenuItem value={RoadType.City}>Teren zabudowany</MenuItem>
                <MenuItem value={RoadType.Countryside}>Teren niezabudowany</MenuItem>
                <MenuItem value={RoadType.Express}>Droga ekspresowa</MenuItem>
                <MenuItem value={RoadType.Highway}>Autostrada</MenuItem>
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel>
                {startCityLabel}
            </InputLabel>
            <Select
                id={'startCity'}
                value={startCity}
                onChange={event => {setStartCity(event.target.value as string)}}
            >
                {data.map((d, idx)=> <MenuItem value={d.guid}>{d.name}</MenuItem> )}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel>
                {endCityLabel}
            </InputLabel>
            <Select
                id={'endCity'}
                value={endCity}
                onChange={event => {setEndCity(event.target.value as string)}}
            >
                {data.filter(value => value.guid !== startCity).map((d, idx)=> <MenuItem value={d.guid}>{d.name}</MenuItem> )}
            </Select>
        </FormControl>
    </Form>
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);