
import { agentsRouter } from '@/components/agents/server/procedures';
import { createTRPCRouter } from '../init';
import { meetingsRouter } from '@/components/meetings/server/procedures';

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
