import { ReactNode } from "react"
import { Group } from "./group"

export class Resource {
    uuid?: string
}

export interface Credentials {
    email: string,
    password: string,
}

export interface User {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    gender?: Gender
}

export enum Gender {
    male, female, other
}

export class Service extends Resource {
    service_identifier: string
    name: string
    status?: Status
    ignore_service_name: boolean
    description?: string
    group?: string | Group

    constructor(service_identifier: string, name: string, ignore_service_name: boolean){
        super()
        this.service_identifier=service_identifier
        this.name=name
        this.ignore_service_name=ignore_service_name   
    }
}

export enum Status {
    OK = "OK", NOT_OK = "NOT_OK", UKNOWN = "UKNOWN"
}

export interface Action {
    name: string,
    icon: ReactNode,
    callback: () => void
}

export interface Subscription {
    email?: string,
    groups?: string[],
    announcements?: boolean
}

export class Announcement extends Resource {
    from_datetime?: Date
    to_datetime?: Date
    message?: string
    subject?: string
}