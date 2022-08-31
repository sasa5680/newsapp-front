//뉴스 에디터
import React, {useState, useEffect} from "react";
import Select from "react-select";

import styled from "styled-components";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import Crop from "./Crop";

import Button from "./elements/Button";
import ModalPreview from "./modal/ModalPreview";
import ModalPreviewBig from "./modal/ModalPreviewBig";
import PageExitAlert from "./PageExitAlert";
import { NEWS_CATE } from "../const";
import { blobToDataURL } from "../utils";
import ModalConfirm from "./modal/ModalConfirm";

//글자수 제한
  const titleMax = 40;
  const subTitleMax = 40;

  const options = Object.keys(NEWS_CATE).map((key)=> {
    return {value: key, label: key};
  })

export default function NewsEditor({initData, onSubmit, exitState = false}){

  const { openSuccess, openFail, ConfirmModal } = ModalConfirm();

  const [preModal, setPreModal] = useState(false);
  const [preModalBig, setPreModalBig] = useState(false);
  const [newsState, setNewsState] = useState({
    newsProfile: initData?.newsProfile || null,
    newsTitle: initData?.newsTitle || "",
    newsSubTitle: initData?.newsSubTitle || "",
    newsCate: initData?.newsCate || options[0].value,
    newsContent: initData?.newsContent || "",
  });

  const submitForm = async () => {
    const formData = new FormData();

    let newsProfile = await (await fetch(newsState.newsProfile)).blob(); 
    console.log(newsProfile)
    setNewsState((state) => ({ ...state, newsProfile: newsProfile }));

    console.log(newsState.newsProfile);

    Object.keys(newsState).forEach((key) => {
      formData.append(key, newsState[key])
    });

    onSubmit(formData);
  }

  useEffect(()=>{
    setNewsState(initData);
  }, [initData])

  return (
    <>
      {!exitState && <PageExitAlert isDirty={true} />}
      <FormItemBox>
        <TitleBox>뉴스 PROFILE</TitleBox>
        <Crop
          initSrc={initData?.newsProfile}
          onCrop={(data) => {
            //setNewsState((state) => ({ ...state, newsProfile: data }));
            blobToDataURL(data, (res) => {
              setNewsState((state) => ({ ...state, newsProfile: res }));
            });
          }}
        />
      </FormItemBox>

      <FormItemBox>
        <TitleBox>뉴스 Category</TitleBox>
        <OptionBox>
          <Select
            styles={{ width: "70%" }}
            defaultValue={
              options.filter((option) => option.label === "world")[0]
            }
            options={options}
            onChange={(option) => {
              setNewsState((state) => ({ ...state, newsCate: option.value }));
            }}
          />
        </OptionBox>
      </FormItemBox>

      <FormItemBox>
        <TitleBox>뉴스 TITLE</TitleBox>
        <textarea
          value={newsState?.newsTitle}
          style={{ fontSize: "25px" }}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          onChange={(e) => {
            setNewsState((state) => ({ ...state, newsTitle: e.target.value }));
          }}
        />
        <WordCounter>
          {newsState?.newsTitle?.length}/{titleMax}
        </WordCounter>
      </FormItemBox>

      <FormItemBox>
        <TitleBox>뉴스 SUBTITLE</TitleBox>
        <textarea
          value={newsState?.newsSubTitle}
          style={{ fontSize: "25px" }}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          onChange={(e) => {
            setNewsState((state) => ({
              ...state,
              newsSubTitle: e.target.value,
            }));
          }}
        />
        <WordCounter>
          {newsState?.newsSubTitle?.length}/{subTitleMax}
        </WordCounter>
      </FormItemBox>

      <FormItemBox>
        <TitleBox>뉴스 CONTENT</TitleBox>
        <CKEditor
          editor={Editor}
          data={initData?.newsContent}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNewsState((state) => ({ ...state, newsContent: data }));
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
      </FormItemBox>

      <FormItemBox>
        <TitleBox>Previews</TitleBox>

        <ButtonBox>
          <Button
            width={"80px"}
            onClick={() => {
              setPreModal(true);
            }}
          >
            PREVIEW
          </Button>
          <Button
            width={"80px"}
            onClick={() => {
              setPreModalBig(true);
            }}
          >
            PREVIEW Big
          </Button>
        </ButtonBox>
      </FormItemBox>

      <UploadButtonBox>
        <Button onClick={() => submitForm()}>SUBMIT</Button>
      </UploadButtonBox>

      <ModalPreview
        visible={preModal}
        onClose={() => setPreModal(false)}
        newsData={newsState}
      ></ModalPreview>
      <ModalPreviewBig
        visible={preModalBig}
        onClose={() => setPreModalBig(false)}
        newsData={newsState}
      ></ModalPreviewBig>
      <ConfirmModal />
      <div style={{ marginBottom: "30px" }}></div>
    </>
  );
}

const TitleBox = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`

const FormItemBox = styled.div`
  width: 100%;
  margin-top: 30px;
`

const WordCounter = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`
const OptionBox = styled.div`
  width: 50%;
`

const ButtonBox = styled.div`
  display: flex;
  margin-top: 20px;
  height: 40px;
  grid-gap: 20px
`
const UploadButtonBox = styled.div`
 margin-top: 30px;
 width: 300px;
 height: 50px;
`