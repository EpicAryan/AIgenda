'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorState, LoadingState } from "@/components";

const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div>
            {JSON.stringify(data, null, 2)}
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
