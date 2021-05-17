import { render } from "enzyme";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDoctor, updateSpecialties } from "../store/singleDoctor";


export EditDocProfile extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //redirect to single doc view
  }



  render(){

    return(
     <div>
       <p>This is the Edit Doctor Component</p>
     </div>
    )
  }
}




const mapState = (state) => {
  return {
    auth: state.auth,
    singleDoc: state.singleDoctor,

  };
};

const mapDispatch = (dispatch) => {
  return {
    updateDoctor: (id, docDetails) => dispatch(setDoctor(id, docDetails)),
    updateSpecialties: (id, specialties) => dispatch(setSpecialties(id, specialties)),
  };
};

export default connect(mapState, mapDispatch)(EditDocProfile);
