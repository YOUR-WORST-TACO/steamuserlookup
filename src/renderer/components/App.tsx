import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {SteamIDEntry} from "./SteamIDEntry";
import {PlayerTile} from "./PlayerTile";
import {PlayerGrid} from "./PlayerGrid";

const useStyles = makeStyles({
    '@global': {
        body: {
            height: '100vh',
        },
        '#root': {
            height: '100%'
        }
    },
    root: {
        height: '100%',
        padding: '100px 0 0 0',
        margin: '0 auto',
        maxWidth: '900px'
    }
});

export const App = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <CssBaseline/>
            <h1>Steam Player Lookup</h1>
            <SteamIDEntry/>
            <PlayerGrid/>
        </Container>
    )
};
