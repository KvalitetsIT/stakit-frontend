import { Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { ReactNode } from "react"
import { Group } from "../../models/group"
import { Announcement, Service, Subscription } from "../../models/types"
import { t } from "i18next"

export function DeleteAnnouncementDialog(props: DeleteItemDialogProps<Announcement>) {
    return (
        <DeleteItemDialog
            renderMessage={(announcement) => <Typography>{t("You are about to delete the announcement")}: {announcement?.subject}</Typography>}
            renderTitle={(announcement) => <Typography>{t("Delete announcement") + ""}</Typography>}
            {...props}
        />
    )
}


export function DeleteGroupDialog(props: DeleteItemDialogProps<Group>) {
    return (
        <DeleteItemDialog
            renderMessage={(group) => <Typography>{t("You are about to delete the group")}: {group?.name}</Typography>}
            renderTitle={(group) => <Typography>{t("Delete")} {group?.name}</Typography>}
            {...props}
        />
    )
}

export function DeleteServiceDialog(props: DeleteItemDialogProps<Service>) {
    return (
        <DeleteItemDialog
            renderMessage={(service) => <Typography>{t("You are about to delete the service")}: {service?.name}</Typography>}
            renderTitle={(service) => <Typography>{t("Delete")} {service?.name}</Typography>}
            {...props}
        />
    )
}

export function DeleteSubscriptionDialog(props: DeleteItemDialogProps<Subscription>) {
    return (
        <DeleteItemDialog
            renderMessage={(service) => <Typography>{t("You are about to delete the subscription") + ""}: "subscription?.name"</Typography>}
            renderTitle={(service) => <Typography>{t("Delete")} {service?.name}</Typography>}
            {...props}
        />
    )
}

interface DeleteItemDialogProps<T> {
    item?: T, open: boolean, onClose: () => void, onSuccess: (item: T) => void, renderTitle?: (item: T) => ReactNode, renderMessage?: (item: T) => ReactNode
}

export function DeleteItemDialog(props: DeleteItemDialogProps<any>) {
    const { renderTitle, renderMessage, item } = props
    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...props}
        >
            {(renderTitle &&
                <DialogTitle id="alert-dialog-title">
                    {renderTitle(item)}
                </DialogTitle>
            )}
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {renderMessage && renderMessage(item)}
                    <Typography>{t("Do you want to continue") + ""}?</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.onSuccess(props.item) }} autoFocus>
                    Yes
                </Button>
                <Button onClick={props.onClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
}
