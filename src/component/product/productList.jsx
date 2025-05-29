import { Table } from "antd";

import useQuery from "../../hook/useQuery";
import useFetchList from "../../hook/useFetchList";
import "./productList.css";

const ProductList = () => {
    const [query, updateQuery, resetQuery] = useQuery({
        page: 1,
        limit: 5,
        sortBy: "title",
        order: "asc",
        q: "",
    });
    const [data] = useFetchList("products", query, {});

    return (
        <div>
            <h1>Danh sách sản phẩm</h1>

            <table border='1' className="table">
                <thead>
                    <tr >
                        <th >Title</th>
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
        </div>
    );
};

export { ProductList };