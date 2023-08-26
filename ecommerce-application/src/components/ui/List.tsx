type ListProps = {
    className: string;
    children: React.ReactNode | string;
};

export default function List({ className, children }: ListProps) {
    return <li className={className}>{children}</li>;
}
