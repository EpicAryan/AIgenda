'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../loading";
import { ErrorState } from "../error-state";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { EmptyState } from "../empty-state";

const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns}/>
             {data.items.length === 0 && (
                <EmptyState
                    title="Create your first meeting"
                    description="Set up your first meeting with an agent. Agents can follow your instructions, participate in conversations, and interact with other attendees in real time."
                />
            )}
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
