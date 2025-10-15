import classes from "./Header.module.css";

export default function Content(props: any) {
  return (
    <header className={`row row_space-between ${classes.row_top}`}>
      <h1 className={classes.title}>
        <span className={classes.text}>Идём</span>
        <span className={classes.divider}>в</span>
        <span className={classes.text}>кино</span>
      </h1>
      <button className={classes.button} onClick={props.onClick}>Войти</button>
    </header>
  );
}
