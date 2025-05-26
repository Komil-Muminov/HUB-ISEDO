import { Modal } from "antd";
import EditForm from "../../../../Components/EditForm/ui";

type EditModalProps = {
	open: boolean;
	onCancel: () => void;
	card: any;
	onSave: (updated: any) => void;
};

export const EditModal = ({ open, onCancel, card, onSave }: EditModalProps) => {
	return (
		<Modal
			open={open}
			onCancel={onCancel}
			footer={null}
			title="Редактировать организацию"
			width={600}
		>
			{card && <EditForm card={card} onSave={onSave} />}
		</Modal>
	);
};
