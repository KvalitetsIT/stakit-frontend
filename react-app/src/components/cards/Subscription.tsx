import { useContext, useState } from "react"
import { usePutSubscriptionMutation, useGetAllSubscriptionsQuery, useDeleteSubscriptionMutation, useCreateSubscriptionMutation } from "../../feature/stakit/subscriptionSlice"
import { Subscription } from "../../models/types"
import { Mode } from "./Mode"
import { DeleteSubscriptionDialog } from "../dialogs/DeleteDialog"

import { ResourceCard, ResourceCardProps, ResourcesCard } from "./ResourceCard"

import { Link, useLocation } from "react-router-dom"
import { StatusAvatar } from "../status"
import { t } from "i18next"
import { SubscriptionForm } from "../forms/subscribe"
import { Can } from "@casl/react"
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@mui/material"
import { useKeycloak } from "@react-keycloak/web"

import { Operation, Asset } from "../../feature/authentication/config/ability"
import { UserContext } from "../../feature/authentication/logic/FetchUser"
import { Header } from "../../pages/services/details"
import { Modes, ItemWithLink } from "../service"
import { Group } from "../../models/group"
import { group } from "console"

interface SubscriptionCardProps extends ResourceCardProps<Subscription> { }

export function SubscriptionCard(props: SubscriptionCardProps) {


    const { resource: subscription, isLoading } = props

    const location = useLocation()
    const [mode, setMode] = useState(location.state?.mode ?? Mode.NORMAL)

    const updateSubscription = usePutSubscriptionMutation()[0]
    const removeSubscription = useDeleteSubscriptionMutation()[0]
    const { refetch } = useGetAllSubscriptionsQuery(undefined);

    return (
        <ResourceCard
            header={"header"}
            subHeader={"subHeader"}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            onDelete={removeSubscription}
            onUpdate={updateSubscription}

            renderForm={(subscription: Subscription) => (
                <SubscriptionForm
                    isLoading={isLoading}
                    subscription={subscription}
                    onCancel={() => setMode(Mode.NORMAL)}
                    onSubmit={async (subscription: Subscription) => { updateSubscription(subscription); setMode(Mode.NORMAL) }} />
            )}
            deleteDialog={<DeleteSubscriptionDialog
                item={subscription}
                open={mode === Mode.DELETE}
                onClose={function (): void {
                    setMode(Mode.NORMAL)
                }}
                onSuccess={function (item: Subscription): void {
                    removeSubscription(item)
                    refetch()
                    window.history.go(-1)
                }} />
            }
            {...props}
        />
    )
}
interface SubscriptionsCardProps extends Omit<ResourceCardProps<Subscription>, "resource"> { }

SubscriptionsCard.defaultProps = {
    header: t("Subscriptions"),
    subHeader: t("A list of all subscriptions"),
}

export function SubscriptionsCard(props: SubscriptionsCardProps) {

    const { isLoading, data, refetch } = useGetAllSubscriptionsQuery(undefined)
    const create = useCreateSubscriptionMutation()
    const subscriptions = data ?? []
    const [mode, setMode] = useState<Mode>(Mode.NORMAL)

    return (
        <ResourcesCard
            isLoading={isLoading}
            mode={mode}
            onModeChange={(x) => setMode(x)}
            resources={subscriptions}
            onRefresh={() => { refetch() }}
            renderForm={() => <SubscriptionForm
                onSubmit={async (sub) => {
                    await create[0](sub);
                    setMode(Mode.NORMAL);
                }}
                onCancel={() => setMode(Mode.NORMAL)} />}
            renderItem={(item) => <SubscriptionItem subscription={item} />}
            extractKey={(subscription, index) => "subscription_" + index}
            extractPath={(subscription) => "/subscriptions/" + subscription.uuid}
            {...props}
        />
    )
}


export function SubscriptionItem(props: { subscription: Subscription }) {
    const user = useContext(UserContext)!
    const keycloak = useKeycloak()

    const Actions = () => (
        <>
            <Can ability={user?.getAbility()} I={Operation.READ} a={Asset.RESOURCE}>
                <Tooltip title={<>{t("Edit")}</>}>
                    <Link to={"/subscriptions/" + props.subscription.uuid} state={{ mode: Modes.EDIT }} >
                        <IconButton edge="end">
                            icon
                        </IconButton>
                    </Link>
                </Tooltip>
            </Can>

        </>
    )

    const authenticated = keycloak.initialized && keycloak.keycloak.authenticated

    return (
        <>
            <ItemWithLink disabled={!authenticated} to={"/services/" + props.subscription.uuid}>
                <ListItem
                    key={"item_" + props.subscription.uuid}
                    secondaryAction={<Actions />}
                >
                    <ListItemAvatar>
                        <Avatar>{props.subscription.email?.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.subscription.email}
                        secondary={props.subscription.groups?.map(group => group as Group).map(group => group.name)}
                    />
                </ListItem>
            </ItemWithLink>
        </>
    )
}





export function GroupItem(props: { group: Group, showActions?: boolean, showPath?: boolean }) {

    const user = useContext(UserContext)!
    const keycloak = useKeycloak()

    const authenticated = keycloak.initialized && keycloak.keycloak.authenticated


    const Actions = () => (
        <>
        
        </>
    )

    return (
        <>
            <ItemWithLink disabled={!authenticated} to={"/groups/" + props.group.uuid}>
                <ListItem
                    key={"item_" + props.group.uuid}    
                    secondaryAction={<Actions />}
                >
                    <ListItemText
                        primary={props.group.name}
                        secondary={props.group.description?.slice(0, 100).trim() + (props.group.description?.length! > 100 ? "..." : "")}
                    />
                </ListItem>
            </ItemWithLink>
        </>
    )
}
