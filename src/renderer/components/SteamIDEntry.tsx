import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {useEffect, useState} from 'react';

const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: '0 100px 0 100px',
        height: '100px',
        marginTop: '50px'
    },
    idInput: {
        width: '100%'
    }
});

export const SteamIDEntry = () => {
    const classes = useStyles();

    const [steamID, setSteamID] = useState('');
    const [steamIDValid, setSteamIDValid] = useState(true)

    const submitHandler = (event) => {
        alert(`SteamID that was submitted: ${steamID}`);
        console.log(event);
        event.preventDefault();
    };

    const changeHandler = (event) => {
        setSteamID(event.target.value);
        if (!steamID.includes('https://steamcommunity.com/id/') && !steamID.includes('https://steamcommunity.com/profiles/')) {
            setSteamIDValid(false);
        } else {
            setSteamIDValid(true);
        }
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
            <FormControl fullWidth>
                <TextField className={classes.idInput} error={!steamIDValid} id="standard-basic" label="SteamID" value={steamID} onChange={changeHandler}/>
            </FormControl>
        </form>
    );
};
