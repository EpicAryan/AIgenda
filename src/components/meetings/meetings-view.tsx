'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../loading";
import { ErrorState } from "../error-state";

const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings..."
            description="Please wait while we fetch the meetings."
        />
    )
}

const MeetingsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meetings"
            description="Please try again later."
        />
    )

}

export  { MeetingsView, MeetingsViewLoading, MeetingsViewError }
