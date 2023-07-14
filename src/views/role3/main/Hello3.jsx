import { cilDataTransferDown, cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mahalla_url } from 'src/utils/config';
import FaylYuklash3 from './FaylYuklash3';
const Hello3 = () => {
  const [data, setData] = useState([]);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [filesData, setFilesData] = useState([]);
  const [isAccept, setIsAccept] = useState(false);
  const { id } = useParams();
  const [token, setToken] = useState('');
  let token1 = '';
  useEffect(() => {
    let a = Cookies.get('token');
    if (a) {
      let b = JSON.parse(a);
      setToken(b);
      token1 = b;
    }
  });

  const getData = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/categoriya_employe_deteile/${id}/`,
        config,
      );
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getData2 = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token1,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/employe_task_files/${taskId}/`,
        config,
      );
      setFilesData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
console.log(taskId)
  useEffect(() => {
    getData2();
  }, [taskId]);

  const uploadHandler = (id) => {
    setUploadModalShow(!uploadModalShow);
    setTaskId(id);
  };
  return (
    <CTable bordered borderColor="dark" className="text-center">
      <CTableHead style={{ backgroundColor: "#3c4b64", color: "white" }}>
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
          <CTableHeaderCell style={{ width: '10%' }} scope="col">
            Harakatlar
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <FaylYuklash3
          useId1={id}
          filesData={filesData}
          data={data}
          setData={setData}
          taskId={taskId}
          isAccept={isAccept}
          setIsAccept={setIsAccept}
          setUploadModalShow={setUploadModalShow}
          uploadModalShow={uploadModalShow}
        />
        {data?.map((item, index) => {
          let a = index + 1;
          return (
            <CTableRow key={index} align="middle" style={{ fontWeight: "500" }}>
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
                  {item?.people?.map((c, index) => (
                    <li key={index}>
                      <p>{c?.task}</p>
                    </li>
                  ))}
                </ol>
              </CTableDataCell>
              <CTableDataCell>
                {item?.people?.map((item, index) => (
                  <div key={index}>
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
                  <div key={index}>
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
              <CTableDataCell>
                <div className="btnBox d-flex flex-column gap-3">
                  <CButton
                    className="text-white"
                    color="primary"
                    onClick={() => uploadHandler(item?.id)}
                  >
                    <CIcon icon={cilDataTransferDown} size="lg"></CIcon>
                  </CButton>

                  {/* <CButton className="text-white" color="warning">
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
          );
        })}
      </CTableBody>
    </CTable>
  );
};
export default Hello3;
