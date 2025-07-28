import React from 'react'
import { ResponsiveDialog } from '../responsive-dialog';
import { AgentForm } from './agent-form';
import { AgentGetOne } from './types';

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}

const UpdateAgentsDialog = ({
    open,
    onOpenChange,
    initialValues
}: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
        title='Edit Agent'
        description='Edit the agent details'
        open={open}
        onOpenChange={onOpenChange}
    >
        <AgentForm 
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
          initialValues={initialValues}
        />
    </ResponsiveDialog>
  )
}

export { UpdateAgentsDialog }
