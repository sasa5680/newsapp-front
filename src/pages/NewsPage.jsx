
import React from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import parse from "html-react-parser";
import styled from "styled-components";

import { useAccountState } from "../context/AccountContext";
import CardSmall from "../components/newsCard/CardSmall";

import "./EditorParseStyle.css";
import ModalConfirm from "../components/modal/ModalConfirm";
import Meta from "../components/Meta";
import { StyleSubTitle } from "../styles/Common";
import { readNews, deleteNews } from "../service/NewsApi";
import ContentLink from "../components/ContentLink";
import Loading from "../components/Loading";
import { ClIENT_URL } from "../const";
import { dateConverter, dateConverterToTime } from "../utils";
import Button from "../components/elements/Button";
import { createReply } from "../service/ReplyApi";
import Reply from "../components/Reply";

export default function NewsPage({ match }) {


  //fetch
  const { isLoading, data: newsData } = useQuery(
    ["News", match.params.id],
    () => readNews(match.params.id),
    {onMutate:()=>{console.log("mutate")}}
  );

  if (isLoading) return <Loading/>

  return (
    <>
      <Meta
        newsTitle={newsData?.data.newsTitle}
        newsImage={newsData?.data.newsProfile}
      />
      {/* <a
        href="https://twitter.com/intent/tweet?text=this is a test&amp;via=sasa5680&amp;url=http://localhost:3000/news/&amp;original_referer=URL&amp;cid=article_share_twitter"
        data-key="twitter"
        data-template="https://twitter.com/intent/tweet?text=HEADLINE&amp;via=VIA&amp;url=URL&amp;original_referer=URL&amp;cid=article_share_twitter"
        data-track-event="mbt_navbar_share"
        data-track-key="platform"
        data-track-value="twitter"
      >
        share with twitter
      </a> */}

      {!isLoading && <NewsForm newsData={newsData?.data}></NewsForm>}

      {/* ?????? ????????? */}
      <h1 style={{marginTop: "20px"}}>More Stories</h1>
      <RelatedNewsBox>
        {newsData?.data.relatedNews.map((newsData) => {
          return (
            <RelatedNewsContainer>
              <CardSmall newsData={newsData} />
            </RelatedNewsContainer>
          );
        })}
      </RelatedNewsBox>
    </>
  );
}

