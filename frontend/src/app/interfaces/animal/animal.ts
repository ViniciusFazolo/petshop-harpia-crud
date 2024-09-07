import { Client } from "../client/client";

export interface Animal {
    id?: string,
    name: string,
    client: Client
}
