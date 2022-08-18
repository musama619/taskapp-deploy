import { useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RoutesContent from "./RoutesContent";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import AddTask from "@mui/icons-material/AddTask";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "../context/AuthContext";

const drawerWidth = 240;

const menuItems = [
    {
        label: "Tasks",
        path: "/",
        key: "tasks",
        icon: <PlaylistAdd className="text-sky-700" />,
    },
    {
        label: "Completed",
        path: "/completed-tasks",
        key: "completed",
        icon: <AddTask className="text-green-700" />,
    },
];
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const { logout } = useLogout();
    const { user } = useContext(AuthContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box sx={{ flexgrow: 1 }}>
                <AppBar
                    position="fixed"
                    open={user ? open : false}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    className="bg-red-700"
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            TASKER
                        </Typography>
                        <div style={{ flex: "1 1 auto" }}></div>
                        {user ? (
                            <Button color="inherit" onClick={() => logout()}>
                                Logout
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                color="inherit"
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <div>
            {!user ? <></> : 
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            backgroundColor: "#fafafa",
                            border: "none",
                        },
                        overflow: "auto",
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map((menu, index) => (
                            <ListItem
                                key={menu.key}
                                disablePadding
                                component={Link}
                                to={menu.path}
                            >
                                <ListItemButton>
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText
                                        className="text-orange-700"
                                        primary={menu.label}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            }
            </div>

            <Main open={open}>
                <DrawerHeader />
                <RoutesContent />
            </Main>
        </Box>
    );
}
