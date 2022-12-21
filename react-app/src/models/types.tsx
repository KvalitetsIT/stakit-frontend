import { ReactNode } from "react"

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

export interface Service {
    id?: number,
    name: string,
    status?: Status
    description?: string
    group?: Group
}

export interface Group {
    id: number,
    name: string,
    description: string,
    status: Status
    services: Service[]
}


export enum Status {
    UP, DOWN, UKNOWN
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



export interface Announcement {
    id?: number
    from?: Date,
    to?: Date,
    content: string
}