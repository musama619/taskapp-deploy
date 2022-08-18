import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskState from "../context/TaskState";
import CompletedTasks from "../pages/CompletedTasks";
import Tasks from "../pages/Tasks";
import { styled, useTheme } from "@mui/material/styles";

import { useState, useContext } from "react";
import TaskContext from "../context/TaskContext";
import SnackbarAlert from "./SnackbarAlert";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${240}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
        overflow: "auto",
        position: "relative",
        height: "100%",
    })
);
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));
function RoutesContent() {
    return (
        <>
            <div style={{ marginTop: "1rem" }}>
                <TaskState>
                    <SnackbarAlert />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Tasks />} />
                        <Route
                            path="/completed-tasks"
                            element={<CompletedTasks />}
                        />
                    </Routes>
                </TaskState>
            </div>
        </>
    );
}

export default RoutesContent;
