import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function ManageClass(props) {
    // 表单的初始状态
    const [formData, setFormData] = useState({
        class_id: '',
        class_name: '',
        parent_class_id: '',
    });

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

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Create a Class
            </Typography>

            <TextField
                label="Class ID"
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Class Name"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />

            <TextField
                label="Parent Class ID"
                name="parent_class_id"
                value={formData.parent_class_id}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
}