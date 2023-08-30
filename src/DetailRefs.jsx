import React, {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail({addToCart}) {
    const {id} = useParams();
    const skuRef = useRef();
    const navigate = useNavigate();
    const {data: product, error, loading} = useFetch(`products/${id}`);

    if (loading) {
        return <Spinner/>;
    }
    if (!product) {
        return <PageNotFound/>;
    }
    if (error) {
        throw Error(error);
    }

    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>

            <select id="size" ref={skuRef}>
                <option value="">What size?</option>
                {product.skus.map((info) => (
                    <option value={info.sku} key={info.sku}>
                        {info.size}
                    </option>
                ))}
            </select>

            <p>
                <button className={"btn btn-primary"} onClick={() => {
                    const sku = skuRef.current.value;
                    if (!sku) return alert("Select the size.");
                    addToCart(id, sku);
                    navigate('/cart');
                }}>Add to Cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category}/>
        </div>
    );
}
