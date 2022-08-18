import React, { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import Snackbar from "@mui/material/Snackbar";
const SnackbarAlert = () => {
    const [open, setOpen] = React.useState(false);
    const taskCont = useContext(TaskContext);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        taskCont.setShowSnackbar(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={taskCont.showSnackbar}
            autoHideDuration={3000}
            onClose={handleClose}
            message={taskCont.snackbarMsg}
        />
    );
};

export default SnackbarAlert;
