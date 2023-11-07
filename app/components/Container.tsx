function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`mobile:max-w-[479.98px] mobile-l:max-w-[767.98px] tablet:max-w-[1023.98px] laptop:max-w-[1279.98px] desktop:max-w-[1920px] px-[10%] tablet:px-[16%] mx-auto ${className}`}
        >
            {children}
        </div>
    );
}

export default Container;
