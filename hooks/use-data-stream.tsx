import { DataStreamContext } from '@/components/providers/data-stream-provider';
import { useContext } from 'react';

export function useDataStream() {
	const context = useContext(DataStreamContext);
	if (!context) {
		throw new Error('useDataStream must be used within a DataStreamProvider');
	}
	return context;
}
