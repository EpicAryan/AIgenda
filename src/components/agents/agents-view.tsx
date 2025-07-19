'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorState, LoadingState } from "@/components";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { EmptyState } from "../empty-state";
import { useAgentsFilter } from "./hooks/use-agents-filters";
import DataPagination from "./data-pagination";


const AgentsView = () => {
    const [filters, setFilters] = useAgentsFilter();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns}/>
            <DataPagination 
                page={filters.page}
                totalPages = {data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create your first agent"
                    description="Create an agent to join meetings and give instructions to each agent. Agents will follow instructions and can interact with participants during the call."
                />
            )}
        </div>
    )
}

const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents..."
            description="Please wait while we fetch the agents."
        />
    )
}

const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="Please try again later."
        />
    )

}

export { AgentsView, AgentsViewLoading, AgentsViewError }
