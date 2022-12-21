import { mockComponent } from "react-dom/test-utils"
import { Service, Group, Status, Announcement } from "./models/types"

const services = [
    {
        id: 0,
        name: "Pexip Video Cluster",
        status: Status.DOWN,
        description: "VDX Pexip konferencenode cluster som står for selve afvikling af video",
    },
    {
        id: 1,
        name: "Pexip WebApp",
        status: Status.UP,
        description: "Standard WebRTC video klienten som følger med Pexip installationen"
    },
    {
        id: 2,
        name: "VDX-API ",
        status: Status.UP,
        description: "VDX-API er det api (Application Programming Interface) som udstilles som en service i VDX, hvor de tilsluttede parter kan integrere til egne systemer for booking af møder i VDX"
    },
    {
        id: 3,
        name: "VDX Management",
        status: Status.DOWN,
        description: "VDX Management er værktøjet til de tilsluttede parter for administration af egen organisation af af tilgængelige services i VDX"
    },

    {
        id: 4,
        name: "VDX Booking",
        status: Status.UP,
        description: "VDX Booking er værktøjet til de tilsluttede parter for booking af møder i VDX"
    }
]

const groups: Group[] = [
    {
        id: 0,
        name: "VDX Drift",
        status: Status.DOWN,
        description: "A production ready cluster",
        services: [
            services[0],
            services[1],
            services[2],
            services[3],
            services[4],
        ]
    },
    {
        id: 1,
        name: "VDX Stage",
        status: Status.DOWN,
        description: "A test environment",
        services: [
            services[0],
            services[1],
            services[2],
            services[3],
            services[4]
        ]
    },
    {
        id: 2,
        name: "VDX Stage",
        status: Status.DOWN,
        description: "some other group",
        services: [
            services[0],
            services[1],
            services[2],
            services[3],
            services[4]
        ]
    }
]

// Assign references to all services
groups.forEach(group => group.services.forEach(service => service.group = group))

const announcements: Announcement[] = [
    { id: 0, from: new Date(), to: new Date(), content: "content" },
    { id: 1, from: new Date(), to: new Date(), content: "content" },
    { id: 2, from: new Date(), to: new Date(), content: "content" },
    { id: 3, from: new Date(), to: new Date(), content: "content" },
    { id: 4, from: new Date(), to: new Date(), content: "content" },
    { id: 5, from: new Date(), to: new Date(), content: "content" },
    { id: 6, from: new Date(), to: new Date(), content: "content" },
]



const days = [100, 100, 99, 10, 70, 88, 97, 100, 100, 99, 100, 70, 88, 20, 99, 100, 70, 88, 97, 100, 1, 99, 100, 70, 88, 100, 99, 100, 70, 88, 97, 100, 100, 99, 70, 88, 100, 99, 100, 70, 88, 97, 100, 100, 99, 100, 70, 88, 100, 99, 100, 70, 88, 97, 100, 100, 99, 100, 70, 88, 100, 99, 100, 70, 88, 97, 100, 100, 99, 100, 70, 88, 100, 99, 100, 70, 88, 97, 100, 100, 99, 100, 70, 88, 100, 99, 100, 70, 88, 97]


export const mock = {
    announcements,
    groups,
    services,
    days
}

