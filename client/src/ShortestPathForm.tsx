import {
    makeStyles,
    Theme,
    createStyles, FormControl, Select, InputLabel
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Form} from "./Form";
import MenuItem from '@material-ui/core/MenuItem';
import {City} from "./RoadForm";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface Result {
    name?: string,
    cost?: number
}

export const ShortestPathForm = ()=>{

    const [startCity, setStartCity] = useState('');
    const [endCity, setEndCity] = useState('');
    const [data, setData] = useState<City[]>([{}]);
    const [result, setResult] = useState<Result[]>([])

    useEffect(()=>{
        getData().then();
    }, [])

    const getData = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/City');
        setData( await response.json() as City[]);
    }

    const classes = useStyles();
    const startCityLabel = 'Miasto początkowe', endCityLabel = "Miasto końcowe";

    const table = ( result: Result[]) => result.length > 1 ?
        <TableContainer className={classes.TableContainer} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Miasto</TableCell>
                        <TableCell align="right">Czas dojazdu (h)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        : ''

    return<div>
        <Form url={process.env.REACT_APP_API_URL + '/ShortestPath'}
                     body={JSON.stringify({startCity: startCity, endCity: endCity })}
                     getResponse={(data) =>{setResult(data as Result[])}}
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
                    {data.map((d)=> <MenuItem key={d.guid + '1'} value={d.guid}>{d.name}</MenuItem> )}
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
                    {data.filter(value => value.guid !== startCity).map((d)=> <MenuItem key={d.guid + '1'} value={d.guid}>{d.name}</MenuItem> )}
                </Select>
            </FormControl>
        </Form>
        {table(result)}
    </div>
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
        TableContainer:{
            marginTop: theme.spacing(4)
        }
    }),
);