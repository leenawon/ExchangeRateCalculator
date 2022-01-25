import React from "react";
import styled from "styled-components";
import Util from '../../utils';

const API_KEY = process.env.REACT_APP_CURRENCY_KEY;

const requestApi = async args => {
  const getApi = (url, params) => {
    let body = {
      url: url,
      method: 'GET',
      data: { params, params }
    }
  }
}

const requestParams = {
  url: '/convert',
  method: 'GET',
  params: {

  }
}

export default function First() {
  return <div>first1</div>;
}
