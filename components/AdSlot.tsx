"use client";

import { useEffect, useState } from "react";

interface AdSlotProps {
    type: "header" | "footer";
    className?: string;
}

export default function AdSlot({ type, className = "" }: AdSlotProps) {
    const [adCode, setAdCode] = useState("");

    useEffect(() => {
        const code = type === "header"
            ? localStorage.getItem("adCode1")
            : localStorage.getItem("adCode2");

        if (code) {
            setAdCode(code);
        }
    }, [type]);

    if (!adCode) return null;

    return (
        <div
            className={`w-full overflow-hidden flex justify-center items-center ${className}`}
            dangerouslySetInnerHTML={{ __html: adCode }}
        />
    );
}
