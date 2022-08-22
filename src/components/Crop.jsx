import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import styled from "styled-components";

export default function Crop({onCrop, initSrc}){

  //한번이라도 crop이 되었으면
  const isCropped = false;

  const [image, setImage] = useState(initSrc);
  const [cropData, setCropData] = useState(initSrc);
  const [cropper, setCropper] = useState(); //Crop 인스턴스가 담긴다.
  const [cropValue, setCropValue] = useState({})

  useEffect(()=> {
    if(initSrc){
      console.log(initSrc)
    }
  }, [])

  //파일 업로드 하는 부분
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  //Crop한 데이터를 가져온다.
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((blob)=>{onCrop(blob)});
      setCropData(cropper.getCroppedCanvas().toDataURL());
      //onCrop(cropper.getCroppedCanvas().toDataURL());
    }
  };

  //crop의 값이 변경되면 call 된다
  const changeValue = (event) => {
    setCropValue(event.detail);
  }

  const moveLeft = () => {
    cropper.move(5, 0);
    
  }
  const moveRight = () => {
    cropper.move(-5, 0);
  }

  const moveUp = () => {
    cropper.move(0, 5);
  }
  const moveDown = () => {
    cropper.move(0, -5);
  }
  const zoomIn = () => {
    cropper.zoom(0.1)
  }
  const zoomOut = () => {
    cropper.zoom(-0.1);
  }
  const moveTo = () => {

  }

  const ShowData = ({name, unit, data}) => {
    return (
      <div class="input-group input-group-sm">
        <span class="input-group-prepend">
          <label class="input-group-text" for={`data` + name}>
            {name}
          </label>
        </span>
        <input
          type="text"
          class="form-control"
          id={`data` + name}
          placeholder={name}
          value={parseInt(cropValue.x)}
        />
        <span class="input-group-append">
          <span class="input-group-text">{unit}</span>
        </span>
      </div>
    );  
  }

  const ButtonSamll = ({handler, icon}) => {
    return (
      <button
        type="button"
        class="btn btn-primary"
        data-second-option="0"
        onClick={handler}
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          title=""
          data-original-title="cropper.move(-10, 0)"
        >
          <span class={icon}></span>
        </span>
      </button>
    );
  }


  return (
    <div>
      <CropperBox>
        <StyledCropper
          zoomTo={0.5}
          initialAspectRatio={4 / 3}
          aspectRatio={4 / 3}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          dragMode={"move"}
          onInitialized={(instance) => {
            setCropper(instance);
            setImage(initSrc); //최초 이미지 설정

          }}
          guides={true}
          crop={changeValue}
        />
        <InfoBox>
          <div class="docs-data">
            <div class="input-group input-group-sm">
              <span class="input-group-prepend">
                <label class="input-group-text" for="dataX">
                  X
                </label>
              </span>
              <input
                type="text"
                class="form-control"
                id="dataX"
                placeholder="x"
                value={parseInt(cropValue.x)}
              />
              <span class="input-group-append">
                <span class="input-group-text">px</span>
              </span>
            </div>
            <div class="input-group input-group-sm">
              <span class="input-group-prepend">
                <label class="input-group-text" for="dataY">
                  Y
                </label>
              </span>
              <input
                type="text"
                class="form-control"
                id="dataY"
                placeholder="y"
                value={parseInt(cropValue.y)}
              />
              <span class="input-group-append">
                <span class="input-group-text">px</span>
              </span>
            </div>
            <div class="input-group input-group-sm">
              <span class="input-group-prepend">
                <label class="input-group-text" for="dataWidth">
                  Width
                </label>
              </span>
              <input
                type="text"
                class="form-control"
                id="dataWidth"
                placeholder="width"
                value={parseInt(cropValue.width)}
              />
              <span class="input-group-append">
                <span class="input-group-text">px</span>
              </span>
            </div>
            <div class="input-group input-group-sm">
              <span class="input-group-prepend">
                <label class="input-group-text" for="dataHeight">
                  Height
                </label>
              </span>
              <input
                type="text"
                class="form-control"
                id="dataHeight"
                placeholder="height"
                value={parseInt(cropValue.height)}
              />
              <span class="input-group-append">
                <span class="input-group-text">px</span>
              </span>
            </div>
          </div>
          <div className="btn-group mt-2">
            <ButtonSamll handler={moveLeft} icon={"fa fa-arrow-left"} />
            <ButtonSamll handler={moveRight} icon={"fa fa-arrow-right"} />
            <ButtonSamll handler={moveUp} icon={"fa fa-arrow-up"} />
            <ButtonSamll handler={moveDown} icon={"fa fa-arrow-down"} />
          {/* </div>
          <div className="btn-group mt-2"> */}
            <ButtonSamll handler={zoomIn} icon={"fa fa-search-plus"} />
            <ButtonSamll handler={zoomOut} icon={"fa fa-search-minus"} />
          </div>

          <label
            class="btn w-100 btn-primary btn-upload mt-2"
            for="inputImage"
            title="Upload image file"
          >
            <input
              type="file"
              class="sr-only"
              id="inputImage"
              name="file"
              accept="image/*"
              onChange={onChange}
            />
            <span class="btn-label">
            </span>
            Upload
          </label>
          <button
            type="button"
            class="btn btn-labeled btn-danger w-100 mt-2"
            onClick={() => {
              cropper.reset();
            }}
          >
            <span class="btn-label">
            </span>
            reset
          </button>
          <button
            type="button"
            class="btn btn-labeled btn-success w-100 mt-2"
            data-method="getImageData"
            data-target="#putData"
            onClick={getCropData}
          >
            <span class="btn-label" style={{width: "20%", backgroundColor: "red"}}>
            </span>
            <span>Crop</span>
          </button>
          <CroppedImageBox>
            <h6>Cropped Image</h6>
            <img style={{ width: "100%" }} src={cropData} alt="cropped" />
          </CroppedImageBox>
        </InfoBox>
      </CropperBox>
    </div>
  );
}

const CropperBox = styled.div`
  display: flex;
  width: 100%;
  background-color: beige;
`;

const StyledCropper = styled(Cropper)`
  width: 70%;
  height: 600px;
  background-color: gray;
`

const InfoBox = styled.div`
  
  margin-left: auto;
  margin-right: auto;

  width: 22%;

  //background-color: red;
  height: 100%;

`
const CroppedImageBox = styled.div`

  margin-top: 10px;
`
