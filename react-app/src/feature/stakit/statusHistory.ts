import dayjs, { Dayjs } from "dayjs";
import { Status, StatusPeriod } from "../../models/types";

export enum HistoryRange {
    TODAY = "today",
    WEEK = "7",
    MONTH = "30",
    QUARTER = "90",
}

export const historyRanges = [HistoryRange.TODAY, HistoryRange.WEEK, HistoryRange.MONTH, HistoryRange.QUARTER]

export interface Bucket {
    from: Dayjs
    to: Dayjs
    /** Worst status seen in the bucket, undefined if there is no data */
    status?: Status
    /** Percentage of the covered time where the service was OK, undefined if there is no data */
    uptime?: number
    incidents: StatusPeriod[]
}

const severity: Record<string, number> = {
    [Status.OK]: 0,
    [Status.PARTIAL_NOT_OK]: 1,
    [Status.NOT_OK]: 2,
}

export function getRangeStart(range: HistoryRange, now: Dayjs = dayjs()): Dayjs {
    const today = now.startOf("day")
    return range === HistoryRange.TODAY ? today : today.subtract(Number(range) - 1, "day")
}

export function buildBuckets(periods: StatusPeriod[], range: HistoryRange, now: Dayjs = dayjs()): Bucket[] {
    const unit = range === HistoryRange.TODAY ? "hour" : "day"
    const count = range === HistoryRange.TODAY ? 24 : Number(range)
    const start = getRangeStart(range, now)

    return Array.from({ length: count }, (_, i) => {
        const from = start.add(i, unit)
        return summarize(periods, from, from.add(1, unit), now)
    })
}

export function summarize(periods: StatusPeriod[], from: Dayjs, to: Dayjs, now: Dayjs = dayjs()): Bucket {
    const end = to.isAfter(now) ? now : to
    const bucket: Bucket = { from, to, incidents: [] }

    let covered = 0
    let ok = 0

    periods.forEach(period => {
        const periodFrom = dayjs(period.from)
        const periodTo = period.to ? dayjs(period.to) : now

        const overlap = Math.min(periodTo.valueOf(), end.valueOf()) - Math.max(periodFrom.valueOf(), from.valueOf())
        if (overlap <= 0) return

        covered += overlap
        if (period.status === Status.OK) ok += overlap
        else bucket.incidents.push(period)

        if (bucket.status === undefined || severity[period.status] > severity[bucket.status]) bucket.status = period.status
    })

    if (covered > 0) bucket.uptime = ok / covered * 100

    return bucket
}
