import React, { useEffect, useState } from "react";
import "./WorkingHours.css";
import NavigationOfModules from "../../../UI/Navigation of Modules/NavigationOfModules";
import Filter from "../../../components/Filter/Filter";
import { Link } from "react-router";
import { Button } from "@mui/material";
import Registry from "../../../components/Registry/Registry";
import { WorkingHoursDataFilter } from "../../../API/data/WorkingHoursDataFilter";
import { IDocuments } from "../../../API/services/types/Document";
import { getDocuments } from "../../../API/services/documents/getDocuments";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../API/hooks/queryClient";
import { IWorkingHours } from "../../../API/services/types/WorkingHours";
import { getWorkingHours } from "../../../API/services/workingHours/getWorkingHours";
import dayjs from "dayjs";
import { getMonth } from "../../../API/hooks/getData";

interface SubmodulesList {
  id: number;
  title: string;
  link: string;
}

const modulesList: SubmodulesList[] = [
  {
    id: 1,
    title: "Кадровое делопроизводство",
    link: "/modules/hr/submodules/personnel-records-management",
  },
  {
    id: 2,
    title: "Личная карточка сотрудника",
    link: "/modules/hr/submodules/employee-personal-card",
  },
  {
    id: 3,
    title: "Учет рабочего времени",
    link: "/modules/hr/submodules/working-house",
  },
  // {
  //   id: 4,
  //   title: "Кадровая отчетность",
  //   link: "/modules/hr/submodules/hr-reporting",
  // },
];

const WorkingHours = () => {
  const headers = WorkingHoursDataFilter.filter((e) => {
    return [
      "Номер учета",
      "Месяц",
      "Год",
      "Дни",
      "Рабочие дни",
      "Ответственное лицо",
      "Статус",
    ].includes(e.title);
  }).map((e) => e.title);

  console.log(headers);

  // НУЖНО ЗАМЕНИТЬ КОГДА БУДЕТ ДАННЫЕ

  const [workingHours, setWorkingHours] = useState<IWorkingHours[]>();

  const getWorkingHoursQuery = useQuery(
    {
      queryFn: () => getWorkingHours(),
      queryKey: ["workingHours"],
    },
    queryClient
  );

  useEffect(() => {
    if (getWorkingHoursQuery.status === "success") {
      setWorkingHours(getWorkingHoursQuery.data);
    }
  }, [getWorkingHoursQuery.data]);

  const rows = workingHours?.map((item: IWorkingHours, index) => {
    const month = getMonth(item?.month);
    const year = item.year ? dayjs(item.year) : null;
    const workingDays = item.workingDays ? dayjs(item.workingDays) : null;

    return [
      item.id,
      index + 1,
      month,
      year ? year.format("YYYY") : "",
      item.days,
      workingDays ? workingDays.format("DD") : "",
      item.executor,
      item.state,
    ];
  });

  console.log(rows);

  return (
    <main className="main-working-hours">
      <NavigationOfModules
        list={modulesList}
        currentList="Учет рабочего времени"
      />
      <section>
        <h1 className="submodule-title">Реестр</h1>
        <div className="panel-control-filter">
          <Filter data={WorkingHoursDataFilter} />
          <Link to="/modules/hr/submodules/working-hours/create">
            <Button variant="contained">Добавить</Button>
          </Link>
        </div>
      </section>
      <section>
        <Registry headersProps={headers} rowsProps={rows} url="working-hours" />
      </section>
    </main>
  );
};

export default WorkingHours;
