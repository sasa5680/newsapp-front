export const BASE_URL = process.env.REACT_APP_API_SERVR; // api 서버 주소

//유저 타입
export const USER_TYPE = {

  USER: "USER",
  WRITER: "WRITER",
  ADMIN: "ADMIN",
}

//뉴스 메인 여부
export const NEWS_MAIN = {

  NORMAL: "NORMAL",
  MAIN: "MAIN",
  MAINSUB: "MAINSUB",
  CATEMAIN: "CATEMAIN"
}

export const NEWS_CATE = {

  SCIENCE: "SCIENCE",
  WORLD: "WORLD",
  TECH: "TECH",
  ECONOMY: "ECONOMY",
  
}

export const testSimpleNews = {
    newsId: 1,
    newsProfile:
      "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
    newsTitle: "Meet the Lobbyist Next Door",
    newsSubTitle:
      "A long history of constraining the river through levees has led to massive land loss in its delta. Can people engineer a way out?",
    newsCate: "ECONOMY",
    userName: "userName",
    newsApproved: true,
    newsMain: "MAIN",
  };

  export const testNews = {
    newsId: 1,
    newsProfile:
      "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg",
    newsTitle: "Meet the Lobbyist Next Door",
    newsSubTitle:
      "A long history of constraining the river through levees has led to massive land loss in its delta. Can people engineer a way out?",
    newsContent:
      "<p>A FRENCH SOCIAL media platform launched by Alexis Barreyat in 2020, BeReal recently reached the top of the free download charts on iOS, surpassing TikTok. The app initially gained popularity overseas, then attracted dedicated posters on US college campuses. Americans are now its primary user base. BeReal’s recent surge in downloads can be partially attributed to a string of viral TikToks referencing the social media app.  <p>",
    newsCate: "ECONOMY",
    createdAt: "2020/02/01",
    newsApproved: true,
    newsMain: "MAIN",
    user: {
      userId: "1",
      userName: "sasa5680",
      userProfile:
        "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      userIntro: "some intro",
    },
  };

  export const testUser = {
    userId: "1",
    userName: "sasa5680",
    userProfile:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    userIntro:
      "ulian Chokkattu is the reviews editor at WIRED, covering personal technology and reviewing consumer products. Previously he was the mobile and wearables editor at Digital Trends, steering coverage and reviews of smartphones and smartwatches, and an intern at TechCrunch. He graduated from Rutgers University with a bachelor's degree in English and journalism. He lives in New York City.",
  };