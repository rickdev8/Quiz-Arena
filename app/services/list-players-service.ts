import axios from "axios";

export async function ListPlayers(){
    return await axios.get("https://quiz-arena-backend-3sze.onrender.com/listen-users")
}