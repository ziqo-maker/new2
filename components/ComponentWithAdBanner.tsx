import { useEffect, useState } from "react";

export default function ComponentWithAdBanner() {
    const [id] = useState(6058830);

    useEffect(() => {
        const handlerGo = () => {
          window.onclickaMini.goId(id);
        }
    
        if (window.onclickaMini?.isInit) {
            handlerGo();
        } else {
            document.addEventListener("onclickaMini", handlerGo);
            return () => document.removeEventListener("onclickaMini", handlerGo);
        }
    }, [id]);

    return <div data-banner-id="6058830"></div>;
}
