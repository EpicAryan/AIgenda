"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../../loading";
import { ErrorState } from "../../error-state";
import MeetingIdViewHeader from "./meeting-id-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/components/agents/hooks/use-confirm";
import { UpdateMeetingsDialog } from "../update-meeting-dialog";
import { useState } from "react";

interface Props {
    meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting permanently.",
    )

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                router.push("/meetings");
            },
            onError: (error) => {
                toast.error(error?.data?.code || "Failed to remove meeting");
            }
        })
    );

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if(!ok) return;

        await removeMeeting.mutateAsync({ id: meetingId });
    }

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingsDialog
                open={updateMeetingDialog}
                onOpenChange={setUpdateMeetingDialog}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialog(true)}
                    onRemove={handleRemoveMeeting}
                />
                {JSON.stringify(data, null, 2)}
            </div>
        </>
    );
};

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting..."
            description="Please wait while we fetch the meeting."
        />
    );
};

export const MeetingIdViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meeting"
            description="Please try again later."
        />
    );
};
