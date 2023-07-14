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
  CFormCheck,
} from "@coreui/react"
import axios from "axios"
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { mahalla_url, url_media } from "src/utils/config"

const FaylYuklash4 = (rest) => {
  const [validated, setValidated] = useState(false)
  const [filesData, setFilesData] = useState([])

  const [token1, setToken] = useState("")
  const navigate = useNavigate()
  let token = ""
  const [files, setFiles] = useState("")
  useEffect(() => {
    let a = Cookies.get("token")
    if (a) {
      let b = JSON.parse(a)
      setToken(b)
      token = b
    }
  }, [])

  const getItemData = async () => {
    try {
      const {data} = await axios.get(`${mahalla_url}/employe_task_files/${rest.taskId}/`)
      console.log(data)
      setFilesData(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(rest.taskId)
  useEffect(() => {
    getItemData()
  },[rest.taskId])

  // const setHand = async () => {
  //   try {
  //     const config1 = {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     }
  //     const res = await axios.get(
  //       `${mahalla_url}/categoriya_people_deteile/${rest.useId1}/`,
  //       config1,
  //     )

  //     rest.setData(res?.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  // useEffect(() => {
  //   setHand()
  // },[rest.taskId])

  // console.log(rest.useId1)
  return (
    <>
      <CModal
        backdrop="static"
        visible={rest.uploadModalShow}
        onClose={() => rest.setUploadModalShow(false)}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Fayl yuklash</CModalTitle>
        </CModalHeader>
        <CModalBody>

            {filesData?.map((item) => (
              <div style={{display:"flex"}}>
                <p>
                  {item?.id_user?.first_name} {item?.id_user?.last_name}:
                </p>
                <div>
                {item?.files ? (
                   <a
                   href={`${url_media}${item?.files}/`}
                   download="Example-PDF-document"
                   target="_blank"
                   rel="noreferrer"
                   style={{ textDecoration: "none" }}
                 >
                   <p style={{marginLeft:"20px"}}>{item?.files}</p>
                 </a>
                    // <p>{item?.files}</p>
                  ): (
                    <p style={{marginLeft:"12px"}}>Fayl yuklanmagan</p>
                  )}
                </div>

              </div>
            ))}

            <CCol xs={12}>
              {/* <CButton color="primary" type="submit"
                disabled={rest?.filesData[0]?.is_user}
              >
                Qo'shish
              </CButton> */}
              <CButton
                className="mx-3"
                color="secondary"
                onClick={() => rest.setUploadModalShow(false)}
              >
                bekor qilish
              </CButton>
            </CCol>

        </CModalBody>
      </CModal>
    </>
  )
}
export default FaylYuklash4
