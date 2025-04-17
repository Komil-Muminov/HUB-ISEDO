import React, { useEffect, useState } from "react";
import NavigationOfModules from "../../UI/Navigation of Modules/NavigationOfModules";
import CardSubmodule from "../../UI/Card of Submodule/CardSubmodule";
import submoduleImage from "../../assets/module-1.png";
import notFound from "../../assets/notfound.png";
import { useLocation } from "react-router";
import { SubModulesList } from "../HR/HrSubmodules/Submodules";
import "./Modules.css";

export interface ModulesListScheme {
  id: number;
  title: string;
  image: string;
  link: string;
}

export interface SubmoduleProps {
  id: number;
  title: string;
  image: string;
  link: string;
}

const Modules: React.FC<ModulesListScheme> = () => {
  const modulesList: ModulesListScheme[] = [
    {
      id: 1,
      title: "Заявки",
      image: notFound,
      link: "/primary-docs/request",
    },
    {
      id: 2,
      title: "СРМ",
      image: notFound,
      link: "/primary-docs/crm",
    },
    {
      id: 3,
      title: "Первичые документы",
      image: notFound,
      link: "/primary-docs/contracts",
    },
    {
      id: 4,
      title: "Кадр",
      image: submoduleImage,
      link: "/modules/hr/submodules",
    },
    {
      id: 5,
      title: "Хаб",
      image: notFound,
      link: "/primary-docs/hub",
    },
    {
      id: 6,
      title: "Корреспонденция",
      image: notFound,
      link: "/primary-docs/correspondence",
    },
    {
      id: 7,
      title: "Государственные услуги",
      image: notFound,
      link: "/primary-docs/government-services",
    },
  ];

  const location = useLocation();
  const [isSubmodules, setIsSubmodules] = useState<boolean>(true);
  useEffect(() => {
    if (location?.pathname === "/modules/hr/submodules") {
      setIsSubmodules(true);
    } else if (location?.pathname === "/modules") {
      setIsSubmodules(false);
    }
  }, [location]);
  
  return (
    <main>
      <>
        <NavigationOfModules
          list={modulesList}
          currentList={isSubmodules ? "Кадр" : ""}
        />
        {!isSubmodules ? (
          <>
            <div className="wrapper-submodules-card">
              {modulesList.map((e) => (
                <>
                  <CardSubmodule
                    // isSubmodules={isSubmodules}
                    key={e.id}
                    item={e}
                  />
                </>
              ))}
            </div>
          </>
        ) : (
          <div className="wrapper-submodules-card">
            {SubModulesList.map((item) => (
              <>
                <CardSubmodule key={item.id} item={item} />
              </>
            ))}
          </div>
        )}
      </>
    </main>
  );
};

export default Modules;
