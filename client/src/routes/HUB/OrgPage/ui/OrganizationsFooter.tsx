import { Typography } from "antd";

const { Text } = Typography;

export const OrganizationsFooter = () => {
	return (
		<div className="footer">
			<Text>© {new Date().getFullYear()} KM. Все права защищены.</Text>
			<div className="social-links">
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-instagram">dsa</i>
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-facebook"></i>
				</a>
			</div>
		</div>
	);
};
