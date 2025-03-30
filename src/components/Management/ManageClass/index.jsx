import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import IndustryTree from '../IndustryTree';
import axios from 'axios';

export default function ManageClass(props) {
    // 表单的初始状态
    const [formData, setFormData] = useState({
        class_name: '',
        parent_class_id: '',
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
        // 在这里可以添加提交数据到服务器的逻辑
    };
    const handleDelete = () => {
        if (!selected) return
        axios.post("https://面试分享.online:5050/classes/delete", {
            "class_id": selected},
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"), // 设置Authorization头部
                    'Content-Type': 'application/json'         // 指定数据类型
                },

            }
        ).then(response=> {
            console.log(response)
        }).catch((err) => {
            console.log(err)

        })
    }
    const handleAdd= () => {
        if (!selected) return 
        axios.post("https://面试分享.online:5050/classes/insert", {
            "class_id": -1,
            "parent_class_id": selected,
            "class_name":formData.class_name
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"), // 设置Authorization头部
                    'Content-Type': 'application/json'         // 指定数据类型
                },

            }
        ).then(response => {
            console.log(response)
        }).catch((err) => {
            console.log(err)

        })
    } 
    const handleUpdate = () => {
        if (!selected) return
        axios.post("https://面试分享.online:5050/classes/update", {
            "class_id": selected,
            "class_name": formData.class_name,
            "parent_class_id": -1
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"), // 设置Authorization头部
                    'Content-Type': 'application/json'         // 指定数据类型
                },

            }
        ).then(response => {
            console.log(response)
        }).catch((err) => {
            console.log(err)

        })
    }
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>

            <IndustryTree selected={selected} setSelected={setSelected}></IndustryTree>
            <Typography variant="h5" component="h2" gutterBottom>
                Change/Add a Class
            </Typography>
            <TextField
                label="Class ID/ ParentClassIdForAdd"
                name="class_id"
                value={selected}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
                
            />

            <TextField
                label="Class Name"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />



            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleAdd}>Add</Button>
            <Button onClick={handleUpdate}> Update</Button>

        </Box>
    );
}