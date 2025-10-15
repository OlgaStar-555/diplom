import "./Background.css";

export default function Background({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className={`bg-img bg-img__${isAdmin ? "admin" : "client"}`}></div>
  );
}
