export type Payload = {
    message: string;
}

export type Header = {
    user_id: string;
    connection_id: string;
    api_key: string;
}

export type Request = {
    body: Payload;
    header: Header;
}