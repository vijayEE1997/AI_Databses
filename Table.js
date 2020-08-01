import React from 'react';
import { MDBDataTable } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


function DatatablePage (props){
  let data=props.data
  let variablex=props.xscrolling
  let variabley=props.yscrolling
  let variablesort=props.sorting
  let variablepaging=props.paging
  let variablesearch=props.search

  if(variablepaging==undefined)
  variablepaging=false;

  if(variablesort==undefined)
  variablesort=false;

  if(variablesearch==undefined)
  variablesearch=false;
  
  return (
    <div style={{boxShadow: "0px 8px 8px 0px  rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
    <MDBDataTable
    theadColor="black"
    theadTextWhite
    striped
    bordered
    small
    maxHeight='60vh'
    searching={variablesearch}
    scrollX={variablex}
    scrollY={variabley}
    data={data}
    paging={variablepaging}
    responsive
    sorting={variablesort}
    autoWidth={true}
    />
    </div>
  );
}

export default DatatablePage;