import { ReactNode } from "react"

class Resource {
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
    group?: Group


    constructor(service_identifier: string, name: string, ignore_service_name: boolean){
        super()
        this.service_identifier=service_identifier
        this.name=name
        this.ignore_service_name=ignore_service_name
        
    }
}

export class Group extends Resource {
    name: string
    display_order: number 
    description?: string
    status?: Status
    services: Service[]

    constructor(name: string, display_order: number, servies?: Service[]){
        super()
        this.name = name
        this.display_order = display_order
        this.services = servies ?? []
    }
}


export enum Status {
    OK, NOT_OK, UKNOWN
}

export interface Action {
    name: string,
    icon: ReactNode,
    callback: () => void
}

export interface Subscription {
    email?: string,
    groups?: Group[]
}

export class Announcement extends Resource {
    from_datetime?: Date
    to_datetime?: Date
    message?: string
    subject?: string
}