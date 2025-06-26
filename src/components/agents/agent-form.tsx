"use client"

import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { GeneratedAvatar } from "../generated-avatar";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { PendingLoader } from "../loaders/pendingLoader";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}

const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),
                )

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({ id: initialValues.id }),
                    );
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    )

    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if(isEdit){
            console.log("Update agent")
        }else{
            createAgent.mutate(values);
        }
    };

    return (
       <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <GeneratedAvatar 
                seed={form.watch("name")}
                variant="botttsNeutral"
                className="border size-16"
            />
            <FormField 
                name="name"
                control = {form.control}
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="e.g. Chat Buddy"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField 
                name="instructions"
                control = {form.control}
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>
                            Instructions
                        </FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder="You are a personal chat buddy that can do converstion with me as a friend"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <div className="flex justify-between gap-x-2">
                {onCancel && (
                    <Button
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={() => onCancel()}
                    >
                        Cancel
                    </Button>
                )}
                <Button disabled={isPending} type="submit">
                    {isEdit ? "Update" : isPending ? (
                        <>
                            Creating <PendingLoader/>
                        </>
                    ) : (
                        "Create"
                    )}
                </Button>
            </div>
        </form>
       </Form>
    )
}

export { AgentForm }
