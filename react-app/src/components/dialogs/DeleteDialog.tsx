import { Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { ReactNode } from "react"
import { Announcement, Service } from "../../models/types"

export function DeleteAnnouncementDialog(props: DeleteItemDialogProps<Announcement>) {
    return (
        <DeleteItemDialog
            renderMessage={(announcement) => <Typography>You are about to delete the announcement: {announcement.subject}</Typography>}
            renderTitle={(announcement) => <Typography>Delete {announcement.name}</Typography>}
            {...props}
        />
    )
}

export function DeleteServiceDialog(props: DeleteItemDialogProps<Service>) {
    return (
        <DeleteItemDialog
            renderMessage={(service) => <Typography>You are about to delete the service: {service.name}</Typography>}
            renderTitle={(service) => <Typography>Delete {service.name}</Typography>}
            {...props}
        />
    )
}

interface DeleteItemDialogProps<T> {
    item: T, open: boolean, onClose: () => void, onSuccess: (item: T) => void, renderTitle?: (item: T) => ReactNode, renderMessage?: (item: T) => ReactNode
}

function DeleteItemDialog(props: DeleteItemDialogProps<any>) {

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
                    <Typography>Do you want to continue?</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>No</Button>
                <Button onClick={() => { props.onSuccess(props.item) }} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}