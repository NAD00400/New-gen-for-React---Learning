import useQuery from "../../hook/useQuery";
import useFetchList from "../../hook/useFetchList";
import "../../styles/product/productList.css";

const sortOption =[
    {label : 'sắp xếp' ,value:{}},
    {label : 'giá tăng dần' ,value:{sortBy :"price" ,order:"asc" }},
    {label : 'giá giảm dần' ,value:{sortBy :"price" ,order:"desc" }},
    {label : 'tên từ a - z' ,value:{sortBy :"title" ,order:"desc" }},
    {label : 'tên từ z - a' ,value:{sortBy :"title" ,order:"desc" }},
]

const ProductList = () => {
    const [query, updateQuery, resetQuery] = useQuery({
        q:"",
        page: 1,
        limit: 5,
        sortBy: "title",
        order: "asc",
    });
    const [data] = useFetchList("products",query, {});

    const handleSearch =(data)=>{
        updateQuery({q:data,page:1})
    }
    const handleSort=(sortIndex)=>{
        const opt= sortOption[sortIndex].value;
        updateQuery({...opt, page:1})
    }
    const handlePage =(newPage)=>{
        updateQuery({ page: newPage })
    }
    const handleLimit=(newLimit)=>{
        updateQuery({ limit :newLimit , page:1 })
    }
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <div>
                <span>hiển thị tối đa</span>
                <select name="" id="" onChange={(e)=>{handleLimit(e.target.value)}}value={query.limit}>
                    <option value="5"> 5 </option>
                    <option value="5"> 10 </option>
                </select>
                <span>sản phẩm</span>
            </div>
            
            <div><span> tìm kiếm </span><input type="text" onChange={(e)=>handleSearch(e.target.value)}/></div>
            <select name="" id="" onChange={(e)=>{handleSort(e.target.value)}}>
                {sortOption.map((opt ,index)=>(
                    
                    <option key ={index} value={index}>
                        {opt.label}
                    </option>
                    
                ))}
            </select>
            <table border='1' className="table">
                <thead>
                    <tr >
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    data && data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <button disabled={query.page <= 1} onClick={() => handlePage(query.page -1)}>-</button> 
            <span>{query.page}</span> 
            <button onClick={()=>handlePage(query.page +1)}>+</button>

        </div>
    );
};

export { ProductList };