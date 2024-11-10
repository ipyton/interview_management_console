import React, { useEffect, useState, createContext, useCallback } from 'react';
import { TextField, Button, Box, Avatar, Typography, Divider, selectClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Paper } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import axios from 'axios';

const NestedListItem = ({ item, setSelected, selected }) => {
    const [open, setOpen] = React.useState(false);
    const [child, setChild] = useState([])
    // const { classSelected, change } = useContext(SelectedContext)
    const handleSelect = () => {
        if (item.isLeaf) {
            setSelected(item.class_id)
        }
    }

    const handleClick = () => {
        axios.get("http://localhost:5050/classes/get", {
            headers: {
                'Authorization': 'Bearer czhdawang', // 设置Authorization头部
                'Content-Type': 'application/json'         // 指定数据类型
            },
            params: {
                parent_class_id: item.class_id
            }
        }).then((res) => {
            const root = res.data
            let tmp = []
            root.forEach(element => {
                tmp.push({ label: element.class_name, class_id: element.class_id, parent_class_id: element.parent_class_id, isLeaf: element.isLeaf })
            });
            setChild(tmp)
            setOpen(!open);

        })
    };

    return (
        <>
            <ListItemButton onClick={!item.isLeaf ? handleClick : handleSelect} selected={selected === item.class_id} >
                <ListItemText primary={item.label} />
                {!item.isLeaf ? (open ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {!item.isLeaf && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                        {child.map((child, index) => (
                            <NestedListItem key={index} item={child} setSelected={setSelected} selected={selected} />

                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

export default function IndustryTree({ selected, setSelected }) {
    const [treeData, setTreeData] = useState([

    ]);
    useEffect(() => {
        axios.get("http://localhost:5050/classes/get", {
            headers: {
                'Authorization': 'Bearer czhdawang', // 设置Authorization头部
                'Content-Type': 'application/json'         // 指定数据类型
            },
            params: {
                parent_class_id: -1
            }
        }).then((res) => {
            const root = res.data
            let tmp = []
            root.forEach(element => {
                tmp.push({ label: element.class_name, class_id: element.class_id, parent_class_id: element.parent_class_id, isLeaf: element.isLeaf })
            });
            setTreeData(tmp)
        })

    }, [])


    return <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
            </ListSubheader>
        }
    >
        {treeData.map((item, index) => {
            return (
                <NestedListItem key={index} item={item} setSelected={setSelected} selected={selected} />
            )
        })}
    </List>
}