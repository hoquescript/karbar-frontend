import React from "react";
import { isFuture, compareAsc } from 'date-fns'
import { useSelector, useDispatch } from "react-redux";
import { postFormData, viewReportData } from "../../../../Store/Actions/forms";
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
    console.log(data,chipData, gridControlData)
    if(data && data.dtpVDate && isFuture(data.dtpVDate)){
        alert('Future Date');
    }
    if(gridControlData.length > 0  && +gridControlData[0].decDebit > -1 && +gridControlData[0].decCredit > -1){
        let totalDebit = 0, totalCredit = 0;
        gridControlData.forEach(({decDebit, decCredit}) => {
            totalDebit += +decDebit
            totalCredit += +decCredit
        })
        if(totalDebit !== totalCredit) 
            alert('Total Debit & Credit Should be Same')
    }else{
        dispatch(postFormData(data, chipData, gridControlData))
    }    
}

const viewHandler = (dispatch, data, gridSQL, chipData) => {
    if(data && data.dtpFrom && data.dtpTo && compareAsc(data.dtpTo, data.dtpFrom) === -1){
        alert('To date is before from date')
    }else if(chipData.length === 0){
        alert('You must select atleast one node from Tree')
    }else{
        dispatch(viewReportData(gridSQL, data, chipData))
    }
}


const MenuButton = ({ type, gridSQL }) => {
    const dispatch = useDispatch();
    const chipData = useSelector(state => state.forms.chipData).map(chip => chip.key)
    const gridControlData = useSelector(state => state.forms.gridControlData)
    const { handleSubmit } = useFormContext() 
    const btnHandler = data => {
        switch (type) {
            case "Post":
            // Insert in Voucher Table
            postHandler(dispatch, data, chipData, gridControlData);
            return;
            // Print + Previeww Report
            case "Journal":
            return '#9b59b6'
                //Insert in COA Table
                case "Save":
                return '#9b59b6'
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

const ActionButton = ({ menuButton, gridSQL }) => {
    console.log(menuButton)
    const buttons = menuButton && menuButton.map(btnType => <MenuButton key={btnType} type={btnType} gridSQL={gridSQL}/>);
    return <div>{buttons}</div>;
};

export default ActionButton;
