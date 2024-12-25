'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import superjson from 'superjson';
import { trpc } from './client';

export const getBaseUrl = () => {
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

    let baseUrl = '';
    if (NEXT_PUBLIC_URL === 'localhost') {
        const port = process.env.NEXT_PUBLIC_PORT;
        baseUrl = `http://${NEXT_PUBLIC_URL}:${port}`;
    }

    return baseUrl;
};

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
            transformer: superjson,
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
