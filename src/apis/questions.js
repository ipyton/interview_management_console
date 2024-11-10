import axios from "axios"
export default class Question {
    static fetch_by_id(id, setQuestion) {
        const response =  axios.get('http://localhost:5050/questions/getById', {
            params: {
                question_id: id // 传递参数
            }
        }).then((response) =>{
            setQuestion(response.data.data)
        })
    }   
    static async submitUpdate(object) {
        await axios.post('http://localhost:5050/questions/upsert', object )
    }
}