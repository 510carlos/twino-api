// apps/configurator/src/app/providers.tsx
'use client';

import TrpcProvider from './_trpc/Provider';


type Props = {
    children?: React.ReactNode;
};


export default function Providers({ children }: Props) {

    return (
        <TrpcProvider>
            {children}
        </TrpcProvider>
    );
}
