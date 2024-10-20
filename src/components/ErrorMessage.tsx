
interface ErrorMessageProps {
    message?: string;
}

export const ErrorMessage = ({message}: ErrorMessageProps) => {
    return (
        <div className="">{message}</div>
    )
}
