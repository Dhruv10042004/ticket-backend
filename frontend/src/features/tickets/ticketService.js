import axios from 'axios'
const API_URL='https://ticket-backend-7.onrender.com/api/tickets'
//Create new Ticket
const createTicket = async (ticketData,token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(API_URL,ticketData,config);
        return response.data;
    }
const ticketService={
    createTicket
}
export default ticketService