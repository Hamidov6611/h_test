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
import { mahalla_url } from "src/utils/config"

const AddRole2 = (rest) => {
  const [validated, setValidated] = useState(false)

  const [full_name, setFullName] = useState("")
  const [birth_date, setBirthDate] = useState("")
  const [phone, setPhone] = useState("")
  const [village, setVillage] = useState("")
  const [additional_information, setAddInfo] = useState("")
  const [id_categor, setIdCat] = useState([])
  const [responsible_employee, setIdEmp] = useState([])
  const [id1, setId1] = useState("")
  const [id2, setId2] = useState("")
  const [token1, setToken] = useState("")
  let token = ""

  useEffect(() => {
    let a = Cookies.get("token")
    if (a) {
      let b = JSON.parse(a)
      setToken(b)
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
        `${mahalla_url}/categoriya_people_all_views/`,
        config,
      )
      console.log(data)
      const sektorData = await axios.get(
        `${mahalla_url}/sektor_employe_views/`,
        config,
      )
      setIdEmp(sektorData.data)
      console.log(sektorData.data)
      setIdCat(data)
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
      const postData = {
        full_name,
        birth_date,
        phone,
        village,
        additional_information,
        responsible_employee: id1,
        id_categor: id2,
      }
      const data = await axios.post(
        `${mahalla_url}/people_all_mahalla_views/`,
        postData,
        config,
      )

      const post = await axios.get(
        `${mahalla_url}/people_all_mahalla_views/`,
        config,
      )

      rest.setPosts(post?.data)
      rest.setAddModalShow(false)
      setFullName("")
      setBirthDate("")
      setPhone("")
      setVillage("")
      setAddInfo("")
      setId1("")
      setId2("")
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <CModal
        backdrop="static"
        visible={rest.addModalShow}
        onClose={() => rest.setAddModalShow(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Yoshlarni ro'yxatga olish</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol xs={6}>
              <CFormInput
                type="text"
                feedbackValid="Looks good!"
                id="validationCustom01"
                label="F.I.O"
                required
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                ZfeedbackValid="Looks good!"
                id="validationCustom02"
                label="Telefon raqam"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="validationCustomUsername">
                Tug&apos;ulgan kun
              </CFormLabel>
              <CInputGroup className="has-validation">
                <CFormInput
                  type="date"
                  aria-describedby="inputGroupPrependFeedback"
                  feedbackValid="Please choose a username."
                  id="validationCustomUsername"
                  required
                  value={birth_date}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </CInputGroup>
            </CCol>
            <CCol xs={6}>
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                id="validationCustom03"
                label="Qishloq"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
              />
            </CCol>

            <CCol xs={6}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Sektor rahbari
              </CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setId1(e.target.value)}
              >
                <option>Sektor rahbarini tanlang</option>
                {responsible_employee?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.first_name} {item?.last_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol xs={6}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Yo'nalish
              </CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setId2(e.target.value)}
              >
                <option>Yo'nalishni tanlang</option>
                {id_categor?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="exampleFormControlInput1">
                Qo&apos;shimcha malumot
              </CFormLabel>
              <CFormTextarea
                required
                value={additional_information}
                onChange={(e) => setAddInfo(e.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Qo&apos;shish
              </CButton>
              <CButton
                className="mx-3"
                color="secondary"
                onClick={() => rest.setAddModalShow(false)}
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

export default AddRole2
