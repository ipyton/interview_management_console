import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GetSuggestionsAndReply() {
    const [suggestionList, setSuggestionList] = useState([])
    const onDelete = (id) => {
        console.log(id)
        return () => {
            axios.post("https://面试分享.online:5050/feedback/delete", {
                id: id
            },{
                headers: { Authorization: "Bearer " +  localStorage.getItem("token") },
            }).then(response => {
                if (response.data) {
                    let tmp = suggestionList.filter(item => item.id !== id);
                    setSuggestionList(...tmp)
                }

            }).catch((err) => {
                console.log(err)

            })
        }

    }

    useEffect(()=> {
        axios.get("https://面试分享.online:5050/feedback/get", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }).then(response => {
            setSuggestionList(response.data)
            console.log(response)
        }).catch((err) => {
            console.log(err)

        })
    },[])
    return (suggestionList == null ? <div></div>: suggestionList.map(res=> {
        return (<div>
            < TextField
                required
                id="outlined-required"
                label="建议"
                defaultValue={res.content}
                rows={4}
                fullWidth />
            <TextField
                id="filled-multiline-static"
                label="联系方式"
                multiline
                rows={4}
                defaultValue={res.contact}
                variant="filled"
                fullWidth
            />

            <Button variant="contained" onClick={onDelete(res.id)}>Clean</Button>

        </div>)
    }))
}