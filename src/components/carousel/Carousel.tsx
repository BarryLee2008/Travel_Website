import React from "react"
import { Image, Carousel as AntdCarousel } from 'antd'
import styles from './Carousel.module.css'
import carouselImage1 from "../../assets/images/carousel_1.jpg";
import carouselImage2 from "../../assets/images/carousel_2.jpg";
import carouselImage3 from "../../assets/images/carousel_3.jpg";
export const Carousel: React.FC = () => {
    return (
        <AntdCarousel className={styles.slider} autoplay>
            <Image src={carouselImage1}></Image>
            <Image src={carouselImage2}></Image>
            <Image src={carouselImage3}></Image>
        </AntdCarousel>
    )
}