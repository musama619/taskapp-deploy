import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { PatchTask } from "../api/Task_API";
import TaskMenu from "./TaskMenu";
import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";

const Task = ({ task, index }) => {
    const [checked, setChecked] = useState(task.isComplete ? true : false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title ? task.title : "");
    const [description, setDescription] = useState(
        task.description ? task.description : ""
    );
    const [dueDate, setDueDate] = useState(new Date(task.dueDate));

    const taskCont = useContext(TaskContext);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const patchTaskComplete = async (updateTask) => {
        try {
            await PatchTask(task._id, updateTask);
            taskCont.setState(true);
            updateTask.isComplete === true
                ? taskCont.setSnackbarMsg("Marked Completed")
                : taskCont.setSnackbarMsg("Marked Active");
            taskCont.setShowSnackbar(true);
        } catch (error) {
            console.log(error);
        }
    };

    const markComplete = (e) => {
        setChecked(e.target.checked);

        const updateTask = {
            isComplete: e.target.checked,
        };

        patchTaskComplete(updateTask);
    };

    const updateTask = async () => {
        const newTask = {
            title: title,
            description: description,
            duedate: dueDate,
        };

        try {
            await PatchTask(task._id, newTask);
            taskCont.setState(true);
            setIsEditing(false);
            taskCont.setShowSnackbar(true);
            taskCont.setSnackbarMsg("Task Updated");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div key={task._id}>
            <div style={{ marginTop: "1rem" }} className="shadow-sm ">
                <CardContent>
                    {isEditing ? (
                        <>
                            <TextField
                                variant="standard"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                style={{ marginTop: "1rem" }}
                                variant="standard"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <DateTimePicker
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        style={{
                                            marginTop: "1rem",
                                        }}
                                        variant="standard"
                                    />
                                )}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                disablePast={true}
                                value={dueDate}
                                onChange={(newValue) => {
                                    console.log("newValue", newValue);
                                    setDueDate(newValue);
                                }}
                            />

                            <Button
                                variant="contained"
                                size="sm"
                                style={{
                                    float: "right",
                                    marginTop: "1rem",
                                    marginLeft: "0.5rem",
                                }}
                                onClick={updateTask}
                            >
                                Update
                            </Button>
                            <Button
                                variant="outlined"
                                size="sm"
                                style={{
                                    float: "right",
                                    marginTop: "1rem",
                                }}
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <IconButton
                                aria-label="settings"
                                onClick={handleClick}
                                style={{ float: "right" }}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Typography variant="h6">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={markComplete}
                                    className="accent-red-700 rounded-full p-7 mr-5"
                                />
                                {task.title}
                            </Typography>
                            <ul>
                                <li
                                    key={`${task._id}` + Math.random()}
                                    className="text-sm"
                                >
                                    {task.description}
                                </li>
                                <li key={`${task._id}` + Math.random()}>
                                    <DateTimePicker
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                style={{
                                                    marginTop: "1rem",
                                                    border: "none",
                                                    fontSize: "2px",
                                                }}
                                                variant="standard"
                                            />
                                        )}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        disablePast={true}
                                        readOnly={true}
                                        value={dueDate}
                                        onChange={(newValue) => {
                                            console.log(newValue);
                                            setDueDate(newValue);
                                        }}
                                    />
                                    {/* {task.dueDate} */}
                                </li>
                            </ul>
                        </>
                    )}
                </CardContent>
            </div>
            <Divider />
            <TaskMenu
                id={task._id}
                handleClose={handleClose}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                open={open}
                setIsEditing={setIsEditing}
            />
        </div>
    );
};

export default Task;
