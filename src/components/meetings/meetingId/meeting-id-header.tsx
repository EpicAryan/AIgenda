import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { 
    DropdownMenu,
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger  
} from "@/components/ui/dropdown-menu";
import { 
    ChevronRightIcon, 
    MoreVerticalIcon, 
    PencilIcon, 
    TrashIcon 
} from "lucide-react";


interface Props {
    meetingId: string;
    meetingName: string;
    onEdit: () => void;
    onRemove: () => void;
}

const MeetingIdViewHeader = ({ 
    meetingId, 
    meetingName, 
    onEdit, 
    onRemove 
}: Props) => {
  return (
    <div className="flex items-center justify-between">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild className="font-medium text-xl">
                        <Link href="/agents">
                            My Meetings
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                    <ChevronRightIcon />
                </BreadcrumbSeparator>
                 <BreadcrumbItem>
                    <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
                        <Link href={`/agents/${meetingId}`}>
                            {meetingName}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <MoreVerticalIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
                <DropdownMenuItem onClick={onEdit} className="group cursor-pointer">
                    <PencilIcon className="size-4 text-black group-hover:text-green-600" />
                    <span className="text-black group-hover:text-green-600">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onRemove} className="group cursor-pointer">
                    <TrashIcon className="size-4 text-black group-hover:text-red-600" />
                    <span className="text-black group-hover:text-red-600">Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default MeetingIdViewHeader
