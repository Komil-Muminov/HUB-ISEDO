import { Table, Input, Select, Row, Col } from "antd";
import { CardData } from "../../../Pages/Hub/Hub";
import { useState } from "react";

const { Search } = Input;
const { Option } = Select;

interface Props {
	data: CardData[];
	onRowClick: (id: string) => void;
}

const RegistryTable = ({ data, onRowClick }: Props) => {
	const [searchText, setSearchText] = useState("");
	const [typeFilter, setTypeFilter] = useState<string | undefined>();

	const filteredData = data.filter((entry) => {
		const search = searchText.toLowerCase();
		const matches =
			entry.name.toLowerCase().includes(search) ||
			entry.tax?.toLowerCase().includes(search) ||
			entry.address?.toLowerCase().includes(search);
		return matches && (!typeFilter || entry.type === typeFilter);
	});

	const columns = [
		{ title: "Название", dataIndex: "name", key: "name" },
		{
			title: "Тип",
			dataIndex: "type",
			key: "type",
			render: (t: string) => (t === "ko" ? "КО" : "БО"),
		},
		{ title: "ИНН", dataIndex: "tax", key: "tax" },
		{ title: "Адрес", dataIndex: "address", key: "address" },
	];

	return (
		<div>
			<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
				<Col span={12}>
					<Search
						placeholder="Поиск"
						onSearch={(v) => setSearchText(v)}
						allowClear
					/>
				</Col>
				<Col span={6}>
					<Select
						placeholder="Фильтр по типу"
						allowClear
						onChange={setTypeFilter}
						style={{ width: "100%" }}
					>
						<Option value="ko">КО</Option>
						<Option value="bo">БО</Option>
					</Select>
				</Col>
			</Row>
			<Table
				rowKey="id"
				columns={columns}
				dataSource={filteredData}
				pagination={{ pageSize: 5 }}
				onRow={(record) => ({
					onClick: () => onRowClick(record.id),
				})}
			/>
		</div>
	);
};

export default RegistryTable;
