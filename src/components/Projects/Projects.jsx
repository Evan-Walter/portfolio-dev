import React, { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import { Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';
import ProjectImg from '../Image/ProjectImg';

const Projects = (props) => {
  const { projects } = useContext(PortfolioContext);
  const { number, id, title, info, info2, /*  tags, */ url, video, repo, img, videoImg } = projects;

  // Screen
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Video
  const [showModal, setShowModal] = useState(false);
  const [whichVideo, setWhichVideo] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const handleClick = (video) => {
    setWhichVideo(video);
  };

  // Screen
  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  const imgOrVideoImg = (img, videoImg) => {
    if (videoImg) {
      return (
        <video>
          <source src={videoImg} type="video/mp4" />
        </video>
      );
    } else {
      return <ProjectImg alt={title} filename={img} />;
    }
  };

  return (
    <section id="projects" name="projects">
      <Container>
        <div className="p-wrap">
          <Title title="Projects" />
          {projects.map((project) => {
            const { number, id, title, info, info2, /*  tags, */ url, video, repo, img, videoImg } =
              project;
            return (
              <Row id={id} key={number} className="p-item">
                <Col lg={4} sm={12}>
                  <Fade
                    left={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={250}
                    distance="30px"
                  >
                    {/* Project Text and Buttons */}
                    <div className="p-text">
                      <h3 className="p-text__title">{title}</h3>
                      <div>
                        <p>{info}</p>
                      </div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn cta-btn--hero"
                        onClick={() => {
                          handleShowModal();
                          handleClick(video);
                        }}
                      >
                        Demo Video
                      </a>

                      {url && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta-btn cta-btn-no-background color-main"
                          href={url}
                        >
                          See Live
                        </a>
                      )}
                      <p className="mb-4">{info2}</p>
                      {/* <p className="tag">{ tags }</p> */}
                      {repo && (
                        <a
                          rel="noopener noreferrer"
                          className="cta-btn cta-btn-no-background color-main"
                          href={repo}
                          target="_blank"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </Fade>
                </Col>
                <Col lg={8} sm={12}>
                  <Fade
                    right={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={500}
                    distance="30px"
                  >
                    <div className="p-image">
                      <a
                        aria-label="Project Link"
                        rel="noopener noreferrer"
                        // href={url}
                        // target="_blank"
                        onClick={() => {
                          handleShowModal();
                          handleClick(video);
                        }}
                      >
                        <Tilt
                          options={{
                            reverse: false,
                            max: 8,
                            perspective: 1000,
                            scale: 1,
                            speed: 300,
                            transition: true,
                            axis: null,
                            reset: true,
                            easing: 'cubic-bezier(.03,.98,.52,.99)',
                          }}
                        >
                          <div data-tilt className="thumbnail rounded">
                            {imgOrVideoImg(img, videoImg)}
                          </div>
                        </Tilt>
                      </a>
                    </div>
                  </Fade>
                </Col>
              </Row>
            );
          })}
          <Col className="justify-content-md-center">
            <Fade bottom duration={1000} delay={250} distance="30px">
              <Link to="testimonials" smooth duration={1000}>
                <div className="down arrow-ctl p-arrow-ctl">
                  <i id="arrow" className="fa fa-angle-down fa-2x" aria-hidden="true" />
                </div>
              </Link>
            </Fade>
          </Col>
        </div>
        {/* Video Modal */}
        <Modal
          {...props}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showModal}
          onHide={handleHideModal}
        >
          <Modal.Header closeButton className="video-modal-header"></Modal.Header>
          <iframe
            src={whichVideo}
            title={title}
            className="video-modal"
            webkitAllowFullScreen
            mozAllowFullScreen
            allowFullScreen
          />
        </Modal>
      </Container>
    </section>
  );
};

export default Projects;
