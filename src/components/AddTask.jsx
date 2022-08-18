import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { PostTask } from "../api/Task_API";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const AddTask = () => {
    const [showTextbox, setShowText] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(null);

    const taskCont = useContext(TaskContext);
    const addTask = async () => {
        const task = {
            title: title,
            description: description,
            dueDate: dueDate,
            isComplete: false,
        };
        console.log(task);
        try {
            await PostTask(task);
            taskCont.setState(true);
            setShowText(false);
            taskCont.setShowSnackbar(true);
            taskCont.setSnackbarMsg("Task Added");

            setTitle("");
            setDescription("");
            setDueDate(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <button
                className=" hover:text-red-700 bg-white border-none cursor-pointer	font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() => setShowText(!showTextbox)}
                style={{ display: showTextbox ? "none" : "inline-flex" }}
            >
                <Add />
                <span>Add Task</span>
            </button>
            <div
                className="outline outline-1 outline-gray-400 mt-4 p-8 rounded-lg"
                style={{
                    display: showTextbox ? "block" : "none",
                }}
            >
                <input
                    id="title"
                    value={title}
                    placeholder="e.g., Deploy to production, fix issue"
                    className=" border-none outline-none min-w-full min-h-full text-lg font-bold"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    id="description"
                    value={description}
                    placeholder="Description"
                    className=" border-none outline-none min-w-full min-h-full mt-5 text-base"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <DateTimePicker
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            style={{
                                marginTop: "1rem",
                                border: "none",
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
                        setDueDate(newValue);
                    }}
                />
                {/* <input
                    type="datetime-local"
                    id="birthdaytime"
                    name="birthdaytime"
                    className="border-none outline-none mt-5 text-base"
                    onChange={(newValue) => {
                        setDueDate(newValue.target.value);
                    }}
                /> */}
                <Button
                    size="small"
                    variant="contained"
                    className="bg-red-700"
                    style={{
                        float: "right",
                        marginTop: "2rem",
                        marginLeft: "0.5rem",
                    }}
                    onClick={addTask}
                >
                    Add Task
                </Button>
                <Button
                    style={{ float: "right", marginTop: "2rem" }}
                    variant="outlined"
                    size="small"
                    onClick={() => setShowText(!showTextbox)}
                >
                    Cancel
                </Button>
            </div>
        </>
    );
};

export default AddTask;
