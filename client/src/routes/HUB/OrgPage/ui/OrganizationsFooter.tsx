import { Typography } from "antd";

const { Text } = Typography;

export const OrganizationsFooter = () => {
	return (
		<div className="footer">
			<div className="social-links" >
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-instagram">Instagram</i>
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-facebook">Facebook</i>
				</a>
			</div>
			<Text>© {new Date().getFullYear()} KM. Все права защищены.</Text>
		</div>
	);
};
