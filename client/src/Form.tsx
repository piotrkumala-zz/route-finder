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


export const Form = (props: {url: string, body: string, children: any;})=>{

    const [open, setOpen] = useState(false);
    const [operationOpen, setOperationOpen] = useState(false);
    const [operationSuccess, setOperationSuccess] = useState(true);
    const [operationMessage, setOperationMessage] = useState('Operacja udana');

    const classes = useStyles(), rootStyle: CSSProperties = {display: 'flex', flexDirection: 'column'};

    const post =async () => {
        try {
            setOpen(true);
            const config = {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: props.body
            }
            const response = await fetch(props.url, config)
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
                {props.children}
                <Button variant="contained" color="primary" onClick={() => post()}>
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