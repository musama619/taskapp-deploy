import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Tasks from "./pages/Tasks";
import TaskState from "./context/TaskState";
import { AuthContextProvider } from "./context/AuthContext";
import SideBar from "./components/SideBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledEngineProvider injectFirst>
                <AuthContextProvider>
                    <TaskState>
                        <BrowserRouter>
                            <Container maxWidth="xl">
                                <SideBar />
                            </Container>
                        </BrowserRouter>
                    </TaskState>
                </AuthContextProvider>
            </StyledEngineProvider>
        </LocalizationProvider>
    );
}

export default App;
