import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels({ stateSwitch, setStateSwitch }) {


    const handleChange = name => event => {
        setStateSwitch({ ...stateSwitch, [name]: event.target.checked });
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch checked={stateSwitch.cor} onChange={handleChange('cor')} value="cor" />
                }
                label="Relation"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={stateSwitch.flow}
                        onChange={handleChange('flow')}
                        value="flow"
                        color="primary"
                    />
                }
                label="Flow"
            />
        </FormGroup>
    );
}