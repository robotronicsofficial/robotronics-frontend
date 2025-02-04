import React from 'react';
import Intro from '../../component/contactUs/intro';
import Footer from '../../component/footer';
import ChildBody from './ChildBody';

const ChildHome = () => {
  return (
    <div>
      <Intro />
      <ChildBody/>
      <Footer />
    </div>
  );
};

export default ChildHome;