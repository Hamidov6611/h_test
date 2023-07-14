import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CCardText,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormTextarea,
} from "@coreui/react"
import axios from "axios"
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { mahalla_url } from "src/utils/config"

const TopshiriqYuklash = (rest) => {
  const [validated, setValidated] = useState(false)
  const [id1, setId1] = useState("")
  const [id2, setId2] = useState("")
  const [task, setTask] = useState("")
  const [comment, setComment] = useState("")
  const [id1Data, setId1Data] = useState([])
  const [id2Data, setId2Data] = useState([])
  const [token1, setToken] = useState("")
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
      const { data } = await axios.get(
        `${mahalla_url}/task_categoriya_all/`,
        config,
      )
      console.log(data)
      const xodim = await axios.get(
        `${mahalla_url}/employe_get_all_views/`,
        config,
      )
      setId1Data(data)
      setId2Data(xodim.data)
      console.log(xodim.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token1,
        },
      }
      const postData = { id_task_category: id1, id_user: id2, task, comment }
      const data = await axios.post(
        `${mahalla_url}/peopele_get_views/${rest.taskId}/`,
        postData,
        config,
      )
      console.log(data)
      navigate("/topshiriqlar")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <CModal
        backdrop="static"
        visible={rest.uploadModalShow}
        onClose={() => rest.setUploadModalShow(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Topshiriq yuklash</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol xs={6}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Ijroni tanlash
              </CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setId1(e.target.value)}
              >
                <option>Ijroni tanlang</option>
                {id1Data?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="exampleFormControlInput1">Xodim</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setId2(e.target.value)}
              >
                <option>Xodimni tanlang</option>
                {id2Data?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.first_name} {item?.last_name} ({item?.position})
                  </option>
                ))}
              </CFormSelect>
            </CCol>

            <CCol xs={12}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Topshiriq mazmuni
              </CFormLabel>
              <CFormTextarea
                required
                onChange={(e) => setTask(e.target.value)}
              />
            </CCol>

            <CCol xs={12}>
              <CFormLabel htmlFor="exampleFormControlInput1">Izoh</CFormLabel>
              <CFormTextarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Qo'shish
              </CButton>
              <CButton
                className="mx-3"
                color="secondary"
                onClick={() => rest.setUploadModalShow(false)}
              >
                bekor qilish
              </CButton>
            </CCol>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}
export default TopshiriqYuklash
