import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ApproveQuestions() {
    const [title, setTitle] = useState("")
    const [answer, setAnswer] = useState("")
    const [reason, setReason] = useState("")
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get('https://面试分享.online:5050/questions/advice/get', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }

        }).then((response) => {
            setList(response.data)
        }).catch((err) => {
            console.log(err)

        })
    }, [])
    const onSubmit = (questionId) => {
        return () => {
            axios.post('https://面试分享.online:5050/questions/adivice/approve', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    question_id: questionId
                }
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
        }

    }
    const onReject = (questionId) => {
        return () => {
            axios.post('https://面试分享.online:5050/questions/adivice/reject', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    questionId: questionId,
                    rejectReason: reason
                }
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)

            })
        }

    }

    return (<div>
        {
            list.map((res) => {
                console.log(res)
                return (<div>
                    < TextField
                        required
                        id="outlined-required"
                        label="题目"
                        defaultValue={res.title}
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                        fullWidth />
                    <TextField
                        id="filled-multiline-static"
                        label="题目内容"
                        multiline
                        rows={4}
                        defaultValue={res.details}
                        variant="filled"
                        onChange={(event) => { setAnswer(event.target.value) }}
                        fullWidth
                    />
                    <TextField
                        id="filled-multiline-static"
                        label="拒绝原因"
                        multiline
                        rows={4}
                        defaultValue={""}
                        variant="filled"
                        onChange={(event) => { setReason(event.target.value) }}
                        fullWidth
                    />
                    <Button variant="contained" onClick={onSubmit(res.question_id)}>Approve</Button>
                    <Button variant="contained" onClick={onReject(res.question_id)}>Reject</Button>

                </div>)
            })


        }


    </div>)
}