interface ISwitchButtonProps {
    isActive: boolean;
    onChange: () => void;
}

function SwitchButton({ isActive = false, onChange }: ISwitchButtonProps) {
    return (
        <>
            {isActive ? (
                <div
                    className="w-[47px] flex items-center justify-between px-[8px] py-[7px] bg-switch-on-bg border border-transparent rounded-[99px]"
                    onClick={onChange}
                >
                    <p className=" text-on text-[11px] font-bold mr-1">On</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <circle cx="5.99902" cy="6" r="6" fill="#07D41B" />
                    </svg>
                </div>
            ) : (
                <div
                    className="w-[47px] flex items-center justify-between px-[8px] py-[7px] bg-switch-off-bg border border-transparent rounded-[99px]"
                    onClick={onChange}
                >
                    {' '}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <circle
                            opacity="0.7"
                            cx="5.99902"
                            cy="6"
                            r="6"
                            fill="#9B9D9F"
                        />
                    </svg>
                    <p className="text-text-second text-[11px] font-bold ml-1 opacity-70">
                        Off
                    </p>
                </div>
            )}
        </>
    );
}

export default SwitchButton;
