import { Table, Input, Select, Row, Col, Button } from "antd";
import { CardData } from "../../routes/HUB/ui";
import { useEffect, useState } from "react";

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

	useEffect(() => {
		const savedFilters = localStorage.getItem("registryFilters");
		if (savedFilters) {
			const { searchText, typeFilter, orgTypeFilter, roleFilter } =
				JSON.parse(savedFilters);
			setSearchText(searchText || "");
			setTypeFilter(typeFilter);
			setOrgTypeFilter(orgTypeFilter);
			setRoleFilter(roleFilter);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			"registryFilters",
			JSON.stringify({ searchText, typeFilter, orgTypeFilter, roleFilter }),
		);
	}, [searchText, typeFilter, orgTypeFilter, roleFilter]);

	const resetFilters = () => {
		setSearchText("");
		setTypeFilter(undefined);
		setOrgTypeFilter(undefined);
		setRoleFilter(undefined);
		localStorage.removeItem("registryFilters");
	};

	const filteredData = data.filter((entry) => {
		const search = searchText.toLowerCase().trim();
		const matches =
			!search ||
			(entry.name && entry.name.toLowerCase().includes(search)) ||
			(entry.tax && entry.tax.toLowerCase().includes(search)) ||
			(entry.address && entry.address.toLowerCase().includes(search));

		const typeMatch = !typeFilter || entry.type === typeFilter;

		const orgTypeMatch =
			!orgTypeFilter ||
			(entry.type === "ko" &&
				entry.orgType?.toLowerCase() === orgTypeFilter.toLowerCase());

		const roleMatch =
			!roleFilter ||
			(entry.type === "bo" &&
				entry.role?.toLowerCase().includes(roleFilter.toLowerCase()));

		return matches && typeMatch && orgTypeMatch && roleMatch;
	});

	// Отладочный вывод
	useEffect(() => {
		console.log("Данные, переданные в RegistryTable:", data);
		console.log("Отфильтрованные данные:", filteredData);
	}, [data, filteredData]);

	const columns = [
		{
			title: "Название",
			dataIndex: "name",
			key: "name",
			sorter: (a: CardData, b: CardData) =>
				(a.name || "").localeCompare(b.name || ""),
		},
		{
			title: "Тип карточки",
			dataIndex: "type",
			key: "type",
			render: (t: string) => (t === "ko" ? "КО" : "БО"),
			sorter: (a: CardData, b: CardData) => a.type.localeCompare(b.type),
		},
		{
			title: "Тип организации",
			dataIndex: "orgType",
			key: "orgType",
			render: (orgType: string | undefined, record: CardData) =>
				record.type === "ko" ? orgType || "Не указан" : "Бюджетная организация",
			sorter: (a: CardData, b: CardData) => {
				const aVal =
					a.type === "ko" ? a.orgType || "" : "Бюджетная организация";
				const bVal =
					b.type === "ko" ? b.orgType || "" : "Бюджетная организация";
				return aVal.localeCompare(bVal);
			},
		},
		{
			title: "ИНН",
			dataIndex: "tax",
			key: "tax",
			sorter: (a: CardData, b: CardData) =>
				(a.tax || "").localeCompare(b.tax || ""),
		},
		{
			title: "Адрес",
			dataIndex: "address",
			key: "address",
			sorter: (a: CardData, b: CardData) =>
				(a.address || "").localeCompare(b.address || ""),
		},
	];

	return (
		<div>
			<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
				<Col span={6}>
					<Search
						placeholder="Поиск"
						onChange={(e) => setSearchText(e.target.value)}
						onSearch={(v) => setSearchText(v)}
						allowClear
						value={searchText}
					/>
				</Col>
				<Col span={4}>
					<Select
						placeholder="Фильтр по типу"
						allowClear
						onChange={setTypeFilter}
						style={{ width: "100%" }}
						value={typeFilter}
					>
						<Option value="ko">КО</Option>
						<Option value="bo">БО</Option>
					</Select>
				</Col>
				<Col span={5}>
					<Select
						placeholder="Тип организации"
						allowClear
						onChange={setOrgTypeFilter}
						style={{ width: "100%" }}
						value={orgTypeFilter}
						disabled={typeFilter === "bo"}
					>
						<Option value="АО">АО</Option>
						<Option value="ООО">ООО</Option>
					</Select>
				</Col>
				<Col span={5}>
					<Select
						placeholder="Роль"
						allowClear
						onChange={setRoleFilter}
						style={{ width: "100%" }}
						value={roleFilter}
						disabled={typeFilter === "ko"}
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) =>
							option?.children?.toLowerCase().includes(input.toLowerCase()) ||
							false
						}
					>
						<Option value="Директор">Директор</Option>
						<Option value="Менеджер">Менеджер</Option>
					</Select>
				</Col>
				<Col span={4}>
					<Button onClick={resetFilters} style={{ width: "100%" }}>
						Сбросить фильтры
					</Button>
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
