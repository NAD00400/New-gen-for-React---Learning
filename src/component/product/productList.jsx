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
        limit: 88,
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
        <div className="container">
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
            Danh sách sản phẩm
            </h1>

            <div className="header">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) => handleSearch(e.target.value)}
            />

            <select onChange={(e) => handleLimit(Number(e.target.value))} value={query.limit}>
                <option value="8">8 sản phẩm / trang</option>
                <option value="12">12 sản phẩm / trang</option>
            </select>

            <select onChange={(e) => handleSort(e.target.value)}>
                {sortOption.map((opt, index) => (
                <option key={index} value={index}>
                    {opt.label}
                </option>
                ))}
            </select>
            </div>

            <div className="grid">
            {data &&
                data.map((item) => (
                <div className="card" key={item.id}>
                    <div className="card-title">{item.title}</div>
                    <div className="card-price">{item.price} VND</div>
                    <div className="card-desc">{item.description}</div>
                </div>
                ))}
            </div>

            <div className="pagination">
            <button disabled={query.page <= 1} onClick={() => handlePage(query.page - 1)}>
                Trang trước
            </button>
            <span>{query.page}</span>
            <button onClick={() => handlePage(query.page + 1)}>Trang sau</button>
            </div>
        </div>
    );


};

export { ProductList };