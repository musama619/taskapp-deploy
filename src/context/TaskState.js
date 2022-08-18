import { useState } from "react";
import TaskContext from "./TaskContext";

const TaskState = (props) => {
    const [state, setState] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    return (
        <TaskContext.Provider
            value={{
                state,
                setState,
                isSideBarOpen,
                setIsSideBarOpen,
                showSnackbar,
                setShowSnackbar,
                snackbarMsg,
                setSnackbarMsg
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskState;
