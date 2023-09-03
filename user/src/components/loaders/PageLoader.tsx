import { ReactElement, useEffect, useState } from 'react'
import { Rings } from "react-loader-spinner";

// type Props = {}

export const PageLoader = (/*props: Props*/): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        window.onload = () => {
            setIsLoading(false);
        };
    }, [])

    if (isLoading) {
        return (
            <div className="absolute top-0 left-0 z-50 h-screen w-screen backdrop-blur-md p-10 pt- overflow-y-scroll flex items-center justify-center">
                <Rings /> {/* You can customize this with your loader */}
            </div>
        );
    }

    return <></>
}