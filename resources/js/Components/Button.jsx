export default function Button({
    children,
    loading = false,
    loadingText = 'Loading…',
    disabled = false,
    variant = 'primary',
    type = 'button',
    onClick,
    className = '',
    ...props
}) {
    const baseClasses =
        'w-full rounded-md px-4 py-2 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-[#6FBE44] text-white hover:bg-[#5fa838]',
        secondary: 'bg-[#3F3F3F] text-white hover:bg-[#1A1A1A]',
        outline: 'border border-[#6FBE44] text-[#6FBE44] bg-white hover:bg-[#EAF3E6]',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses[variant] ?? variantClasses.primary} ${className}`}
            {...props}
        >
            {loading ? loadingText : children}
        </button>
    );
}