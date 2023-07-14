import React, { useEffect, useState } from "react"

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react"
import { Link } from "react-router-dom"
import axios from "axios"
import { mahalla_url } from "src/utils/config"
import Cookies from "js-cookie"

const Dashboard3 = () => {
  const [category, setCategory] = useState([])
  let token = ""

  useEffect(() => {
    let a = Cookies.get("token")
    if (a) {
      let b = JSON.parse(a)
      // setToken(b)
      token = b
    }
  }, [])

  const getCategory = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      const { data } = await axios.get(
        `${mahalla_url}/categoriya_people_all_views/`,
        config,
      )
      console.log(data)
      setCategory(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
      <CRow>
        <CCol className="d-flex flex-wrap justify-content-center  gap-4">
          {category?.map((item, index) => (
            <CCard key={index} style={{ width: "320px" }}>
              <CCardBody className="d-flex flex-column justify-content-between m-2">
                <CCardText className="fs-4 font-bold">
                  <b>{item?.name}</b>
                </CCardText>

                <Link
                  to={`/table3/${item?.id}`}
                  className="w-75 btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  Batafsil ma&apos;lumot
                </Link>
              </CCardBody>
            </CCard>
          ))}
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard3
