import classes from "./Header.module.css";

import {ADMIN, AUTH, ROOT} from "../../config/configRouter.ts";
import {Link} from "react-router-dom";

export default function Header({isAdmin}: { isAdmin: boolean }) {
    return (
        <header className={`row row_space-between ${classes.row_header}`}>
            <section className={classes['text-login']}>
                <h1 className={classes.title}>
                    <span className={classes.text}>Идём</span>
                    <span className={classes.divider}>в</span>
                    <span className={classes.text}>кино</span>
                </h1>
                {isAdmin && <h2 className={classes.subtitle}>Администраторррская</h2>}
            </section>
            {!isAdmin && <Link to={`${ROOT}${ADMIN}/${AUTH}`} className={classes.button}>Войти</Link>}
        </header>
    );
}
