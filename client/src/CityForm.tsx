import {
    TextField,
    makeStyles,
    Theme,
    createStyles, FormControl
} from "@material-ui/core";
import {useState} from "react";
import {Form} from "./Form";


export const CityForm = ()=>{
    const classes = useStyles();

    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useStyles();
    const nameLabel = 'Nazwa miasta', longitudeLabel = 'Długość geograficzna', latitudeLabel = 'Szerokość georgraficzna';

    return (
        <Form url={"https://localhost:5001/City"} body={JSON.stringify({name: name, latitude: latitude, longitude: longitude})}>
            <FormControl className={classes.formControl}>
                <TextField id="name"
                           label={nameLabel}
                           required={true}
                           value={name}
                           onChange={event => setName(event.target.value)}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="longitude"
                           label={longitudeLabel}
                           type={'number'}
                           required={true}
                           value={latitude}
                           onChange={event => setLatitude((event.target as any).valueAsNumber)}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="latitude"
                           label={latitudeLabel}
                           type={'number'}
                           required={true}
                           value={longitude}
                           onChange={event => setLongitude((event.target as any).valueAsNumber)}
                />
            </FormControl>
        </Form>
    )
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