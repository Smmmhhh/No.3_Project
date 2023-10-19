import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import MyPage from "./MyPage";
import "./MyPageRegister.css";

const MypageRegister = () => {
    const [userNo, setUserNo] = useState(0);
    const [register, setRegister] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
            setUserNo(userData.data.userNo);

            fetch(`/mypage/register/${userData.data.userNo}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === 200) {
                        setRegister(res.data);
                    }
                })
                .catch((error) => {
                    console.error("오류:", error);
                });
        }
    }, []);

    return (
        <div className="mypage_List">
            <MyPage showFooter={false}/>

            <table className="List_form">
                <tbody>
                {register.map((product) => (
                    <tr key={product.postId} className="List_item">
                        <td>
                            <img className="List_img" src={product.image}/>
                        </td>
                        <td className="List_text">
                            <h3>{product.title}</h3>
                            <p>{product.price}</p>
                        </td>
                        <td>
                            <Link to={`/mypage/productsedit/${product.postId}`}>
                                수정하기
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// <div className="mypage_List">
//   <MyPage showFooter={false} />
//   <div className="List_form">
//     {register.map((product) => (
//       <div key={product.postId}>
//         <img className="List_img" src={product.image} />
//         <div className="List_text">
//           <h3>{product.title}</h3>
//           <p>{product.price} </p>
//           <Link to={`/mypage/productsedit/${product.postId}`}>
//             수정하기
//           </Link>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

export default MypageRegister;
