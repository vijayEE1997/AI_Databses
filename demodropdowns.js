import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



function DemoDrop(props){
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const [dropdownOpen4, setDropdownOpen4] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggle1 = () => setDropdownOpen1(prevState => !prevState);
  const toggle2 = () => setDropdownOpen2(prevState => !prevState);
  const toggle3 = () => setDropdownOpen3(prevState => !prevState);
  const toggle4 = () => setDropdownOpen4(prevState => !prevState);

  return (
      <div classname="dropdown-outer" style={{display:"flex",flexDirection:"row",justifyContent:"center"}}  >
      <div className="drop-semi" style={{borderRadius:"0px 0px 0px",display:"flex",flexDirection:"row",justifyContent:"space-between"}}  >

<div clasname="d1 " >
       <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
        STATES
        </DropdownToggle>
        <DropdownMenu>
        
        <DropdownItem >Andhra Pradesh</DropdownItem>
        <DropdownItem>Arunachal Pradesh</DropdownItem>
        <DropdownItem>Assam</DropdownItem>        
        <DropdownItem>Bihar</DropdownItem>
        <DropdownItem>Chattisgarh</DropdownItem>
        <DropdownItem>Goa</DropdownItem>
        <DropdownItem>Gujarat</DropdownItem>
        <DropdownItem>harayana</DropdownItem>
        <DropdownItem>Himachal Pradesh</DropdownItem> 
        <DropdownItem>Jharkand</DropdownItem>
        <DropdownItem>Jammu And Kashmir</DropdownItem>
        <DropdownItem>Karnataka</DropdownItem> 
        <DropdownItem>Kerala</DropdownItem>
        <DropdownItem>Madhya Pradesh</DropdownItem>
        <DropdownItem>Maharashatra</DropdownItem>
        <DropdownItem>Manipur</DropdownItem>
        <DropdownItem>Meghalaya</DropdownItem> 
        <DropdownItem>Mizoram</DropdownItem>
        <DropdownItem>Nagaland</DropdownItem> 
        <DropdownItem>Odisha</DropdownItem>
        <DropdownItem>Punjab</DropdownItem>
        <DropdownItem>Rajasthan</DropdownItem>
        <DropdownItem>Sikkim</DropdownItem>
        <DropdownItem>Tamil Nadu</DropdownItem> 
        <DropdownItem>Telangana</DropdownItem>
        <DropdownItem>Tripura</DropdownItem> 
        <DropdownItem>Uttarakand</DropdownItem>
        <DropdownItem>Westbengal</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>

    <div clasname="d2" style={{borderRadius:"0px 0px 0px "}}>


      <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
      <DropdownToggle caret>
        DISTRICTS
      </DropdownToggle>


      <DropdownMenu>
        <DropdownItem >1</DropdownItem>
        <DropdownItem>2</DropdownItem>
        <DropdownItem >3</DropdownItem>
        <DropdownItem>4</DropdownItem>
        <DropdownItem>5</DropdownItem>
        <DropdownItem>6</DropdownItem>
      </DropdownMenu>
    
    </Dropdown>
     </div>

     <div clasname="d3" style={{borderRadius:"0px 0px 0px "}}>


<Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
<DropdownToggle caret>
 SUB- DISTRICTS
</DropdownToggle>


<DropdownMenu>
  <DropdownItem >A</DropdownItem>
  <DropdownItem>B</DropdownItem>
  <DropdownItem >C</DropdownItem>
  <DropdownItem>D</DropdownItem>
  <DropdownItem>E</DropdownItem>
  <DropdownItem>F</DropdownItem>
</DropdownMenu>
</Dropdown>
</div>


<div clasname="d4" style={{borderRadius:"0px 0px 0px "}}>
<Dropdown isOpen={dropdownOpen3} toggle={toggle3}>
<DropdownToggle caret>
 WARD
</DropdownToggle>


<DropdownMenu>
  <DropdownItem >1</DropdownItem>
  <DropdownItem>2</DropdownItem>
  <DropdownItem >3</DropdownItem>
  <DropdownItem>4</DropdownItem>
  <DropdownItem>5</DropdownItem>
  <DropdownItem>6</DropdownItem>
</DropdownMenu>
</Dropdown>
</div>


<div clasname="d5" >
<Dropdown isOpen={dropdownOpen4} toggle={toggle4}>
<DropdownToggle caret>
 VILLAGE/TOWN
</DropdownToggle>


<DropdownMenu>
  <DropdownItem >1</DropdownItem>
  <DropdownItem>2</DropdownItem>
  <DropdownItem >3</DropdownItem>
  <DropdownItem>4</DropdownItem>
  <DropdownItem>5</DropdownItem>
  <DropdownItem>6</DropdownItem>
</DropdownMenu>
</Dropdown>
</div>
</div>

     </div>

  
  );
}

export default DemoDrop