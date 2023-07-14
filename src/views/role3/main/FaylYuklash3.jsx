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
} from '@coreui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mahalla_url, url_media } from 'src/utils/config';

const FaylYuklash3 = (rest) => {
  const [validated, setValidated] = useState(false);

  const [token1, setToken] = useState('');
  const navigate = useNavigate();
  let token = '';
  const [files, setFiles] = useState('');
  useEffect(() => {
    let a = Cookies.get('token');
    if (a) {
      let b = JSON.parse(a);
      setToken(b);
      token = b;
    }
  }, []);

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
    const postData = new FormData()
    // postData.append("files", files)
    postData.append("is_user", rest.isAccept)
    const data = await axios.put(
      `${mahalla_url}/employe_task_files/${rest.taskId}/`,
      postData,
      config,
    )

    console.log(data)
    toast.success("Fayl yuklandi")
    rest.setUploadModalShow(false)

  } catch (error) {
    console.log(error)
  }
  }

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
  // },[])

  // console.log(rest.useId1)
  // console.log(rest?.filesData[0]?.is_user)
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
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {rest?.filesData?.map((item) => (
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
              <CFormCheck
                checked={
                  rest?.filesData[0]?.is_user
                    ? rest?.filesData[0]?.is_user
                    : rest.isAccept
                }
                onClick={() => rest.setIsAccept((prev) => !prev)}
                id="flexCheckDefault"

              />
              <CFormLabel
                style={{ marginLeft: '10px' }}
                htmlFor="exampleFormControlInput1"
              >
                Tasdiqlash
              </CFormLabel>
            </CCol>

            <CCol xs={12}>
              <CButton
                color="primary"
                type="submit"
                disabled={rest?.filesData[0]?.is_user}
              >
                Tasdiqlash
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
  );
};
export default FaylYuklash3;
