import React, { useEffect, useState } from 'react';

import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
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
  CFormSelect,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { mahalla_url } from 'src/utils/config';
import Cookies from 'js-cookie';
import { cilDataTransferDown, cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import FaylYuklash4 from './FaylYuklash4';

const Dashboard4 = () => {
  const [districts, setDistricts] = useState([]);
  const [category, setCategory] = useState([]);
  const [yonalish, setYonalish] = useState([]);
  const [mahalla, setMahalla] = useState([]);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [id2, setId2] = useState('');
  const [mahallaId, setMahallaId] = useState('');
  const [taskId, setTaskId] = useState('');

  let token = '';
  const [tuman, setTuman] = useState('');
  const [token1, setToken] = useState('');
  const { id, id1 } = useParams();
  const getCookiesData = () => {
    const a = Cookies.get('token');
    if (a) {
      const b = JSON.parse(a);
      setToken(b);
      token = b;
    }
  };

  useEffect(() => {

    getCookiesData()
  }, []);
  useEffect(() => {
    const getCookiesData = () => {
      const a = Cookies.get('token');
      if (a) {
        const b = JSON.parse(a);
        setToken(b);
        token = b;
      }
    };
    getCookiesData()
  }, [id, id1]);

  const getCategory = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/district_all_views/`,
        config,
      );
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    category?.filter((c, index) => {
      if (c.id == id1) {
        setTuman(c?.name);
        console.log(c);
      }
    });
    getCategory();
  }, [id, id1]);

  useEffect(() => {
    getData();

    getCategory();
  }, []);

  const getData = async () => {
    try {
     if(id && id1) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/districk_sektor_deteteile/${id ? id : 1}/${id1}`,
        config,
      );
      console.log(data);
      setDistricts(data?.results);
    }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [id, id1]);
  useEffect(() => {
    getData();
    getCategory();
  }, [id, id1, id2, mahallaId]);

  const getData2 = async () => {
    try {
     if(id && id1) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1 || token,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/categoriya_people_all_views/`,
        config,
      );
      const data1 = await axios.get(
        `${mahalla_url}/mahalla_all_views/${id}/${id1}/`,
        config,
      );

      setYonalish(data);
      setMahalla(data1.data);
    }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData2();
  }, [id, id1]);

  const filterHandler = async () => {
    try {
     if(id && id1 && id2) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/categoriya_people_views/${id2}/${id}/${id1}/`,
        config,
      );
      setDistricts(data?.results);
      console.log(data);
    }
    } catch (error) {
      console.log(error);
    }
  };

  const filterByMahallaAndCategory = async () => {
    try {
     if(id && id1 && id2 && mahallaId) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/mahalla_deteile/${id2}/${mahallaId}/${id}/${id1}/`,
        config,
      );
      setDistricts(data?.results);
    }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterHandler();
  }, [id, id1, id2]);

  useEffect(() => {
    filterByMahallaAndCategory();
  }, [mahallaId, id2, id, id1]);

  console.log(id);

  const filterByMahalla = async () => {
    try {
      if(id && mahallaId && id1) {
        const config = {
          headers: {
            Authorization: 'Bearer ' + token1,
          },
        };
        const { data } = await axios.get(
          `${mahalla_url}/mahalla_deteile_views/${mahallaId}/${id}/${id1}/`,
          config,
        );
        setDistricts(data?.results);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterByMahalla();
  }, [id, mahallaId, id1]);

  const uploadHandler = (id) => {
    setUploadModalShow(!uploadModalShow);
    setTaskId(id);
  };

  return (
    <>
      <CRow>
        <CCardText>
          <b style={{ fontSize: '24px' }}>
            {tuman} {id}-sektor
          </b>
        </CCardText>
        <CCol
          xs={3}
          style={{
            padding: 0,
            marginBottom: '20px',
            marginRight: '40px',
            zIndex: '999',
          }}
        >
          <CFormSelect
            aria-label="Default select example"
            onChange={(e) => setId2(e.target.value)}
          >
            <option>Yo'nalishni tanlang</option>
            {yonalish?.map((item, index) => {
              return <option value={item?.id}>{item?.name}</option>;
            })}
          </CFormSelect>
        </CCol>
        <CCol
          xs={3}
          style={{ padding: 0, marginBottom: '20px', zIndex: '998' }}
        >
          <CFormSelect
            aria-label="Default select example"
            onChange={(e) => setMahallaId(e.target.value)}
          >
            <option>Mahallani tanlang</option>
            {mahalla?.map((item, index) => {
              return <option value={item?.id}>{item.name}</option>;
            })}
          </CFormSelect>
        </CCol>
        <CTable bordered borderColor="dark" className="text-center">
          <CTableHead style={{ backgroundColor: '#3c4b64', color: 'white' }}>
            <CTableRow>
              <CTableHeaderCell style={{ width: '5%' }} scope="col">
                No
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '15%' }} scope="col">
                Yoshlar malumoti
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '25%' }} scope="col">
                Komaklashish chora tabbirlari
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '10%' }} scope="col">
                Muddati
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '15%' }} scope="col">
                Mahalla masullari
              </CTableHeaderCell>
              <CTableHeaderCell style={{ width: '20%' }} scope="col">
                Biriktirilgan masullar
              </CTableHeaderCell>
              {/* <CTableHeaderCell style={{ width: '10%' }} scope="col">
                Harakatlar
              </CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>

          <FaylYuklash4
          // sektorId={id}
          // useId1={id}
          //   filesData={filesData}
          //   data={data}
          //   setData={setData}
          // taskId={taskId}
          // isAccept={isAccept}
          // setIsAccept={setIsAccept}
          // setUploadModalShow={setUploadModalShow}
          // uploadModalShow={uploadModalShow}
          />

          <CTableBody>
            {districts?.map((item, index) => {
              let a = index + 1;
              return (
                <CTableRow align="middle" style={{ fontWeight: '500' }}>
                  <CTableHeaderCell className="" scope="row">
                    {a}
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <b>{item?.full_name}</b>
                    <p>
                      {item?.birth_date}, {item?.village} qishlogi, Tel.:{' '}
                      {item?.phone}
                    </p>
                    <p>{item?.additional_information}</p>
                  </CTableDataCell>
                  <CTableDataCell>
                    <ol
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        flexDirection: 'column',
                      }}
                    >
                      {item?.people?.map((c) => (
                        <li>
                          <p>{c?.task}</p>
                        </li>
                      ))}
                    </ol>
                  </CTableDataCell>
                  <CTableDataCell>
                    {item?.people?.map((item) => (
                      <div>
                        <p style={{ margin: 0, padding: 0 }}>{item?.comment}</p>
                        <p>Muddati: {item?.date_line}</p>
                        {item?.is_user ? (
                          <CButton size="sm" color="primary">
                            Imzolangan
                          </CButton>
                        ) : (
                          <CButton size="sm" color="danger">
                            Imzolanmagan
                          </CButton>
                        )}
                        <br />
                        <br />
                      </div>
                    ))}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item?.people?.map((item, index) => (
                      <div>
                        <p>
                          {' '}
                          {item?.id_user?.first_name} {item?.id_user?.last_name}{' '}
                          {item?.id_user?.position} {item?.id_user?.phone}
                        </p>
                        <br />
                        <br />
                      </div>
                    ))}
                  </CTableDataCell>
                  <CTableDataCell>
                    {/* Вобкент туман прокурори Ж.Восиев Тел: Тел:91-401-63-42 */}
                    <p
                      style={{
                        fontWeight: '500',
                        marginRight: '2px',
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {item?.responsible_employee?.position}
                    </p>
                    <p style={{ margin: 0, padding: 0 }}>
                      {' '}
                      {item?.responsible_employee?.first_name}{' '}
                      {item?.responsible_employee?.last_name}
                    </p>
                    <p> Тел: {item?.responsible_employee?.phone}</p>
                  </CTableDataCell>
                  {/* <CTableDataCell>
                    <div className="btnBox d-flex flex-column gap-3">
                      <CButton
                        className="text-white"
                        color="primary"
                        onClick={() => uploadHandler(item?.id)}
                      >
                        <CIcon icon={cilDataTransferDown} size="lg"></CIcon>
                      </CButton>
                      <CButton className="text-white" color="warning">
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
                  </CTableDataCell> */}
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </CRow>
    </>
  );
};

export default Dashboard4;

{
  /* <CCol className="d-flex flex-wrap justify-content-center  gap-4">
          {category?.map((item, index) => (
            <CCard key={index} style={{ width: "320px" }}>
              <CCardBody className="d-flex flex-column justify-content-between m-2">
                <CCardText className="fs-4 font-bold">
                  <b>{item?.name}</b>
                </CCardText>

                <Link
                  to={`/table4/${item?.id}`}
                  className="w-75 btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  Batafsil ma&apos;lumot
                </Link>
              </CCardBody>
            </CCard>
          ))}
        </CCol> */
}
