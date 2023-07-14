import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from "react-router-dom"

import './style.css';
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CBadge,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import logo from '../assets/images/Login/gerb.jpg';
import { AppSidebarNav } from './AppSidebarNav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from '../_nav.js';
import navigation2 from '../_nav2.js';
import navigation3 from '../_nav3.js';
import navigation4 from '../_nav4.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { mahalla_url } from 'src/utils/config';
import CIcon from '@coreui/icons-react';
import { cilPuzzle, cilSpeedometer } from '@coreui/icons';
import { Link } from 'react-router-dom';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [redi, setRedi] = useState();
  const [distId, setDistId] = useState("")
  const [role, setRole] = useState('');
  // let role = ""
  useEffect(() => {
    let a = Cookies.get('role');
    if (a) {
      let b = JSON.parse(a);
      setRole(b);
      // role = b
    }
  }, []);

  useEffect(() => {
    if (role == 'yetakchi') {
      setRedi(navigation);
    }
    if (role == 'mahalla') {
      setRedi(navigation2);
    }
    if (role == 'sektor') {
      setRedi(navigation3);
    }
    if (role == 'komissiya') {
      setRedi(navigation4);
    }
  }, [role]);

  const [districts, setDistricts] = useState([]);
  let token = '';

  useEffect(() => {
    let a = Cookies.get('token');
    if (a) {
      let b = JSON.parse(a);
      // setToken(b)
      token = b;
    }
  }, []);

  const getCategory = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const { data } = await axios.get(
        `${mahalla_url}/district_all_views/`,
        config,
      );
      console.log(data);
      setDistricts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarBrand
        className="d-none d-md-flex flex-column bg-white py-2"
        to="/"
      >
        <img src={logo} alt="" width={50} />
        <h3 className="text-dark fs-6">Buxoro viloyati hokimligi</h3>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={redi} />
        </SimpleBar>
        {role == 'komissiya' && (
          <CSidebarNav>
            <CNavGroup toggler="Tumanlar">
              {districts?.map((item, index) => {
                return (
                  <CNavGroup key={index} toggler={item?.name} onClick={() => setDistId(item?.id)}>
                    {item?.id_sektor?.map((c, index) => {
                      return (
                        <CNavItem key={index} style={{ cursor: 'pointer'}}>
                          <Link
                            to={`/main2/${c?.id}/${distId}`}
                            style={{
                              textDecoration: 'none',
                              color: 'white',
                              // marginLeft: '160px',
                              // marginBottom:"10px",
                              padding:"20px 0"
                            }}
                          >
                            <div style={{display:"flex", flexDirection:"row", marginLeft:"55px"}} className='navItem'>
                            <CIcon
                              customClassName="nav-icon"
                              icon={cilPuzzle}
                            />
                            <p>{c?.name}</p>
                            </div>
                          </Link>
                        </CNavItem>
                      );
                    })}
                  </CNavGroup>
                );
              })}
              {/* <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
              item
            </CNavItem>
            <CNavItem href="#">
              <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
              item
            </CNavItem> */}
            </CNavGroup>
          </CSidebarNav>
        )}
      </CSidebarNav>

      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
