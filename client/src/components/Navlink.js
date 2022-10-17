import Links from '../utils/Links';
import { NavLink } from 'react-router-dom';

const Navlink = ({ toggle }) => {
    return (
        <div className='nav-links'>
            {Links.map((link) => {
                const { text, icon, id, path } = link;
                return (
                    <NavLink
                        to={path}
                        className={({ isActive }) => {
                            return isActive ? 'nav-link active' : 'nav-link'
                        }}
                        key={id}
                        onClick={toggle}
                    >
                        <span className='icon'>{icon}</span>
                        {text}
                    </NavLink>)
            })}
        </div>
    )
}

export default Navlink