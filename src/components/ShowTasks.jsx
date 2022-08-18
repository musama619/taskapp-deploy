import { useEffect, useState, useContext } from "react";
import { GetActiveTasks, GetAllCompletedTasks } from "../api/Task_API";
import Task from "./Task";
import TaskContext from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
const ShowTasks = (props) => {
    const [tasks, settasks] = useState([]);
    const taskCont = useContext(TaskContext);

    const { user } = useContext(AuthContext);
    const { setAuth } = useAuth();
    console.log(user);

    useEffect(() => {
        async function fetchActiveTasks() {
            const tasks = await GetActiveTasks(user.token);
            taskCont.setState(false);
            settasks(tasks);
        }
        async function fetchCompletedTasks() {
            const tasks = await GetAllCompletedTasks(user.token);
            taskCont.setState(false);
            settasks(tasks);
        }

        if (user) {
            setAuth(user.token)
            if (props.isComplete) {
                fetchCompletedTasks();
            } else {
                fetchActiveTasks();
            }
        }
    }, [taskCont.state, user]);

    return (
        <>
            {tasks?.map((task, idx) => (
                <Task key={task._id} task={task} index={idx} />
            ))}
        </>
    );
};

export default ShowTasks;