export const NewsForm = ({width, newsData}) => {

  console.log(newsData)
  const accountState = useAccountState();
  const history = useHistory();

  const { openModal, startLoading, openSuccess, openFail, ConfirmModal } =
    ModalConfirm();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
  } = useForm();

  /* ?????? ?????? ???????????? */
  const newsDelteMutation = useMutation(deleteNews, {
    onMutate: (variable) => {
      startLoading();
    },
    onError: (error, variable, context) => {
      openFail();
    },
    onSuccess: (data, variables, context) => {
      openSuccess({ content: "?????? ?????????????????????.", closable: false });
      setTimeout(()=> {history.push("/")}, 3000);
    },
  });

  /* ?????? ?????? ???????????? */
  const replyCreateMutation = useMutation(createReply, {
    onMutate: ()=> {
    },
    onError: () => {
      openFail({content: "????????? ??????????????????!"})
    },
    onSuccess: () => {
      openSuccess({ content: "?????????????????????!", closable: true });
      setTimeout(()=>{window.location.reload()}, 3000)
    }
  })

  const handleReplyClick = () => {
    openModal({
      content: "?????????????????????????",
      onClick: () =>
        replyCreateMutation.mutate({
          newsId: newsData?.newsId,
          replyContent: watch("replyContent"),
        }),
    });

  }

  function handleDeleteClick() {
    openModal({
      content: "?????? ?????????????????????????",
      onClick: () => {
        newsDelteMutation.mutate(newsData.newsId);
      },
    });
  }

  return (
    <ContentBox width={width}>
      {/* ?????? ???????????? */}
      <CateBox>{newsData?.newsCate}</CateBox>

      {/* ?????? ????????? */}
      <TitleBox>{newsData?.newsTitle}</TitleBox>

      {/* ?????? ??????????????? */}
      <SubTitleBox>{newsData?.newsSubTitle}</SubTitleBox>

      {/* ?????? ??????, ?????? ?????? */}
      <TimeBox>
        {/* ?????? ?????? */}
        <div>
          PUBLISHED {dateConverter(newsData?.createdAt) || "01/01/1970"}
        </div>

        {accountState.userName === newsData?.user?.userName && (
          <ButtonBox>
            <Button
              width={"50px"}
              onClick={() => {
                history.push(`/update/${newsData.newsId}`);
              }}
            >
              update
            </Button>
            <Button width={"50px"} onClick={handleDeleteClick}>
              delete
            </Button>
          </ButtonBox>
        )}

        {/* ?????? ?????? */}
        <SocialButtonsBox>
          <FacebookShareButton
            url={ClIENT_URL + `/news/${newsData?.newsId}`} //eg. https://www.example.com
            quotes={newsData?.newsTitle + "\n"} //"Your Quotes"
            //hashtag={"dd"} // #hashTag
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={ClIENT_URL + `/news/${newsData?.newsId}`}
            title={newsData?.newsTitle + "\n"}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </SocialButtonsBox>
      </TimeBox>

      {/* ?????? ??? */}
      <Line />

      {/* ?????? ????????? ????????? */}
      <ImageBox>
        <Image
          src={
            newsData?.newsProfile instanceof Blob
              ? newsData?.newsProfileURL
              : newsData?.newsProfile
          }
        />
      </ImageBox>

      {/* ?????? ?????? */}
      <div class="ck-content" style={{ width: "100%", marginTop: "20px" }}>
        {parse(newsData?.newsContent || "")}
      </div>

      {/* ????????? ?????? ?????? */}
      <ContentLink to={`/user/${newsData?.user?.userName}`}>
        <WriterBox>
          <WriterName>
            Written by {newsData?.user?.userName || "Anonymous"}
          </WriterName>
          <WriterProfile src={newsData?.user?.userProfile}></WriterProfile>
        </WriterBox>
      </ContentLink>
      <ConfirmModal />
      <Line />

      <ReplyBox>
        {accountState.isLogin && (<InputBox>
          <StyledTextArea
            {...register("replyContent")}
            placeholder={"leave a comment"}
          />
          <Button width={"20%"} height={"100%"} onClick={handleReplyClick}>
            ??????
          </Button>
        </InputBox>)}
        <Reply list={newsData?.reply}></Reply>
      </ReplyBox>
    </ContentBox>
  );
}

const ContentBox = styled.div`
  width: ${(props) => props.width || "70%"};
  margin-top: 30px;

  @media screen and (max-width: 700px) {
   width: 100%;
  }
`;

const CateBox = styled.div`
  width: 100%;
  font-size: 1.2vw;
  font-weight: 650;
  color: ${({ theme }) => theme.colors.primary};

  @media screen and (max-width: 700px) {
    font-size: 3vw;
  }
`;

const TitleBox = styled.h2`
  width: 100%;
  //font-size: 3vw;
  font-weight: ${({ theme }) => theme.fontWeight.thick};
`;
const SubTitleBox = styled.h3`
  //${StyleSubTitle}
  color: ${({ theme }) => theme.colors.gray};
  width: 100%;
  font-size: 20px;
  margin-top: 5px;
  @media screen and (max-width: 700px) {
    font-size: 15px;
  }
`;

const TimeBox = styled.div`
  color: #696969;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeight.thin};
  display: flex;
  align-items: center;

  margin-top: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-left: 10px;
  grid-gap: 10px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const SocialButtonsBox = styled.div`
  margin-left: auto;
  grid-gap: 5px;
  display: flex;

`;

const Line = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  max-width: 100%;
  aspect-ratio: 16 / 9;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  //object-fit: scale-down;
`;

const WriterBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 50px;
  width: 100%;
  height: 40px;

  font-weight: ${({ theme }) => theme.fontWeight.thin};
  color: #696969;
`;

const WriterProfile = styled.img`
  border-radius: 50%;
  aspect-ratio: 1 /1;
  height: 100%;
`;

const WriterName = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const RelatedNewsContainer = styled.div`
  width: 25%;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const RelatedNewsBox = styled.div`
  grid-gap: 1.5vw;
  display: flex;
  margin-top: 30px;
  width: 100%;
  margin-bottom: 30px;

  @media screen and (max-width: 700px) {
    grid-gap: 0px;
    display: grid;
    row-gap: 40px;
  }
`;

const ReplyBox = styled.div`
  margin-top: 30px;
`

const InputBox = styled.div`
  display: flex;
  height: 80px;

`

const StyledTextArea = styled.textarea`
  width: 80%;
  height: 100%;
  font-size: 20px;
  border: none;
  padding: 10px;
`;
