import Ticket from "../models/ticketModel.js";

class TicketDao {

    async createTicket(data) {
        return await Ticket.create(data);
    }
}

export default TicketDao;