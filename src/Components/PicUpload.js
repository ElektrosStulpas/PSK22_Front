import React from 'react';

const PicUpload = (props) => {

    const [state, setState] = props.currentState

    // var onFileUpload = () => {
    
    //     const formData = new FormData();
      
    //     // Update the formData object
    //     formData.append(
    //       "myFile",
    //       state.selectedFile,
    //       state.selectedFile.name
    //     );
    //     // Details of the uploaded file
    //     console.log(state.selectedFile);
      
    //     // Request made to the backend api
    //     // Send formData object
    //     // axios.post("api/uploadfile", formData); //
    //   };

      var fileData = () => {
    
        if (state.pic) {
           
          return (
            <div>
              <img src={URL.createObjectURL(state.pic)} alt="unable to load"/>
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Placeholder for the pic</h4>
            </div>
          );
        }
      };

    return (
        <div>
          {fileData()}
            <div>
                <input type="file" onChange={(event) => props.handleChange('pic', event.target.files[0])} />
                {/* <button onClick={onFileUpload}>
                  Upload!
                </button> */}
            </div>
        </div>
    );
}

export default PicUpload;