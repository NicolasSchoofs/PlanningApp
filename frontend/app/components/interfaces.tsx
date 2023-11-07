export interface Event {
    Id: number
    Type: string;
    DateTimeStart: Date;
    DateTimeEnd: Date;
    Title: string;
    Description: string;
    UserID: number;
}

export interface KanbanBoard {
    Id: number;
    Title: string;
    Description: string;
    Cards: KanbanCard[];
    UserID: number;
}

export interface KanbanCard {
    Id: number;
    Title: string;
}
