import { TextField, Button, Grid } from "@mui/material"
import { useState } from "react"
import Question from "../../../apis/questions";
export default function Edits(props){
    const [id, setid] = useState("")
    const [question, setQuestion] = useState({
        "question_id": 1,
        "title": "请解释JavaScript中的闭包是什么？",
        "content": "闭包是指函数和其词法作用域的组合，能够访问其外部函数作用域的变量。",
        "details": "我爱你duduud",
        "author_id": 1,
        "author_name": "Zhiheng Chen",
        "avatar": "https://example.com/avatar1.png",
        "likes": 25,
        "views": 100,
        "tags": [
            "JavaScript",
            "编程",
            "面试"
        ]
    });

    const findById = (question_id) => {
        Question.fetch_by_id(question_id, setQuestion)
        console.log(question)
    }

    const handleChange = (event) => {
        setQuestion({...question, [event.target.name]:event.target.value})
    }

    const submitChange = () => {
        Question.submitUpdate(question)
    }
    return (<div><TextField id="standard-basic" value={id} label="Input the question of id" variant="standard" onChange={(event) => {
        setid(event.target.value);
    }} /> <Button variant="contained" onClick={()=>findById(id)}>get</Button>

        <Grid container spacing={2}>
            {Object.keys(question).map((key) => (
                <Grid item xs={12} key={key}>
                    {key !== "question_id" ? (
                        <TextField
                            fullWidth
                            label={key}
                            name={key}
                            value={question[key] || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    ) : (
                        <TextField
                            fullWidth
                            label={key}
                            name={key}
                            value={question[key]} // This can be a static value or a variable if needed
                            variant="outlined"
                            disabled
                        />
                    )}
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={submitChange}>
                    Save Changes
                </Button>
            </Grid>
        </Grid>



</div>)
}