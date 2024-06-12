import PropTypes from 'prop-types';
import { Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';

import uploadFile from 'src/utils/upload';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function AddMutipleFile({ onImageSelect, initialFiles }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      const initialFileList = initialFiles.map((file, index) => {
        const fileName = file.imageUrl
          ? file.imageUrl.substring(file.imageUrl.lastIndexOf('/') + 1)
          : `file-${index}`;
        return {
          uid: index.toString(),
          name: fileName,
          status: 'done',
          url: file.imageUrl,
          preview: file.imageUrl,
          thumbUrl: file.imageUrl,
        };
      });
      setFileList(initialFileList);
    }
  }, [initialFiles]);

  useEffect(() => {
    if (onImageSelect) {
      onImageSelect(fileList);
    }
  }, [fileList, onImageSelect]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(
      newFileList.map((file) => {
        if (file.originFileObj) {
          return file;
        }
        return {
          ...file,
          originFileObj: new File([file], file.name, { type: file.type }),
        };
      })
    );
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const downloadURL = await uploadFile(file);
      onSuccess(null, file);
      file.url = downloadURL; // Set URL for preview
      setFileList((prevList) => prevList.map((item) => (item.uid === file.uid ? file : item)));
    } catch (error) {
      onError(error);
    }
  };

  return (
    <>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

AddMutipleFile.propTypes = {
  onImageSelect: PropTypes.func.isRequired,
  initialFiles: PropTypes.array,
};

AddMutipleFile.defaultProps = {
  initialFiles: [],
};

export default AddMutipleFile;
