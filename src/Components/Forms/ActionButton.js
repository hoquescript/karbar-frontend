import React from "react";
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

const viewHandler = ({ text, chipData, gridData, handleSubmit, setGridView }) => {
    setGridView(true);
    // gridData.ControlSQl
}

const MenuButton = (props) => {
    const btnHandler = data => {
        switch (props.text) {
            case "Post":
                return '#16a085'
            case "Journal":
                return '#9b59b6'
            case "Print":
                return '#f39c12'
            case "Help":
                return '#c44569'
            case "View":
                viewHandler(props,data);
                break;
            case "Add":
                return '#706fd3'
            case "Delete":
                return '#e17055'
            default:
                return '#e17055'
        }    
    };
    return (
        <Button variant="contained" style={{ ...style, backgroundColor: btnColorGenarator(props.text)}} onClick={props.handleSubmit(btnHandler)}>
            {props.text}
        </Button>
    );
};

const ActionButton = ({ controls, handleSubmit, chipData, gridData, setGridView }) => {
    const menuButton =
        controls.length > 0 ? controls[0].MenuButton.split("~") : null;
    const buttons = menuButton
        ? menuButton.map(btn => <MenuButton key={btn} text={btn} chipData={chipData} gridData={gridData} setGridView={setGridView} handleSubmit={handleSubmit}/>)
        : null;
    return <div>{buttons}</div>;
};

export default ActionButton;
