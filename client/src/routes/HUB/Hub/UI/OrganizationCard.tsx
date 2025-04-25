// import React from "react";

// interface OrganizationCardProps {
// 	name: string;
// 	comment: string;
// 	fileName: string;
// 	type: "БО" | "КО";
// 	website?: string;
// }

// export const OrganizationCard: React.FC<OrganizationCardProps> = ({
// 	name,
// 	comment,
// 	fileName,
// 	type,
// 	website,
// }) => {
// 	return (
// 		<div className="organization-card">
// 			<div className="organization-card__header">
// 				<h4>
// 					{type} — {name}
// 				</h4>
// 				{website && (
// 					<a
// 						href={website}
// 						target="_blank"
// 						rel="noopener noreferrer"
// 						className="organization-card__website"
// 					>
// 						Сайт
// 					</a>
// 				)}
// 			</div>

// 			<div className="organization-card__content">
// 				<p>
// 					<strong>Комментарий:</strong> {comment}
// 				</p>

// 				<div className="organization-card__file">
// 					<strong>Документ:</strong> {fileName}
// 				</div>
// 			</div>

// 			<div className="organization-card__footer">
// 				<p className="organization-card__type">Тип: {type}</p>
// 			</div>
// 		</div>
// 	);
// };
