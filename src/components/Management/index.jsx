import { Route, Routes, useNavigate, Navigate, redirect, BrowserRouter, useLocation, } from 'react-router-dom'
import Edits from './Edits'
import New from './New'
import Accounts from './Accounts'
import ManageClass from './ManageClass'
import GetSuggestionsAndReply from './GetSuggestionsAndReply/GetSuggestionsAndReply'
import ApproveQuestions from './ApproveQuestions/ApproveQuestions'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const drawerWidth = 240;

export default function Management(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const setToken = (event) => {
        console.log(event);
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        <Button variant="contained" onClick={handleClickOpen} >Set Token</Button>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {[{ name: 'Edit the questions', path: "/manage/edit" }, { name: "Add new Questions", path: "/manage/new" }, { name: "Accounts", path: "/manage/account" }, { name: "Classes", path: "/manage/classes" }, { name: "Approve Questions", path: "/manage/approve_questions" }, { name: "Get Suggestions And Reply", path: "/manage/get_suggestions_and_reply" }].map((item, index) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton onClick={() => { navigate(item.path) }}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {/* <List>
                    {['All mail'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: "10%", marginTop: "10%" }}
            >
                <Routes>
                    <Route path="edit" element={<Edits></Edits>}></Route>
                    <Route path="new" element={<New></New>}></Route>
                    <Route path="account" element={<Accounts></Accounts>}></Route>
                    <Route path="classes" element={<ManageClass></ManageClass>}> </Route>
                    <Route path="approve_questions" element={<ApproveQuestions></ApproveQuestions>}> </Route>
                    <Route path="get_suggestions_and_reply" element={<GetSuggestionsAndReply></GetSuggestionsAndReply>}></Route>

                </Routes>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const token = formJson.token;
                        console.log(token);
                        localStorage.setItem('token', token);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Input A Valid Token</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Manipulate the information, please input a valid token.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="token"
                        label="token"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type='submit' onSubmit={setToken}> Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

}