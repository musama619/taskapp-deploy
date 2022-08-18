import { Menu, MenuItem } from "@mui/material";
import { DeleteTask } from "../api/Task_API";
import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";

const TaskMenu = (props) => {
    const options = ["Edit", "Delete"];
    const taskCont = useContext(TaskContext);

    const deleteTask = async () => {
        try {
            await DeleteTask(props.id);
            taskCont.setState(true)
            taskCont.setShowSnackbar(true)
            taskCont.setSnackbarMsg("Task Deleted")


        } catch (error) {
            console.log(error);
        }
    };

    const handleMenuItemclick = (event) => {
        var itemClicked = event.target.innerText;
        props.handleClose();

        if (itemClicked == "Delete") {
            deleteTask();
        }

        if(itemClicked == "Edit"){
            props.setIsEditing(true)
        }
    };
    return (
        <Menu
            id="long-menu"
            MenuListProps={{
                "aria-labelledby": "long-button",
            }}
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.handleClose}
        >
            {options.map((option) => (
                <MenuItem key={option} onClick={handleMenuItemclick}>
                    {option}
                </MenuItem>
            ))}
        </Menu>
    );
};
export default TaskMenu;
