
interface Props {
    title: string;
    description: string;
}

export const LoadingState = ({
    title,
    description
}: Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>

                <div className="loading">
                    <svg width="64px" height="48px">
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                    </svg>
                </div>
                <div className='flex flex-col gap-y-2 text-center'>
                    <h6 className='text-lg font-medium'>{title}</h6>
                    <p className='text-sm'>{description}</p>
                </div>
            </div>
        </div>
    )
}
