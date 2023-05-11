import { Swiper, SwiperSlide } from "swiper/react";
import {
  BackgroundSlide,
  HomeSlideWrapper,
  HomeWrapper,
  WhyRoomWrapper,
  NewsWrapper,
} from "./styles";

import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import bg1 from "@/assets/images/hero_1.jpg";
import course1 from "@/assets/images/course_1.jpg";
import blog1 from "@/assets/images/blog_1.jpg";

function Home() {
  return (
    <HomeWrapper>
      <HomeSlideWrapper>
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          style={{
            zIndex: 1,
          }}
        >
          <SwiperSlide>
            <BackgroundSlide background={bg1}>
              <div>
                <h1>Academics University</h1>
              </div>
            </BackgroundSlide>
          </SwiperSlide>
          <SwiperSlide>
            <BackgroundSlide background={bg1}>
              <div>
                <h1>You Can Learn Anything</h1>
              </div>
            </BackgroundSlide>
          </SwiperSlide>
        </Swiper>
      </HomeSlideWrapper>
      <div className="container">
        <div className="row mt-4 mb-4 justify-content-center">
          <div className="text-center">
            <h2>Why Room Works</h2>
          </div>
        </div>
        <WhyRoomWrapper className="row mb-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="feature-1 border">
              <div className="icon-wrapper bg-primary">
                <span className="flaticon-mortarboard text-white" />
              </div>
              <div className="feature-1-content">
                <h2>Personalize Learning</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi
                  hendrerit elit
                </p>
                <p>
                  <a href="#" className="btn btn-primary px-4 rounded-0">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="feature-1 border">
              <div className="icon-wrapper bg-primary">
                <span className="flaticon-school-material text-white" />
              </div>
              <div className="feature-1-content">
                <h2>Trusted Courses</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi
                  hendrerit elit
                </p>
                <p>
                  <a href="#" className="btn btn-primary px-4 rounded-0">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <div className="feature-1 border">
              <div className="icon-wrapper bg-primary">
                <span className="flaticon-library text-white" />
              </div>
              <div className="feature-1-content">
                <h2>Tools for Students</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi
                  hendrerit elit
                </p>
                <p>
                  <a href="#" className="btn btn-primary px-4 rounded-0">
                    Learn More
                  </a>
                </p>
              </div>
            </div>
          </div>
        </WhyRoomWrapper>
        <div className="row mt-4 mb-4 justify-content-center">
          <div className="text-center">
            <h2>Popular Courses</h2>
          </div>
        </div>
        <div className="row mb-4">
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
          >
            <SwiperSlide>
              <div className="row">
                <div className="col-md-4 col-sm-12 course-1-item">
                  <figure className="thumnail">
                    <a href="course-single.html">
                      <img src={course1} alt="Image4" className="img-fluid" />
                    </a>
                    <div className="price">$99.00</div>
                    <div className="category">
                      <h3>Mobile Application</h3>
                    </div>
                  </figure>
                  <div className="course-1-content pb-4">
                    <h2>How To Create Mobile Apps Using Ionic</h2>
                    <div className="rating text-center mb-3">
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                    </div>
                    <p className="desc mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique accusantium ipsam.
                    </p>
                    <p>
                      <a
                        href="course-single.html"
                        className="btn btn-primary rounded-0 px-4"
                      >
                        Enroll In This Course
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 course-1-item">
                  <figure className="thumnail">
                    <a href="course-single.html">
                      <img src={course1} alt="Image5" className="img-fluid" />
                    </a>
                    <div className="price">$99.00</div>
                    <div className="category">
                      <h3>Web Design</h3>
                    </div>
                  </figure>
                  <div className="course-1-content pb-4">
                    <h2>How To Create Mobile Apps Using Ionic</h2>
                    <div className="rating text-center mb-3">
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                    </div>
                    <p className="desc mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique accusantium ipsam.
                    </p>
                    <p>
                      <a
                        href="course-single.html"
                        className="btn btn-primary rounded-0 px-4"
                      >
                        Enroll In This Course
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 course-1-item">
                  <figure className="thumnail">
                    <a href="course-single.html">
                      <img src={course1} alt="Image6" className="img-fluid" />
                    </a>
                    <div className="price">$99.00</div>
                    <div className="category">
                      <h3>Mobile Application</h3>
                    </div>
                  </figure>
                  <div className="course-1-content pb-4">
                    <h2>How To Create Mobile Apps Using Ionic</h2>
                    <div className="rating text-center mb-3">
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                    </div>
                    <p className="desc mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique accusantium ipsam.
                    </p>
                    <p>
                      <a
                        href="course-single.html"
                        className="btn btn-primary rounded-0 px-4"
                      >
                        Enroll In This Course
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="col-md-4 col-sm-12 course-1-item">
                  <figure className="thumnail">
                    <a href="course-single.html">
                      <img src={course1} alt="Image4" className="img-fluid" />
                    </a>
                    <div className="price">$99.00</div>
                    <div className="category">
                      <h3>Mobile Application</h3>
                    </div>
                  </figure>
                  <div className="course-1-content pb-4">
                    <h2>How To Create Mobile Apps Using Ionic</h2>
                    <div className="rating text-center mb-3">
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                    </div>
                    <p className="desc mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique accusantium ipsam.
                    </p>
                    <p>
                      <a
                        href="course-single.html"
                        className="btn btn-primary rounded-0 px-4"
                      >
                        Enroll In This Course
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 course-1-item">
                  <figure className="thumnail">
                    <a href="course-single.html">
                      <img src={course1} alt="Image5" className="img-fluid" />
                    </a>
                    <div className="price">$99.00</div>
                    <div className="category">
                      <h3>Web Design</h3>
                    </div>
                  </figure>
                  <div className="course-1-content pb-4">
                    <h2>How To Create Mobile Apps Using Ionic</h2>
                    <div className="rating text-center mb-3">
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                    </div>
                    <p className="desc mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique accusantium ipsam.
                    </p>
                    <p>
                      <a
                        href="course-single.html"
                        className="btn btn-primary rounded-0 px-4"
                      >
                        Enroll In This Course
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 course-1-item">
                  <figure className="thumnail">
                    <a href="course-single.html">
                      <img src={course1} alt="Image6" className="img-fluid" />
                    </a>
                    <div className="price">$99.00</div>
                    <div className="category">
                      <h3>Mobile Application</h3>
                    </div>
                  </figure>
                  <div className="course-1-content pb-4">
                    <h2>How To Create Mobile Apps Using Ionic</h2>
                    <div className="rating text-center mb-3">
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                      <span className="icon-star2 text-warning" />
                    </div>
                    <p className="desc mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Similique accusantium ipsam.
                    </p>
                    <p>
                      <a
                        href="course-single.html"
                        className="btn btn-primary rounded-0 px-4"
                      >
                        Enroll In This Course
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <NewsWrapper className="row mt-4">
          <div className="col-lg-9">
            <div className="section-heading">
              <h2 className="text-black">News &amp; Updates</h2>
              <a href="#">Read All News</a>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="post-entry-big">
                  <a href="news-single.html" className="img-link">
                    <img src={blog1} alt="blog1" className="img-fluid" />
                  </a>
                  <div className="post-content">
                    <div className="post-meta">
                      <a href="#">June 6, 2019</a>
                      <span className="mx-1">/</span>
                      <a href="#">Admission</a>, <a href="#">Updates</a>
                    </div>
                    <h3 className="post-heading">
                      <a href="news-single.html">
                        Campus Camping and Learning Session
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="post-entry-big horizontal d-flex mb-4">
                  <a href="news-single.html" className="img-link mr-4">
                    <img src={blog1} alt="blog2" className="img-fluid" />
                  </a>
                  <div className="post-content">
                    <div className="post-meta">
                      <a href="#">June 6, 2019</a>
                      <span className="mx-1">/</span>
                      <a href="#">Admission</a>, <a href="#">Updates</a>
                    </div>
                    <h3 className="post-heading">
                      <a href="news-single.html">
                        Campus Camping and Learning Session
                      </a>
                    </h3>
                  </div>
                </div>
                <div className="post-entry-big horizontal d-flex mb-4">
                  <a href="news-single.html" className="img-link mr-4">
                    <img src={blog1} alt="blog3" className="img-fluid" />
                  </a>
                  <div className="post-content">
                    <div className="post-meta">
                      <a href="#">June 6, 2019</a>
                      <span className="mx-1">/</span>
                      <a href="#">Admission</a>, <a href="#">Updates</a>
                    </div>
                    <h3 className="post-heading">
                      <a href="news-single.html">
                        Campus Camping and Learning Session
                      </a>
                    </h3>
                  </div>
                </div>
                <div className="post-entry-big horizontal d-flex mb-4">
                  <a href="news-single.html" className="img-link mr-4">
                    <img src={blog1} alt="blog4" className="img-fluid" />
                  </a>
                  <div className="post-content">
                    <div className="post-meta">
                      <a href="#">June 6, 2019</a>
                      <span className="mx-1">/</span>
                      <a href="#">Admission</a>, <a href="#">Updates</a>
                    </div>
                    <h3 className="post-heading">
                      <a href="news-single.html">
                        Campus Camping and Learning Session
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="section-heading">
              <h2 className="text-black">Campus Videos</h2>
              <a href="#">View All Videos</a>
            </div>
            <a
              href="https://vimeo.com/45830194"
              className="video-1 mb-4"
              data-fancybox
              data-ratio={2}
            >
              <span className="play">
                <span className="icon-play" />
              </span>
              <img src={blog1} alt="course5" className="img-fluid" />
            </a>
            <a
              href="https://vimeo.com/45830194"
              className="video-1 mb-4"
              data-fancybox
              data-ratio={2}
            >
              <span className="play">
                <span className="icon-play" />
              </span>
              <img src={blog1} alt="course6" className="img-fluid" />
            </a>
          </div>
        </NewsWrapper>
      </div>
    </HomeWrapper>
  );
}

export default Home;
