export type Payload = {
    message: string;
}

export type Header = {
    userId: string;
    connectionId: string;
}

export type Request = {
    body: Payload;
    header: Header;
}