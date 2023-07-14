import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilLockLocked, cilUser } from "@coreui/icons"
import gerb from "../../../assets/images/Login/gerb.jpg"
import axios from "axios"
import { url } from "src/utils/config"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

const Login = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const postData = { username, password }
      const { data } = await axios.post(`${url}/user_sigin_in_views/`, postData)

      const config = {
        headers: {
          Authorization: "Bearer " + data.token.accsess,
        },
      }
      Cookies.set("token", JSON.stringify(data.token.accsess), {expires: 7,})

      const res = await axios.get(`${url}/user_information_views/`, config)
      console.log(res)
      const role = res?.data?.groups[0]?.name
      Cookies.set("role", JSON.stringify(role))
      Cookies.set("user", JSON.stringify(res?.data))

      switch (role) {
        case "yetakchi":
          navigate("/home")
          break
        case "mahalla":
          navigate("/main")
          break;
        case "sektor":
          navigate("/main1")
          break;
        case "komissiya":
          navigate("/main2/1")
          break;
        default:
          navigate("/")
      }
      toast.success("Muvaffaqiyatli ro'yhatdan o'tdingiz")
    } catch (error) {
      console.log(error)
      toast.error("Login yoki parol noto'g'ri")
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <img
                      className="d-block m-auto"
                      src={gerb}
                      alt="slide 1"
                      width={150}
                    />
                    <h2 className="py-3 text-center">
                      Buxoro viloyati hokimligi
                    </h2>
                    <CInputGroup className="mb-3" py aria-required>
                      <CInputGroupText className="py-3">
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Login"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText className="py-3">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Parol"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <CButton
                          type="submit"
                          color="primary"
                          className="px-5 py-2 d-block m-auto"
                        >
                          Tizimga kirish
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
