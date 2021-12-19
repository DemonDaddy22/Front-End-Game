interface ButtonProps {
    onClick: (...args: any[]) => any;
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
}