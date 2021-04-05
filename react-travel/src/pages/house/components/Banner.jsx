import React from 'react';
import AwesomeSwiper from 'react-awesome-swiper';
import PropTypes from 'prop-types'
import './Banner.scss'


const config = {
  loop: true,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
  },
  // Disable preloading of all images
  preloadImages: false,
  // Enable lazy loading
  lazy: true,
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    bulletElement: 'li',
    hideOnClick: true,
    clickable: true,
  },
  // on: {
  //   slideChange: function () {
  //     console.log(this.activeIndex);
  //   },
  // },
};

export default function Banner(props) {
  const { bannerList } = props
  return (
    <AwesomeSwiper config={config} className="your-classname">
      <div className="swiper-wrapper">
        {
          bannerList && bannerList.map((item, index) => {
            return (
              <div className="swiper-slide" key={index}><img src={item.url} /></div>
            )
          })
        }
      </div>
      <div className="swiper-pagination"></div>
    </AwesomeSwiper>)
}


Banner.propTypes = {
  bannerList: PropTypes.array
}
