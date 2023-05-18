'use client';

import { useEffect } from "react";

interface ErrorProps {
    error: Error | string;
    reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {

useEffect(() => {
    console.error(error);
}, [error]);

return (
    <div>
        <h2>Something went wrong!</h2>
        <button  onClick={ () => reset() } >
            Try again
        </button>
    </div>
)
};