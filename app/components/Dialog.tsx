'use client';

import { useRef, useEffect, Dispatch, SetStateAction } from 'react';

type TDialogProps = {
    title: string;
    onClose?: () => void;
    onOk: () => void;
    onCancel?: () => void;
    setIsChange: Dispatch<SetStateAction<boolean>>;
    isDialog: boolean;
    setIsDialog: Dispatch<SetStateAction<boolean>>;

    children: React.ReactNode;
};

function Dialog({
    title,
    onClose,
    onOk,
    onCancel,
    setIsChange,
    children,
    isDialog,
    setIsDialog,
}: TDialogProps) {
    const dialogRef = useRef<null | HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialog) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isDialog]);

    const closeDialog = () => {
        dialogRef.current?.close();
        setIsDialog(false);
    };

    const clikOk = () => {
        closeDialog();
        onOk();
        setIsChange(true);
    };

    const clickCancel = () => {
        closeDialog();
    };

    const dialog: JSX.Element | null = isDialog ? (
        <dialog
            ref={dialogRef}
            className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded backdrop:bg-bg-cards-bg-popup backdrop:bg-opacity-30"
        >
            <div className="w-[400px] max-w-full bg-bg-cards-bg-card-1 rounded flex flex-col py-8 px-6 relative ">
                <h1 className="text-white text-center text-2xl mb-6">
                    {title}
                </h1>
                <button
                    onClick={closeDialog}
                    className=" absolute top-5 right-5"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <g opacity="0.6">
                            <path
                                d="M11 1L1 11"
                                stroke="#EAEAEA"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 1L11 11"
                                stroke="#EAEAEA"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>

                <div>
                    {children}
                    <div className="flex flex-col mt-6">
                        <button
                            onClick={clikOk}
                            className=" w-full text-white text-m font-bold flex justify-center items-center py-[14px] bg-delete-btn mb-6"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="14"
                                viewBox="0 0 12 14"
                                fill="none"
                                className="mr-[10px]"
                            >
                                <path
                                    d="M1.00033 12.4444C1.00033 13.3039 1.74616 14 2.66699 14H9.33366C10.2545 14 11.0003 13.3039 11.0003 12.4444V3.11111H1.00033V12.4444ZM11.8337 0.777778H8.91699L8.08366 0H3.91699L3.08366 0.777778H0.166992V2.33333H11.8337V0.777778Z"
                                    fill="white"
                                />
                            </svg>
                            Delete
                        </button>
                        <button
                            onClick={clickCancel}
                            className="w-full text-m text-[#FF5B5B]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    ) : null;

    return dialog;
}

export default Dialog;
