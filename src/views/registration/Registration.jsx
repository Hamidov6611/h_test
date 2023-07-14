import { cilPencil, cilTrash, cilDataTransferDown } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import {
  CButton,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"
import React, { useEffect, useState } from "react"
import AddYetakchi from "../Crud-modal/Yetakchi/AddYetakchi"
import EditYetakchi from "../Crud-modal/Yetakchi/EditYetakchi.jsx"
import TopshiriqYuklash from "../Crud-modal/Yetakchi/TopshiriqYuklash"
import axios from "axios"
import { mahalla_url } from "src/utils/config"
import Cookies from "js-cookie"

const Registration = () => {
  const [addModalShow, setAddModalShow] = useState(false)
  const [editModalShow, setEditModalShow] = useState(false)
  const [uploadModalShow, setUploadModalShow] = useState(false)
  const [posts, setPosts] = useState([])
  const [taskId, setTaskId] = useState("")

  // const [token, setToken] = useState("")
  let token = ""

  useEffect(() => {
    let a = Cookies.get("token")
    if (a) {
      let b = JSON.parse(a)
      // setToken(b)
      token = b
    }
  }, [])
  console.log("Bearer " + token)

  const getData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      const { data } = await axios.get(
        `${mahalla_url}/people_all_mahalla_views/`,
        config,
      )

      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const uploadHandler = (id) => {
    setUploadModalShow(!uploadModalShow)
    setTaskId(id)
  }

  return (
    <CContainer>
      <CCol className="d-flex justify-content-between mt-3">
        <h3>
          <b>Yoshlarni ro&apos;yxatga olish</b>
        </h3>
        <CButton
          className="px-5"
          onClick={() => setAddModalShow(!addModalShow)}
        >
          Qo&apos;shish
        </CButton>
      </CCol>

      <AddYetakchi
        setPosts={setPosts}
        setAddModalShow={setAddModalShow}
        addModalShow={addModalShow}
      />
      <EditYetakchi
        setEditModalShow={setEditModalShow}
        editModalShow={editModalShow}
      />
      <TopshiriqYuklash
        taskId={taskId}
        setUploadModalShow={setUploadModalShow}
        uploadModalShow={uploadModalShow}
      />

      <CTable className="text-center mt-5" bordered borderColor={"dark"}>
        <CTableHead style={{ backgroundColor: "#3c4b64", color: "white" }}>
          <CTableRow align="middle">
            <CTableHeaderCell style={{ width: "5%" }} scope="col">
              <b>No</b>
            </CTableHeaderCell>
            <CTableHeaderCell style={{ width: "10%" }} scope="col">
              <b> F.I.O</b>
            </CTableHeaderCell>
            <CTableHeaderCell style={{ width: "15%" }} scope="col">
              <b>Telefon raqam</b>
            </CTableHeaderCell>
            <CTableHeaderCell style={{ width: "15%" }} scope="col">
              <b>Tugilgan kun</b>
            </CTableHeaderCell>
            <CTableHeaderCell style={{ width: "15%" }} scope="col">
              <b>Qishloq</b>
            </CTableHeaderCell>
            <CTableHeaderCell style={{ width: "30%" }} scope="col">
              <b>Qoshimcha malumot</b>
            </CTableHeaderCell>
            <CTableHeaderCell style={{ width: "10%" }} scope="col">
              <b>Harakatlar</b>
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {posts?.map((item, index) => {
            let a = index + 1
            return (
              <CTableRow align="middle" style={{ fontWeight: "500" }}>
                <CTableHeaderCell scope="row">{a}</CTableHeaderCell>
                <CTableDataCell>{item?.full_name}</CTableDataCell>
                <CTableDataCell>{item?.phone}</CTableDataCell>
                <CTableDataCell>{item?.birth_date}</CTableDataCell>
                <CTableDataCell>{item?.village}</CTableDataCell>
                <CTableDataCell>{item?.additional_information}</CTableDataCell>
                <CTableDataCell>
                  <div className="btnBox d-flex flex-column gap-3">
                    <CButton
                      className="text-white"
                      color="primary"
                      onClick={() => uploadHandler(item?.id)}
                    >
                      <CIcon icon={cilDataTransferDown} size="lg"></CIcon>
                    </CButton>
                    {/* <CButton
                      className="text-white"
                      color="warning"
                      onClick={() => setEditModalShow(!editModalShow)}
                    >
                      <CIcon icon={cilPencil} size="lg"></CIcon>
                    </CButton>
                    <CButton color="danger">
                      <CIcon
                        className="text-white"
                        icon={cilTrash}
                        size="lg"
                      ></CIcon>
                    </CButton> */}
                  </div>
                </CTableDataCell>
              </CTableRow>
            )
          })}
          {/* <CTableRow align="middle" style={{fontWeight:"500"}}>
            <CTableHeaderCell scope="row">1</CTableHeaderCell>
            <CTableDataCell>Jobir Ashurov</CTableDataCell>
            <CTableDataCell>888300124</CTableDataCell>
            <CTableDataCell>20.05.2003</CTableDataCell>
            <CTableDataCell>Xosa</CTableDataCell>
            <CTableDataCell>
              (2022 йил 10 октябрь МЖК 187¹ моддаси безорилик билан профилактик
              назоратга олинган.) 2023 йил январдан Миллий гвардия вилоят
              бошқармаси сафдор ходими лавозимида ишлаб келмоқда.
            </CTableDataCell>
            <CTableDataCell>
              <div className="btnBox d-flex flex-column gap-3">
              <CButton className="text-white" color="primary"  onClick={() => setUploadModalShow(!uploadModalShow)}>
                  <CIcon icon={cilDataTransferDown} size="lg"></CIcon>
                </CButton>
                <CButton className="text-white" color="warning"  onClick={() => setEditModalShow(!editModalShow)}>
                  <CIcon icon={cilPencil} size="lg"></CIcon>
                </CButton>
                <CButton color="danger">
                  <CIcon
                    className="text-white"
                    icon={cilTrash}
                    size="lg"
                  ></CIcon>
                </CButton>
              </div>
            </CTableDataCell>
          </CTableRow> */}
        </CTableBody>
      </CTable>
    </CContainer>
  )
}

export default Registration
