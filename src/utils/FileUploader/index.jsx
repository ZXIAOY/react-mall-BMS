
import React from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends React.Component {
  render(){
    // 设置属性
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName: 'upload_file',
      dataType: 'json',
      chooseAndUpload: true,
      uploadSuccess: (res)=>{
        this.props.onSuccess(res.data);
      },
      uploadaError: this.props.onError
    }

    // 返回组件
    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload" className="btn btn-xs btn-primary">选择图片</button>
        {/* <button ref="uploadBtn">上传</button> */}
      </FileUpload>
    )	        
  }
}

export default FileUploader;
