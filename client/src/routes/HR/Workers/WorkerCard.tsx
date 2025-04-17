import { Form } from "../../../UI/Form/Form";
import TitleSection from "../../../UI/Title of Section/TitleSection";
import "./WorkerCard.css";
import "../../../index.css";
const WorkerCard: React.FC<{
  item: { [key: string]: string | unknown };
}> = ({ item }) => {
  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <section>
        <div className="WorkerCard__content">
          <TitleSection title="Личная информация сотрудника" />
          <Form
            classname="creatWorker__form"
            inputs={[
              {
                name: "name",
                value: item.name,
                disabled: true,
                classname: "createWorker-inp",
              },
              {
                name: "organization",
                value: item.organization,
                disabled: true,
                classname: "createWorker-inp",
              },
              {
                name: "email",
                value: item.email,
                disabled: true,
                classname: "createWorker-inp",
              },
              {
                name: "status",
                value: item.status,
                disabled: true,
                classname: "createWorker-inp",
              },
              {
                name: "position",
                value: item.position,
                disabled: true,
                classname: "createWorker-inp",
              },
              {
                name: "tel",
                value: item.tel,
                disabled: true,
                classname: "createWorker-inp workerCard-tel",
              },
            ]}
            submitText="Подтвердить"
            sbtClassName="workerCard-sbt"
            sbtClassName="createWorker-sbt btn-mui"
            onSubmit={onsubmit}
          />
        </div>
      </section>
    </>
  );
};
export default WorkerCard;
