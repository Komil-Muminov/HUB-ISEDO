import { Table, Input, Select, Row, Col } from "antd";
import { CardData } from "../../routes/HUB/Hub/ui";
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
	const [orgTypeFilter, setOrgTypeFilter] = useState<string | undefined>();
	const [roleFilter, setRoleFilter] = useState<string | undefined>();

	const filteredData = data.filter((entry) => {
		const search = searchText.toLowerCase().trim();
		const matches =
			(entry.name && entry.name.toLowerCase().includes(search)) ||
			(entry.tax && entry.tax.toLowerCase().includes(search)) ||
			(entry.address && entry.address.toLowerCase().includes(search));

		// Фильтр по типу
		const typeMatch = !typeFilter || entry.type === typeFilter;

		// Фильтр по типу организации только для записей типа "ko"
		const orgTypeMatch =
			!orgTypeFilter ||
			(entry.type === "ko" &&
				entry.orgType?.toLowerCase() === orgTypeFilter.toLowerCase());

		// Фильтр по роли только для записей типа "bo"
		const roleMatch =
			!roleFilter ||
			(entry.type === "bo" &&
				entry.role?.toLowerCase().includes(roleFilter.toLowerCase()));

		return matches && typeMatch && orgTypeMatch && roleMatch;
	});

	const columns = [
		{ title: "Название", dataIndex: "name", key: "name" },
		{
			title: "Тип карточки",
			dataIndex: "type",
			key: "type",
			render: (t: string) => (t === "ko" ? "КО" : "БО"),
		},
		{
			title: "Тип организации",
			dataIndex: "orgType",
			key: "orgType",
			render: (orgType: string | undefined, record: CardData) =>
				record.type === "ko" ? orgType || "Не указан" : "Бюджетное организация",
		},
		{ title: "ИНН", dataIndex: "tax", key: "tax" },
		{ title: "Адрес", dataIndex: "address", key: "address" },
	];

	return (
		<div>
			<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
				<Col span={6}>
					<Search
						placeholder="Поиск"
						onChange={(e) => setSearchText(e.target.value)} // Обновляем при каждом изменении текста
						onSearch={(v) => setSearchText(v)}
						allowClear
						value={searchText}
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
				<Col span={6}>
					<Select
						placeholder="Фильтр по типу организации"
						allowClear
						onChange={setOrgTypeFilter}
						style={{ width: "100%" }}
						disabled={typeFilter === "bo"}
					>
						<Option value="АО">АО</Option>
						<Option value="ООО">ООО</Option>
					</Select>
				</Col>
				<Col span={6}>
					<Select
						placeholder="Фильтр по роли"
						allowClear
						onChange={setRoleFilter}
						style={{ width: "100%" }}
						disabled={typeFilter === "ko"}
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) =>
							option?.children?.toLowerCase().includes(input.toLowerCase())
						}
					>
						<Option value="Директор">Директор</Option>
						<Option value="Менеджер">Менеджер</Option>
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
