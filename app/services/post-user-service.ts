import axios from "axios";

export async function postUser(data: any){
    await axios.post("http://localhost:3001/post-user", data)
}