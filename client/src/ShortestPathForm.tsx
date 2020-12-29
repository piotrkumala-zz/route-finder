import {
    makeStyles,
    Theme,
    createStyles, FormControl, Select, InputLabel
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Form} from "./Form";
import MenuItem from '@material-ui/core/MenuItem';
import {City} from "./RoadForm";


export const ShortestPathForm = ()=>{

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
    const startCityLabel = 'Miasto początkowe', endCityLabel = "Miasto końcowe";

    return <Form url={"https://localhost:5001/ShortestPath"}
                 body={JSON.stringify({startCity: startCity, endCity: endCity })}
                 getResponse={(data) =>{console.log(data)}}
                 buttonCaption={'Szukaj'}
    >
        <FormControl className={classes.formControl} >
            <InputLabel>
                {startCityLabel}
            </InputLabel>
            <Select
                id={'startCity'}
                value={startCity}
                onChange={event => {setStartCity(event.target.value as string)}}
            >
                {data.map((d)=> <MenuItem value={d.guid}>{d.name}</MenuItem> )}
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
                {data.filter(value => value.guid !== startCity).map((d)=> <MenuItem value={d.guid}>{d.name}</MenuItem> )}
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