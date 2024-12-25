'use client';

import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import type { AppRouter } from '../../../../packages/trpc/src/index'; // Adjust the import path to match your shared package or API router location

// Create the tRPC React hooks
const trpc = createTRPCReact<AppRouter>();

const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: process.env.NEXT_PUBLIC_TRPC_API_URL || 'http://localhost:3000/api/trpc',
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};

export default TrpcProvider;
