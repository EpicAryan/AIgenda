import { AgentsView, AgentsViewLoading, AgentsViewError, AgentsListHeader } from '@/components'
import { loadSearchParams } from '@/components/agents/params';
import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface Props {
  searchParams: Promise<SearchParams>;
}

const AgentsPage = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  if(!session){
    redirect("/auth/sign-in")
  }
  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
    ...filters,
  }));

  return (
    <>
    <AgentsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default AgentsPage
