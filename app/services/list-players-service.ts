import axios from "axios";

export async function ListPlayers(){
    return await axios.get("http://localhost:3001/listen-users")
}