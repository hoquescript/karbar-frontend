import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postFormData, viewReportData } from "../../Store/Actions/forms";
import { useFormContext } from 'react-hook-form';
import Button from '@material-ui/core/Button';

const btnColorGenarator = type => {
    switch (type) {
        case "Post":
            return '#16a085'
        case "Journal":
            return '#9b59b6'
        case "Print":
            return '#f39c12'
        case "Help":
            return '#c44569'
        case "View":
            return '#0984e3'
        case "Add":
            return '#706fd3'
        case "Delete":
            return '#e17055'
        default:
            return '#e17055'
    }
};

const style = {
    color: '#fff',
    marginLeft:10,
    fontWeight: 500,
    width: 90
}

const postHandler = (dispatch, data, chipData, gridControlData) => {
    console.log(data)
    dispatch(postFormData(data, chipData, gridControlData))
}

const viewHandler = (dispatch, data, gridSQL, chipData) => {
    console.log(2)
    dispatch(viewReportData(gridSQL, data, chipData))
}


const MenuButton = ({ type, gridSQL }) => {
    const dispatch = useDispatch();
    const chipData = useSelector(state => state.forms.chipData).map(chip => chip.key)
    const gridControlData = useSelector(state => state.forms.gridControlData)
    const { handleSubmit } = useFormContext() 
    const btnHandler = data => {
        switch (type) {
            case "Post":
                postHandler(dispatch, data, chipData, gridControlData);
                return;
            case "Journal":
                return '#9b59b6'
            case "Print":
                return '#f39c12'
            case "Help":
                return '#c44569'
            case "Add":
                return;
            case "View":
                viewHandler(dispatch, data, gridSQL, chipData);
                return;
            case "Delete":
                return '#e17055'
            default:
                return '#e17055'
        }    
    };
    return (
        <Button variant="contained" style={{ ...style, backgroundColor: btnColorGenarator(type)}} onClick={handleSubmit(btnHandler)}>
            {type}
        </Button>
    );
};

const ActionButton = ({ controls, gridSQL }) => {
    const menuButton =
        controls.length > 0 && controls[0].MenuButton && controls[0].MenuButton.split("~");
    const buttons = menuButton
        ? menuButton.map(btnType => <MenuButton key={btnType} type={btnType} gridSQL={gridSQL}/>)
        : null;
    return <div>{buttons}</div>;
};

export default ActionButton;
