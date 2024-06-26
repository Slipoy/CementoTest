import React from 'react';
import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow: auto;
  position: relative;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ControlBar = styled.div`
  padding: 10px;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  width: 15%;
  align-items:start;
  position: sticky;
  top: 0;
  
  .section {
    display:flex;
    flex-direction:column;
    align-items:start;
  }
  .section-title {
    font-weight:bold;
  }

  .column-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  label {
    cursor: pointer;
  }
`
export const StyledButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    background-color: #004494;
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }
`;

export const StaledTable = styled.table`
  position: relative;
  height: auto;
  display: grid;
  flex: 1;
  padding: 0 0 0 0;
`
export const StyledThead = styled.thead`
  display: grid;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: burlywood;
  height: 50px;
  align-items: center;
  
  
  tr {
    display: flex;
    width: 100%;
    color: #a6a6a6;
  }
  
  th {
    display: flex;
    width: 100%;
    color: black;
  }
  div {
    cursor: pointer;
  }
`;



export const StyledTbody = styled.tbody`
  display: grid;
  position: relative;

  tr {
    display: flex;
    position: absolute;
    width: 100%;
    color: #ffffff;
    font-weight: 500;
    height: 50px;
    align-items: center;
  }

  td {
    display: flex;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color:black;
  }
`;


