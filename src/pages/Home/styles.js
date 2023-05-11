import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  h2 {
    border-bottom: 5px solid var(--color-primary);
  }
`;

export const HomeSlideWrapper = styled.div`
  width: 100%;
  .swiper {
    height: calc(100vh - 98px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    &-wrapper {
      width: 100%;
      height: 100%;
    }
  }
`;

export const BackgroundSlide = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  div {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: #fff;
      font-size: 50px;
      font-weight: 700;
      text-align: center;
    }
  }
`;

export const WhyRoomWrapper = styled.div`
  margin-top: 120px;
`;
export const NewsWrapper = styled.div`
  padding: 5rem 0;
  h2 {
    border-bottom: 0;
  }
  .section-heading {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .section-heading h2 {
    margin-bottom: 0;
    line-height: 0;
  }
  .section-heading a {
    font-size: 16px;
  }
  .post-entry-big .img-link {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
    overflow: hidden;
  }
  .post-entry-big .img-link img {
    -webkit-transition: 0.3s all ease;
    -o-transition: 0.3s all ease;
    transition: 0.3s all ease;
  }
  .post-entry-big .img-link:before {
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: absolute;
    content: "";
    background: #000;
    opacity: 0;
    z-index: 2;
    visibility: hidden;
    -webkit-transition: 0.3s all ease;
    -o-transition: 0.3s all ease;
    transition: 0.3s all ease;
  }
  .post-entry-big .img-link img {
    z-index: 1;
  }
  .post-entry-big .img-link:hover:before {
    opacity: 0.6;
    visibility: visible;
  }
  .post-entry-big .img-link:hover img {
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
  }
  .post-entry-big .post-content .post-meta a {
    display: inline-block;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: bold;
    color: #939393;
  }
  .post-entry-big .post-content .post-heading {
    line-height: 0.9;
  }
  .post-entry-big .post-content .post-heading a {
    font-size: 18px;
    font-weight: bold;
    color: #303030;
  }
  .post-entry-big .post-content .post-heading a:hover {
    color: #51be78;
  }
  .post-entry-big.horizontal .img-link {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 90px;
    flex: 0 0 90px;
  }
`;
