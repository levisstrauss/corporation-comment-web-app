
interface HashtagItemProps {
    onSelectCompany: (company: string) => void;
    company: string;
}
export const HashtagItem = ({ company, onSelectCompany }: HashtagItemProps) => {
    return (
        <li key={company}>
            <button onClick={() => onSelectCompany(company)}>#{company}</button>
        </li>
    )
}
