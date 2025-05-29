import { useState } from "react";
// đoạn này mà dung typescript khai báo type chỗ này thì vui
const useQuery =(initial)=>{ //hook này sẽ quản lý query ,initial là giá trị khởi tạo của query
    const [query,setQuery]=useState(initial);

    const updateQuery =(newQuery)=>{
        setQuery( prev => ({...prev,...newQuery}))
    }
    const resetQuery =()=>{
        setQuery(initial)
    }
    return [query ,updateQuery ,resetQuery];
}
export default useQuery;