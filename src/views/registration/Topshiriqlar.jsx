import { cilPencil, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"
import React, { useEffect, useState } from "react"
import EditTopshiriqYuklash from "../topshiriqlar/editTopshiriqlar"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import { mahalla_url } from "src/utils/config"
const Topshiriqlar = () => {
  const [editTopYukShow, setEditTopYukShow] = useState(false)
  const [token1, setToken] = useState("")
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  let token = ""

  useEffect(() => {
    let a = Cookies.get("token")
    if (a) {
      let b = JSON.parse(a)
      setToken(b)
      token = b
    }
  }, [])
  const getData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      const { data } = await axios.get(`${mahalla_url}/all_task_views/`, config)
      console.log(data)
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <CTable bordered borderColor="dark" className="text-center">
      <CTableHead style={{ backgroundColor: "#3c4b64", color: "white" }}>
        <CTableRow>
          <CTableHeaderCell style={{ width: "5%" }} scope="col">
            No
          </CTableHeaderCell>
          <CTableHeaderCell style={{ width: "15%" }} scope="col">
            Yoshlar malumoti
          </CTableHeaderCell>
          <CTableHeaderCell style={{ width: "25%" }} scope="col">
            Komaklashish chora tabbirlari
          </CTableHeaderCell>
          <CTableHeaderCell style={{ width: "10%" }} scope="col">
            Muddati
          </CTableHeaderCell>
          <CTableHeaderCell style={{ width: "15%" }} scope="col">
            Mahalla masullari
          </CTableHeaderCell>
          <CTableHeaderCell style={{ width: "20%" }} scope="col">
            Biriktirilgan masullar
          </CTableHeaderCell>
          {/* <CTableHeaderCell style={{ width: '10%' }} scope="col">
            Harakatlar
          </CTableHeaderCell> */}
        </CTableRow>
      </CTableHead>

      <EditTopshiriqYuklash
        setEditTopYukShow={setEditTopYukShow}
        editTopYukShow={editTopYukShow}
      />

      <CTableBody>
        {posts?.map((item, index) => {
          let a = index + 1
          return (
            <CTableRow key={index} align="middle" style={{ fontWeight: "500" }}>
              <CTableHeaderCell className="" scope="row">
                {a}
              </CTableHeaderCell>
              <CTableDataCell>
                <p style={{ margin: 0, padding: 0, fontWeight: "600" }}>
                  {item?.full_name}
                </p>
                <p style={{ margin: 0, padding: 0 }}>
                  {item?.birth_date}, {item?.village},{" "}
                </p>
                <p style={{ margin: 0, padding: 0 }}>Tel.: {item?.phone}</p>
                <p>{item?.additional_information}</p>
              </CTableDataCell>
              <CTableDataCell>
                <ol>
                  {item?.people?.map((c, index) => (
                    <div>
                      <li key={index}>{c?.task}</li>
                      <br />
                      <br />
                    </div>
                  ))}
                </ol>
              </CTableDataCell>
              <CTableDataCell>
                {item?.people?.map((item, index) => (
                  <div key={index}>
                    <p style={{ margin: 0, padding: 0 }}>{item?.comment}</p>
                    <p>{item?.date_line}</p>
                    <br />
                  </div>
                ))}
              </CTableDataCell>
              <CTableDataCell>
                {item?.people?.map((item, index) => (
                  <div>
                    <p style={{ margin: 0, padding: 0 }}>
                      {item?.id_user?.position}
                    </p>
                    <p style={{ margin: 0, padding: 0 }}>
                      {" "}
                      {item?.id_user?.first_name} {item?.id_user?.last_name}{" "}
                    </p>

                    <p style={{ margin: 0, padding: 0 }}>
                      {item?.id_user?.phone}
                    </p>
                    <br />
                  </div>
                ))}
              </CTableDataCell>
              <CTableDataCell>
                <p>{item?.responsible_employee?.position}</p>
                <h6>
                  {item?.responsible_employee?.first_name}{" "}
                  {item?.responsible_employee?.last_name}
                </h6>
                <p>{item?.responsible_employee?.phone}</p>
              </CTableDataCell>
              {/* <CTableDataCell>
              <div className="btnBox d-flex flex-column gap-3">
                <CButton className="text-white" color="warning"  onClick={() => setEditTopYukShow(!editTopYukShow)}>
                  <CIcon icon={cilPencil} size="lg"></CIcon>
                </CButton>
                <CButton color="danger">
                  <CIcon className="text-white" icon={cilTrash} size="lg"></CIcon>
                </CButton>
              </div>
            </CTableDataCell> */}
            </CTableRow>
          )
        })}
      </CTableBody>
    </CTable>
  )
}
export default Topshiriqlar
