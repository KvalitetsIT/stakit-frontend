import { Status, Service, Resource } from "./types"

export class Group extends Resource {
    name: string
    display_order: number 
    description?: string
    status?: Status
    services: string[]
    
    constructor(name: string, display_order: number, servies?: string[]){
        super()
        this.name = name
        this.display_order = display_order
        this.services = servies ?? []
    }  
}

