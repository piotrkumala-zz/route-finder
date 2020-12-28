import {
    TextField,
    Button,
    Backdrop,
    CircularProgress,
    makeStyles,
    Theme,
    createStyles,
    Snackbar
} from "@material-ui/core";
import {CSSProperties, useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;


export const CityForm = ()=>{

    const [open, setOpen] = useState(false);
    const [operationOpen, setOperationOpen] = useState(false);
    const [operationSuccess, setOperationSuccess] = useState(true);
    const [operationMessage, setOperationMessage] = useState('Operacja udana');
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const classes = useStyles(), nameLabel = 'Nazwa miasta', longitudeLabel = 'Długość geograficzna',
        latitudeLabel = 'Szerokość georgraficzna', buttonStyle:CSSProperties = {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px'
        }, rootStyle: CSSProperties = {display: 'flex', flexDirection: 'column'};

    const addCity =async () => {
        try {
            setOpen(true);
            const config = {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: name, latitude: latitude, longitude: longitude})
            }
            const response = await fetch("https://localhost:5001/City", config)
            if (response.ok) {
                setOpen(false);
                setOperationOpen(true);
                setOperationSuccess(true);
                setOperationMessage('Operacja udana');
            } else {
                setOpen(false);
                setOperationOpen(true);
                setOperationSuccess(false);
                setOperationMessage('Operacja nieudana');
            }
        } catch (error) {

        }
    }

    const handleClose = () => {
        setOperationOpen(false);
    }


    return (
        <form autoComplete="off" style={rootStyle}>
            <div>
                <TextField id="name"
                           label={nameLabel}
                           required={true}
                           value={name}
                           onChange={event => setName(event.target.value)}
                />
            </div>
            <div>
                <TextField id="longitude"
                           label={longitudeLabel}
                           type={'number'}
                           required={true}
                           value={latitude}
                           onChange={event => setLatitude((event.target as any).valueAsNumber)}
                />
            </div>
            <div>
                <TextField id="latitude"
                           label={latitudeLabel}
                           type={'number'}
                           required={true}
                           value={longitude}
                           onChange={event => setLongitude((event.target as any).valueAsNumber)}
                />
            </div>
            <div style={buttonStyle}>
                <Button variant="contained" color="primary" onClick={() => addCity()}>
                    Zapisz
                </Button>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    open={operationOpen}
                    autoHideDuration={600}
                    onClose={handleClose}>
                        <Alert severity={operationSuccess ? 'success' : 'error'}>{operationMessage}
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Alert>

                </Snackbar>
            </div>

        </form>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);