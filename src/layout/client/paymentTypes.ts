export interface TicketPropsType {
    id: number;
    ticket_date: string;
    ticket_time: string;
    ticket_filmName: string;
    ticket_hallName: string;
    ticket_row: number;
    ticket_place: number;
    ticket_price: number;
}

export interface PaymentProps {
    date: string;
    places: number[];
    hallName: string;
    seanceTime: string;
    priceSum: number
    tickets: TicketPropsType[]
}

export interface ClientContextType {
    data: PaymentProps | null
    updateData: (newData: PaymentProps) => void;
}