import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, HelpOutline, LocationOn } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        // width: 500,
    },
});

export default function SimpleBottomNavigation(props) {
    const classes = useStyles();
    const { tab, setTab } = props

    return (
        <BottomNavigation
            value={tab}
            onChange={(event, newValue) => {
                setTab(newValue)
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Home" icon={<Home />} />
            <BottomNavigationAction label="Map" icon={<LocationOn />} />
            <BottomNavigationAction label="Help" icon={<HelpOutline />} />
        </BottomNavigation>
    );
}