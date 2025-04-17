import { Avatar, Button } from "@mui/material";
import { UserCardData } from "../../API/data/UserCardData";
import "./UserCard.css";

const UserCard: React.FC<UserCardData> = ({ fullname, position, contacts }) => {
	return (
		<div className="user-card">
			<div className="content">
				<Avatar
					sx={{ minWidth: "150px", minHeight: "150px" }}
					// src={data?.avatar}
				/>
				<p className="title">{fullname || "Пользователь"}</p>
				<p className="desc">{position}</p>
				<p className="desc">{contacts}</p>
				<div className="modules-info">
					<Button variant="outlined">Карточка образцов подписей</Button>
					<Button variant="outlined">Корреспонденция</Button>
					<Button className="more-modules-info" variant="contained">
						+3
					</Button>
				</div>
				<Button className="view-profile" variant="text">
					Подробнее
				</Button>
			</div>
		</div>
	);
};

export default UserCard;
