import dayjs from "dayjs";
import { Status } from "../../models/types";
import { buildBuckets, getRangeStart, HistoryRange, summarize } from "./statusHistory";

const now = dayjs("2026-10-02T12:00:00")

describe("getRangeStart", () => {
    it("starts today at midnight", () => {
        expect(getRangeStart(HistoryRange.TODAY, now).toISOString()).toBe(dayjs("2026-10-02T00:00:00").toISOString())
    })

    it("includes today in the number of days", () => {
        expect(getRangeStart(HistoryRange.WEEK, now).toISOString()).toBe(dayjs("2026-09-26T00:00:00").toISOString())
        expect(getRangeStart(HistoryRange.QUARTER, now).toISOString()).toBe(dayjs("2026-07-05T00:00:00").toISOString())
    })
})

describe("buildBuckets", () => {
    it("uses hours for today and days otherwise", () => {
        expect(buildBuckets([], HistoryRange.TODAY, now)).toHaveLength(24)
        expect(buildBuckets([], HistoryRange.WEEK, now)).toHaveLength(7)
        expect(buildBuckets([], HistoryRange.MONTH, now)).toHaveLength(30)
        expect(buildBuckets([], HistoryRange.QUARTER, now)).toHaveLength(90)
    })

    it("has no data where no period covers the bucket", () => {
        const buckets = buildBuckets([{ status: Status.OK, from: "2026-10-02T10:00:00" }], HistoryRange.TODAY, now)

        expect(buckets[9].status).toBeUndefined()
        expect(buckets[9].uptime).toBeUndefined()
        expect(buckets[10].status).toBe(Status.OK)
        expect(buckets[11].uptime).toBe(100)
        expect(buckets[13].status).toBeUndefined()
    })
})

describe("summarize", () => {
    it("reports the worst status and the uptime for the covered time", () => {
        const periods = [
            { status: Status.OK, from: "2026-10-01T00:00:00", to: "2026-10-01T06:00:00" },
            { status: Status.NOT_OK, from: "2026-10-01T06:00:00", to: "2026-10-01T12:00:00", message: "Down" },
            { status: Status.PARTIAL_NOT_OK, from: "2026-10-01T12:00:00", to: "2026-10-01T18:00:00" },
            { status: Status.OK, from: "2026-10-01T18:00:00" },
        ]

        const bucket = summarize(periods, dayjs("2026-10-01T00:00:00"), dayjs("2026-10-02T00:00:00"), now)

        expect(bucket.status).toBe(Status.NOT_OK)
        expect(bucket.uptime).toBe(50)
        expect(bucket.incidents.map(x => x.status)).toEqual([Status.NOT_OK, Status.PARTIAL_NOT_OK])
    })

    it("treats an ongoing period as lasting until now", () => {
        const bucket = summarize([{ status: Status.NOT_OK, from: "2026-10-02T11:00:00" }], dayjs("2026-10-02T00:00:00"), dayjs("2026-10-03T00:00:00"), now)

        expect(bucket.status).toBe(Status.NOT_OK)
        expect(bucket.uptime).toBe(0)
    })
})
