import { Box, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { t } from "i18next";
import { useState } from "react";
import { useGetStatusHistoryQuery } from "../../feature/stakit/publicSlice";
import { Bucket, buildBuckets, getRangeStart, HistoryRange, historyRanges, summarize } from "../../feature/stakit/statusHistory";
import { Status, StatusPeriod } from "../../models/types";
import { StatusAvatar } from "../status";

const STORAGE_KEY = "stakit.historyRange"

const text = (key: string) => t(key) as string

const rangeLabels: Record<HistoryRange, string> = {
    [HistoryRange.TODAY]: "Today",
    [HistoryRange.WEEK]: "Last 7 days",
    [HistoryRange.MONTH]: "Last 30 days",
    [HistoryRange.QUARTER]: "Last 90 days",
}

export function useHistoryRange(): [HistoryRange, (range: HistoryRange) => void] {
    const [range, setRange] = useState<HistoryRange>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY) as HistoryRange | null
            if (stored && historyRanges.includes(stored)) return stored
        } catch { }
        return HistoryRange.WEEK
    })

    const update = (value: HistoryRange) => {
        setRange(value)
        try { localStorage.setItem(STORAGE_KEY, value) } catch { }
    }

    return [range, update]
}

export function HistoryRangeSelector(props: { value: HistoryRange, onChange: (range: HistoryRange) => void }) {
    return (
        <ToggleButtonGroup
            size="small"
            exclusive
            value={props.value}
            onChange={(_, value) => value && props.onChange(value)}
        >
            {historyRanges.map(range => (
                <ToggleButton key={range} value={range} sx={{ textTransform: "none" }}>{text(rangeLabels[range])}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}

function useStatusHistory(uuid: string | undefined, range: HistoryRange) {
    const from = getRangeStart(range).toISOString()
    return useGetStatusHistoryQuery({ uuid: uuid!, from }, { skip: !uuid })
}

export function statusLabel(status?: Status) {
    switch (status) {
        case Status.OK: return text("OK")
        case Status.PARTIAL_NOT_OK: return text("Partially down")
        case Status.NOT_OK: return text("Down")
        default: return text("No data")
    }
}

function formatUptime(uptime?: number) {
    if (uptime === undefined) return text("No data")
    return (Math.floor(uptime * 100) / 100).toLocaleString(undefined, { maximumFractionDigits: 2 }) + " %"
}

function formatPeriod(period: StatusPeriod) {
    const from = dayjs(period.from).format("DD/MM HH:mm")
    const to = period.to ? dayjs(period.to).format("DD/MM HH:mm") : text("Ongoing")
    return from + " – " + to
}

export function StatusHistoryBar(props: { uuid?: string, range: HistoryRange }) {
    const theme = useTheme()
    const { data, isLoading } = useStatusHistory(props.uuid, props.range)

    if (isLoading) return <Skeleton variant="rounded" height={20} />

    const periods = data ?? []
    const now = dayjs()
    const buckets = buildBuckets(periods, props.range, now)
    const total = summarize(periods, getRangeStart(props.range, now), now, now)

    const colorOf = (bucket: Bucket) => {
        if (bucket.from.isAfter(now) || bucket.status === undefined) return theme.palette.action.disabledBackground
        switch (bucket.status) {
            case Status.OK: return theme.palette.success.main
            case Status.PARTIAL_NOT_OK: return theme.palette.warning.main
            case Status.NOT_OK: return theme.palette.error.main
            default: return theme.palette.info.main
        }
    }

    const labelOf = (bucket: Bucket) => props.range === HistoryRange.TODAY
        ? bucket.from.format("HH:mm") + " – " + bucket.to.format("HH:mm")
        : bucket.from.format("DD/MM/YYYY")

    return (
        <Stack spacing={0.5}>
            <Box display="flex" gap="2px" height={20}>
                {buckets.map(bucket => (
                    <Tooltip
                        key={bucket.from.valueOf()}
                        arrow
                        disableHoverListener={bucket.from.isAfter(now)}
                        title={
                            <>
                                <Typography variant="body2">{labelOf(bucket)}</Typography>
                                <Typography variant="subtitle2">{text("Uptime")}: {formatUptime(bucket.uptime)}</Typography>
                                {bucket.incidents.slice(0, 3).map((incident, index) => (
                                    <Typography key={index} variant="caption" display="block">
                                        {statusLabel(incident.status)}: {formatPeriod(incident)}
                                    </Typography>
                                ))}
                            </>
                        }
                    >
                        <Box
                            flex={1}
                            minWidth={2}
                            borderRadius={0.5}
                            sx={{ backgroundColor: colorOf(bucket), ":hover": { opacity: 0.6 } }}
                        />
                    </Tooltip>
                ))}
            </Box>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption" color="text.secondary">{text(rangeLabels[props.range])}</Typography>
                <Typography variant="caption" color="text.secondary">{text("Uptime")}: {formatUptime(total.uptime)}</Typography>
            </Stack>
        </Stack>
    )
}

export function StatusHistoryIncidents(props: { uuid?: string, range: HistoryRange }) {
    const { data, isLoading } = useStatusHistory(props.uuid, props.range)

    if (isLoading) return <Skeleton variant="rounded" height={56} />

    const incidents = (data ?? []).filter(period => period.status !== Status.OK).reverse()

    if (incidents.length === 0) {
        return <Typography color="text.secondary">{text("No incidents in the selected period")}</Typography>
    }

    return (
        <List disablePadding>
            {incidents.map(incident => (
                <ListItem key={incident.from} disableGutters>
                    <ListItemAvatar>
                        <StatusAvatar status={incident.status} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={statusLabel(incident.status) + " · " + formatPeriod(incident)}
                        secondary={incident.message}
                    />
                </ListItem>
            ))}
        </List>
    )
}
