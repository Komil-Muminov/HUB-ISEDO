import React, { useEffect, useState } from "react";
import "./PersonnelRecordsManagement.css";
import NavigationOfModules from "../../../UI/Navigation of Modules/NavigationOfModules";
import Filter from "../../../components/Filter/Filter";
import { Link } from "react-router";
import { PersonnelRecordsManagementDataFilter } from "../../../API/data/PersonnelRecordsManagementDataFilter";
import { Button } from "@mui/material";
import Registry from "../../../components/Registry/Registry";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../API/hooks/queryClient";
import { getDocuments } from "../../../API/services/documents/getDocuments";
import { IDocuments } from "../../../API/services/types/Document";

const PersonnelRecordsManagement = () => {
  interface SubmodulesList {
    id: number;
    title: string;
    link: string;
  }

  const modulesList: SubmodulesList[] = [
    {
      id: 1,
      title: "Кадровое делопроизводство",
      link: "/primary-docs/request",
    },
    {
      id: 2,
      title: "Личная карточка сотрудника",
      link: "/primary-docs/crm",
    },
    {
      id: 3,
      title: "Учет рабочего времени",
      link: "/primary-docs/contracts",
    },
    // {
    //   id: 4,
    //   title: "Кадровая отчетность",
    //   link: "/modules/hr/submodules",
    // },
  ];

  const headers = PersonnelRecordsManagementDataFilter.filter((e) => {
    return [
      "Номер списка",
      "Тип документа",
      "Дата",
      "Сотрудник-(и)",
      "Статус",
    ].includes(e.title);
  }).map((e) => e.title);

  const [documents, setDocuments] = useState<IDocuments[]>();

  const getDocumentsQuery = useQuery(
    {
      queryFn: () => getDocuments(),
      queryKey: ["documents"],
    },
    queryClient
  );

  useEffect(() => {
    if (getDocumentsQuery.status === "success") {
      setDocuments(getDocumentsQuery.data);
    }
  }, [getDocumentsQuery.data]);

  const rows = documents?.map((item: IDocuments, index) => [
    item.id,
    index + 1,
    item.docType,
    item.date,
    item.fullname,
    item.state,
  ]);

  console.log(rows);

  return (
    <main className="main-personnel-records-management">
      <NavigationOfModules
        list={modulesList}
        currentList="Кадровое делопроизводство"
      />
      <section>
        <h1 className="submodule-title">Реестр</h1>
        <div className="panel-control-filter">
          <Filter data={PersonnelRecordsManagementDataFilter} />
          <Link to="/modules/hr/submodules/personnel-records-management/create">
            <Button variant="contained">Добавить</Button>
          </Link>
        </div>
      </section>
      <section>
        <Registry
          headersProps={headers}
          rowsProps={rows}
          url="personnel-records-management"
        />
      </section>
    </main>
  );
};

export default PersonnelRecordsManagement;
