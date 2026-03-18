import { Link,useLocation } from "react-router-dom";


function Bread(){
    const location = useLocation();
    const path = location.pathname.split('/').filter(a=>a);

    const fl = path.filter((e,i)=>{
            const isLast = i === path.length - 1;
            const idLast = !isNaN(Number(e));
            return !(isLast && idLast); 
    })
    console.log(path);

    return(
        <>
        {fl.map((ee,ii)=>{
               const a = "/"+fl.slice(0,ii+1).join("/");
                const isLast = ii === fl.length - 1;
            return(

                <span key={a} style={{textDecoration:"none",color:"black"}}>
                    {ii==1?("/"):("")}
                    {isLast ?(<a style={{textDecoration:"none",color:"black"}}>{ee}</a>):(<Link to={a} style={{textDecoration:"none",color:"black"}}>{ee}</Link>)}
                </span>
            );
        })}
        </>
    )
}

export default Bread;