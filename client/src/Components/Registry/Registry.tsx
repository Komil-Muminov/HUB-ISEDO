import React from "react";
import "./Registry.css";
import { dataFilter } from "../../API/data/dataFilter";
import { OrganizationScheme } from "../../API/services/organizations/OrganizationScheme";
import { Link, useLocation, useNavigate } from "react-router";
import { statusOfDocument } from "../../API/data/statusOfDocument";

interface TProps {
  headersProps: string[];
  rowsProps: any;
  url: string;
}

const Registry = ({ headersProps, rowsProps, url }: TProps) => {
  const headers = headersProps;
  const rows = rowsProps;
  const location = useLocation();
  const navigate = useNavigate();

  const handleRowClick = (rowId: string) => {
    // if (
    //   location.pathname ===
    //   "/modules/hr/submodules/personnel-records-management"
    // ) {
    navigate(`/modules/hr/submodules/${url}/show/${rowId}`); // Навигация на нужный путь
    // }
  };

  return (
    <table className="registry">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: any[], rowIndex: React.Key | null | undefined) => (
          <tr key={rowIndex} onClick={() => handleRowClick(row[0])}>
            {row.slice(1).map((cell, cellIndex) => {
              const status = statusOfDocument.find(
                (s) => s.statusCode === cell
              );

              const statusClass = status
                ? `status-${status.statusClass.toLowerCase()}`
                : "";

              return (
                <td key={cellIndex}>
                  <p className={statusClass}>
                    {status ? status.statusName : cell}
                  </p>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Registry;
