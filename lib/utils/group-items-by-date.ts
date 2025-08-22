import { startOfToday, startOfYesterday, subMonths, subWeeks } from 'date-fns';

const GROUPING_THRESHOLDS = {
	today: startOfToday(),
	yesterday: startOfYesterday(),
	lastWeek: subWeeks(new Date(), 1),
	lastMonth: subMonths(new Date(), 1),
};

export function groupItemsByDate<T extends UIChat | ChatMessage = UIChat>(
	items: T[]
): GroupedItems<T> {
	return items.reduce<GroupedItems<T>>(
		(groups, item) => {
			const itemDate = getSortDate(item);

			if (itemDate >= GROUPING_THRESHOLDS.today) {
				groups.today.push(item);
			} else if (itemDate >= GROUPING_THRESHOLDS.yesterday) {
				groups.yesterday.push(item);
			} else if (itemDate >= GROUPING_THRESHOLDS.lastWeek) {
				groups.lastWeek.push(item);
			} else if (itemDate >= GROUPING_THRESHOLDS.lastMonth) {
				groups.lastMonth.push(item);
			} else {
				groups.older.push(item);
			}

			return groups;
		},
		{
			today: [],
			yesterday: [],
			lastWeek: [],
			lastMonth: [],
			older: [],
		} as GroupedItems<T>
	);
}

function getSortDate(item: UIChat | ChatMessage) {
	if ('createdAt' in item) {
		return new Date(item.updatedAt ?? item.createdAt);
	}

	return new Date(
		item?.metadata?.updatedAt ?? item?.metadata?.createdAt ?? Date.now()
	);
}
