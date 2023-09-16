import cl from "./Header.module.css"

const Header = () => {
    return (
        <div>
            <h1 className={ cl.header }>todos</h1>
        </div>
    );
};

export default Header;