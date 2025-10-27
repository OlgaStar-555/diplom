type NavBtnProps = {
  translate: number;
  translateStep: number;
  maxTranslate: number;
  setTranslate: (newValue: number) => void;
};

export default function NavDateNav({
  translate,
  translateStep,
  maxTranslate,
  setTranslate,
}: NavBtnProps) {
  const handleClick = ({
    currentTarget
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentTarget.dataset.nav === "prev") {
      setTranslate(Math.min(translate + translateStep, 0));
    } else if (currentTarget.dataset.nav === "next") {
      setTranslate(Math.max(translate - translateStep, maxTranslate));
    }
  };

  return (
    <div className="nav-line__nav">
      <button
        onClick={handleClick}
        className={`nav-line__button${translate < 0 ? " active" : ""}`}
        data-nav={"prev"}
        title="Назад"
      ></button>
      <button
        onClick={handleClick}
        className={`nav-line__button${
          translate > maxTranslate ? " active" : ""
        }`}
        data-nav={"next"}
        title="Вперед"
      ></button>
    </div>
  );
}
