import React from "react";

export default function Spinner({size = 6, color = "blue-500"}) {
    return (
        <span
            className={`animate-spin inline-block w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full`}
        ></span>
    );
}