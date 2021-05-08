import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {PlayerTile} from "./PlayerTile";
import {useEffect, useState} from "react";

const urls = [
    'https://steamcommunity.com/id/yourworsttaco/',
    'https://steamcommunity.com/id/andarlif/',
    'https://steamcommunity.com/profiles/76561198065505589/',
    'https://steamcommunity.com/id/kekkyx/',
    'https://steamcommunity.com/profiles/76561198108795706/',
    'https://steamcommunity.com/id/GinIsWoke/'
];



const useStyles = makeStyles({
    root: {

    }
});

export const PlayerGrid = () => {
    const classes = useStyles();

    const [players, setPlayers] = useState([])

    useEffect(() => {
        (async () => {
            for (const url of urls) {

            }
        })();
    });

    return (
        <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
                <Grid item>
                    <PlayerTile/>
                </Grid>
            </Grid>
        </Grid>
    );
}
