import { Link } from "react-router-dom";
import IconWrapper from "../utils/IconWrapper";

function NavItem({ title, icon, url }) {
	return (
		<li className='nav-item'>
			<Link to={url} className='nav-link'>
				<IconWrapper>{icon}</IconWrapper>
				<span className='link-text'>{title}</span>
			</Link>
		</li>
	);
}

export default NavItem;
