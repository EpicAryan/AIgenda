
import { JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";


export const useConfirm = (
    title: string,
    description: string,
): [() => JSX.Element, ()=> Promise<unknown>] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        })
    }

    const handleClose = () => {
        setPromise(null);
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }

    const handleCancel = () => {
        setPromise(null);
    }

    const ConfirmationDialog = () => (
        <ResponsiveDialog
            open={promise !== null}
            onOpenChange={handleClose}
            title={title}
            description={description}
        >
            <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full lg:w-auto border border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300 ease-in-out"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    className="w-full lg:w-auto bg-red-500 hover:bg-red-600 transition-colors duration-300 ease-in-out"
                >
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    );

    return [ConfirmationDialog, confirm]
};
