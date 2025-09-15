'use client';

import type { Chat } from '@/types/chat';
import type { DataUIPart } from 'ai';
import { createContext, useMemo, useState } from 'react';

export type SetDataStream = React.Dispatch<
	React.SetStateAction<DataUIPart<Chat.CustomUIDataTypes>[]>
>;

export type DataStream = DataUIPart<Chat.CustomUIDataTypes>[];

interface DataStreamContextValue {
	dataStream: DataUIPart<Chat.CustomUIDataTypes>[];
	setDataStream: SetDataStream;
}

export const DataStreamContext = createContext<DataStreamContextValue | null>(
	null
);

export function DataStreamProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [dataStream, setDataStream] = useState<DataStream>([]);

	const value = useMemo(() => ({ dataStream, setDataStream }), [dataStream]);

	return (
		<DataStreamContext.Provider value={value}>
			{children}
		</DataStreamContext.Provider>
	);
}
