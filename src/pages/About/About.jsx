import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import './About.css';

const About = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const isSection1InView = useInView(section1Ref, { once: true, amount: 0.3 });
  const isSection2InView = useInView(section2Ref, { once: true, amount: 0.3 });

  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  return (
    <div className="about-page">
      <Breadcrumb items={breadcrumbItems} />
      <div className="about-container">
        <h1 className="page-title">ABOUT</h1>
        
        {/* Blue Banner */}
        <motion.div
          className="about-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About "MAKERS Electronics"
        </motion.div>

        {/* Section 1: WHO ARE WE? - Text Left, Image Right */}
        <div className="about-section-wrapper" ref={section1Ref}>
          <div className="about-section-content">
            <motion.div
              className="about-text-content"
              initial={fadeInLeft.initial}
              animate={isSection1InView ? fadeInLeft.animate : fadeInLeft.initial}
              transition={fadeInLeft.transition}
            >
              <div className="section-label">WHO ARE WE?</div>
              <h2 className="section-heading">Leading Electronics Supplier</h2>
              <p className="section-text">
                "MAKERS" is a leading Egyptian company in Electronics supplies and spare parts. 
                We provide electronics Geeks or professionals with the best electronic components 
                and devices to help them make and build smart projects. MAKERS always work to 
                develop and support the electronics field in Egypt to create a creative community 
                of electronics Geeks and everyone loves electronics meetings with a making mentality.
              </p>
            </motion.div>
            
            <motion.div
              className="about-image-content"
              initial={fadeInRight.initial}
              animate={isSection1InView ? fadeInRight.animate : fadeInRight.initial}
              transition={fadeInRight.transition}
            >
              <div className="about-image-placeholder">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop" 
                  alt="Electronic components including Raspberry Pi boards and development kits"
                  className="about-image"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 2: WHAT WE DO - Image Left, Text Right */}
        <div className="about-section-wrapper" ref={section2Ref}>
          <div className="about-section-content reverse">
            <motion.div
              className="about-image-content"
              initial={fadeInLeft.initial}
              animate={isSection2InView ? fadeInLeft.animate : fadeInLeft.initial}
              transition={fadeInLeft.transition}
            >
              <div className="about-image-placeholder">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" 
                  alt="Person holding a circuit board"
                  className="about-image"
                />
              </div>
            </motion.div>
            
            <motion.div
              className="about-text-content"
              initial={fadeInRight.initial}
              animate={isSection2InView ? fadeInRight.animate : fadeInRight.initial}
              transition={fadeInRight.transition}
            >
              <div className="section-label">WHAT WE DO</div>
              <h2 className="section-heading">Import, Supply, Support</h2>
              <ul className="section-list">
                <li>We believe in customer orientation so we work to satisfy our customers' needs</li>
                <li>Import high-quality electronics at the best prices</li>
                <li>Accept special orders from our customers</li>
                <li>Deliver orders over Egypt with the fastest delivery couriers</li>
                <li>Satisfy B2B needs, working with your company to ensure that we supply what really you need for your business success</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
