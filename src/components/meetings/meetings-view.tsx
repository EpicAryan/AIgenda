'use client';

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../loading";
import { ErrorState } from "../error-state";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { EmptyState } from "../empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "./hooks/use-meetings-filters";
import DataPagination from "../data-pagination";

const MeetingsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilter();

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }))

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)}/>
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
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
