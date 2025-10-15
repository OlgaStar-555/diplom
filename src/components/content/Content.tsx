import getData from "../../data";
import "./Content.css";
import { useCallback, useEffect, useState } from "react";

export default function Content(props: any) {
  const [data, setData] = useState(null);
  
  const fetchData = useCallback(async () => {
      const result = await getData("alldata");
      setData(result);
    }, []);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    console.log(data);
  
  
  return <section className="nav-line">Content</section>;
}
