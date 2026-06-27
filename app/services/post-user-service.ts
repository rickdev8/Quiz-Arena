import axios from "axios";

export async function postUser(data: any){
    await axios.post("https://quiz-arena-backend-3sze.onrender.com/post-user", data)
}