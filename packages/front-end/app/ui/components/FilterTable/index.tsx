'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { Table, Button, Popconfirm, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { InputRef, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

function FilterTable<
	DataIndex extends string,
	DataType extends {
		id: string | number;
		[key: string]: any;
	},
>({
	data,
	columns,
	expandedRowRender,
	children,
}: {
	data: DataType[];
	columns: {
		title: string;
		dataIndex: DataIndex;
		render?: (...val: any) => ReactNode;
		unsearchable?: boolean;
		key: string;
		ellipsis?: boolean;
		fixed?: boolean | 'left' | 'right';
		width?: number;
	}[];
	expandedRowRender?: (record: DataType) => React.ReactNode;
	children?: (id: number | string) => ReactNode;
}) {
	const [dataSource, setDataSource] = useState(data);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);
	const getColumnSearchProps = (
		dataIndex: DataIndex,
	): TableColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => {
			const handleSearch = (
				selectedKeys: string[],
				confirm: FilterDropdownProps['confirm'],
				dataIndex: DataIndex,
			) => {
				confirm();
				setSearchText(selectedKeys[0]);
				setSearchedColumn(dataIndex);
			};

			const handleReset = (clearFilters: () => void) => {
				clearFilters();
				setSearchText('');
			};
			return (
				<div
					style={{ padding: 8 }}
					onKeyDown={(e) => e.stopPropagation()}
				>
					<Input
						ref={searchInput}
						placeholder={`搜索 ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(
								e.target.value ? [e.target.value] : [],
							)
						}
						onPressEnter={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex,
							)
						}
						style={{ marginBottom: 8, display: 'block' }}
					/>
					<Space>
						<Button
							type="primary"
							onClick={() =>
								handleSearch(
									selectedKeys as string[],
									confirm,
									dataIndex,
								)
							}
							icon={<SearchOutlined />}
							size="small"
							style={{ width: 90 }}
						>
							搜索
						</Button>
						<Button
							onClick={() =>
								clearFilters && handleReset(clearFilters)
							}
							size="small"
							style={{ width: 90 }}
						>
							重置
						</Button>
						<Button
							type="link"
							size="small"
							onClick={() => {
								close();
							}}
						>
							关闭
						</Button>
					</Space>
				</div>
			);
		},
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? '#1677ff' : undefined }}
			/>
		),
		onFilter: (value, record) => {
			return (
				record[dataIndex]
					?.toString()
					.toLowerCase()
					.includes((value as string).toLowerCase()) ?? false
			);
		},

		filterDropdownProps: {
			onOpenChange(open) {
				if (open) {
					setTimeout(() => searchInput.current?.select(), 100);
				}
			},
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<>
					<Highlighter
						highlightStyle={{
							backgroundColor: '#ffc069',
							padding: 0,
						}}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text ? text.toString() : ''}
					></Highlighter>
				</>
			) : (
				text
			),
	});

	const tabColumns = [
		...columns.map((c) => {
			if (c.unsearchable) {
				return c;
			} else {
				return {
					...c,
					...getColumnSearchProps(c.dataIndex),
				};
			}
		}),
	];
	if (children) {
		tabColumns.push({
			title: '操作',
			key: 'action',
			render: (_: any, record: DataType) => <>{children(record.id)}</>,
			fixed: 'right',
			width: 100,
		} as any);
	}

	return (
		<>
			<Table
				columns={tabColumns}
				dataSource={dataSource}
				rowKey="id"
				scroll={{ x: 'max-content' }}
				expandable={{
					expandedRowRender,
					rowExpandable: () => {
						return expandedRowRender ? true : false;
					},
				}}
				bordered
			/>
		</>
	);
}

export default FilterTable;
