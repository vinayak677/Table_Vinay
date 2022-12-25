import React from "react";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [tableFilter,setTableFilter]= useState([])

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // dom //
  useEffect(() => {
    let tot = document.querySelector(".Grand_total");

    let total = 0;

    data.forEach((item) => {
      total = total + item.price * item.qty;
    });
    tot.textContent = total;
  });


console.log(data,"data")
 const filterData=(e)=>{
  if(e.target.value !== ""){
    setValue(e.target.value);
    const filterTable= data.filter(o=>Object.keys(o).some(k=>
        String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
    ));
    setTableFilter([...filterTable])
  } else{
    setValue(e.target.value);
    setData([...data])
  }
 }

  return (
    <div>
      
      <>
        <div className="container pt-5 mainPage">
        <div class="input-group mt-5 mb-3">
        <div className="input-group-prepend"></div>
        <input
          type="text"
          class="form-control"
          placeholder="Name of material"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={value}
          onChange={filterData}
        />
      </div>
          <table class="table table-bordered ">
            <thead class="thead-dark">
              <tr>
                <th className="text-center">SL.NO</th>
                <th className="text-center">NAME OF MATERIAL</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">UOM</th>
                <th className="text-center">QTY</th>
                <th className="text-center">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {value.length > 0 ? tableFilter?.map((e) => {
                return (
                  <>
                    <tr key={e.name}>
                      <td className="text-center bg_grey"></td>
                      <td className="text-center bg_grey">{e.name}</td>
                      <td className="text-center bg_grey">{e.price}</td>
                      <td className="text-center bg_grey">{e.uom}</td>
                      <td className="text-center bg_grey">{e.qty}</td>
                      <td className="text-center bg_grey">
                        {e.price * e.qty}/-
                      </td>
                    </tr>
                  </>
                );
              })
              : data?.map((e) => {
                return (
                  <>
                    <tr key={e.name}>
                      <td className="text-center bg_grey"></td>
                      <td className="text-center bg_grey">{e.name}</td>
                      <td className="text-center bg_grey">{e.price}</td>
                      <td className="text-center bg_grey">{e.uom}</td>
                      <td className="text-center bg_grey">{e.qty}</td>
                      <td className="text-center bg_grey">
                        {e.price * e.qty}/-
                      </td>
                    </tr>
                  </>
                );
              })
            }
              <tr>
                <td className="bottom_line"></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="grand text-center">Grand Total</td>
                <td className="Grand_total text-center">/-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default MainPage;
