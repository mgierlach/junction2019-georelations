import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: '10px',
    },
    selectTime: {
        flexDirection: 'row'
    }
}));

export default function RadioButtonsGroup({ valueTime, setValueTime }) {
    const classes = useStyles();

    const handleChange = event => {
        setValueTime(event.target.value);
    };

    return (
        <>
            <FormControl component="fieldset" className={classes.formControl}>
                {/* <FormLabel component="legend">Time</FormLabel> */}
                <RadioGroup aria-label="gender" className={classes.selectTime} value={valueTime} onChange={handleChange}>
                    <FormControlLabel value="m" control={<Radio />} label="Morning" />
                    <FormControlLabel value="d" control={<Radio />} label="Day" />
                    <FormControlLabel value="e" control={<Radio />} label="Evening" />
                    <FormControlLabel value="n" control={<Radio />} label="Midnight" />

                </RadioGroup>
            </FormControl>

        </>
    );
}