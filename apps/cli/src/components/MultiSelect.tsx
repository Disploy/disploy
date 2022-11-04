import { Text } from 'ink';
import type { Item } from 'ink-select-input/build/SelectInput';
import SelectInput from 'ink-select-input/build/SelectInput';
import React, { useState } from 'react';

export function MultiSelect<T>({ items, onSubmit }: { items: Item<T>[]; onSubmit: (items: Item<T>[]) => void }) {
	const [selectedItems, setSelectedItems] = useState<Item<T>[]>([]);

	const handleSelect = (item: Item<T | null>) => {
		const { value } = item;

		if (value === null) {
			return onSubmit(selectedItems);
		}

		const _item = item as Item<T>;

		if (selectedItems.includes(_item)) {
			setSelectedItems(selectedItems.filter((i) => i !== _item));
		} else {
			setSelectedItems([...selectedItems, _item]);
		}
	};

	return (
		<>
			<Text color="grey">
				{selectedItems.length > 0 ? selectedItems.map((item) => item.label).join('\n') : '- Nothing selected -'}
			</Text>
			<SelectInput
				items={[
					...items,
					{
						label: 'Submit',
						value: null,
					},
				]}
				onSelect={handleSelect}
			/>
		</>
	);
}
