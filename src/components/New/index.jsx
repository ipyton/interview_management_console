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
import IndustryTree from '../IndustryTree';


const SelectedContext = createContext({
    classSelected: null,
});

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});




export default function New() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        details: '',
        author_id: '',
        author_name: '',
        avatar: '',
    });

    const [selected, setSelected] = useState()



    // 处理表单输入变化
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 表单提交处理
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const handleUploadFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];

        formData.append('file', file); // 这里的 'file' 是字段名

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('File upload error:', error);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Create a Question
            </Typography>

            <IndustryTree selected={selected} setSelected={setSelected}></IndustryTree>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
            />

            <TextField
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />

            <TextField
                label="Author ID"
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
            />

            <TextField
                label="Author Name"
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {/* 显示头像 */}
            {formData.avatar && (
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                    <Avatar src={formData.avatar} alt="Avatar" sx={{ mr: 2 }} />
                    <Typography variant="subtitle1">{formData.author_name}</Typography>
                </Box>
            )}

            <Button type="submit" variant="contained" color="primary" >
                Submit
            </Button>
            <Divider></Divider>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload Json File
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleUploadFile}
                    multiple
                />
            </Button>
            <Paper>The file should be js format and with an array of question object like this:
                {JSON.stringify([{
                    "question": "集群、分布式、SOA、微服务的概念分别是什么？",
                    "answer": "集群指同一种组件的多个实例，形成的逻辑上的整体。单个节点可以提供完整服务。分布式是服务的不同模块部署在不同的服务器上，单个节点不能提供完整服务，需要多节点协调提供服务。SOA是面向服务的架构，一种设计方法，其中包含多个服务，服务之间通过相互依赖最终提供一系列的功能。微服务是在SOA上做的升华，原有的单个业务系统会拆分为多个可以独立开发、设计、运行的小应用，这些小应用之间通过服务完成交互和集成，服务单一职责，采用restapi通信。",
                    "tags": ["分布式系统", "设计模式"]
                }])}
            </Paper>
        </Box>
    )
}