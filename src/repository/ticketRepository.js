import ticketDao from "../dao/TicketDao.js";

class TicketRepository {
    constructor() {
        this.ticketDao = new ticketDao();
    }

    async createTicket(data) {
        return await this.ticketDao.createTicket(data);
    }

}

export default TicketRepository;